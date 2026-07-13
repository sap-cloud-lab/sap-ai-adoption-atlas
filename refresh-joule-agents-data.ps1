param(
  [string]$CsvPath = "C:\Users\f617820\Downloads\AI Features Data.csv",
  [string]$OutputPath = (Join-Path $PSScriptRoot "joule-agents-data.js"),
  [datetime]$SnapshotDate = (Get-Date)
)

$ErrorActionPreference = "Stop"
$CatalogApi = "https://discovery-center.cloud.sap/servicecatalog/api/v1/ai/features"

function Repair-Text {
  param([AllowNull()][object]$Value)
  if ($null -eq $Value) { return "" }
  return ([string]$Value).Replace([string][char]0x200B, "")
}

function Split-CatalogList {
  param([AllowNull()][string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value)) { return @() }

  $csvSeparator = [string][char]0x201A
  $splitPattern = "[" + [regex]::Escape($csvSeparator) + ";]"
  return @(
    $Value -split $splitPattern |
      ForEach-Object { (Repair-Text $_).Trim() } |
      Where-Object { $_ }
  )
}

function New-AgentSlug {
  param([string]$Name, [string]$Identifier)

  $base = $Name.ToLowerInvariant().Replace("&", " and ")
  $base = [regex]::Replace($base, "[^a-z0-9]+", "-").Trim("-")
  return "$base-$($Identifier.ToLowerInvariant())"
}

if (-not (Test-Path -LiteralPath $CsvPath)) {
  throw "CSV source not found: $CsvPath"
}

$rows = @(Import-Csv -LiteralPath $CsvPath)
if ($rows.Count -eq 0) { throw "CSV source contains no records." }

$catalogGroups = @(Invoke-RestMethod -Uri $CatalogApi -Method Get)
$catalogIndex = @{}
foreach ($group in $catalogGroups) {
  foreach ($capability in @($group.capabilities)) {
    $catalogIndex[$capability.id] = $capability
  }
}

$duplicateNames = @{}
$rows | Group-Object Name | ForEach-Object {
  if ($_.Count -gt 1) { $duplicateNames[$_.Name] = $true }
}

$agents = foreach ($row in $rows) {
  $uuidMatch = [regex]::Match($row.'Detail Page', "/ai-feature/([0-9a-f-]{36})/", "IgnoreCase")
  if (-not $uuidMatch.Success) {
    throw "Could not extract a catalog UUID from $($row.'Detail Page')"
  }

  $uuid = $uuidMatch.Groups[1].Value
  $summary = $catalogIndex[$uuid]
  if ($null -eq $summary) {
    throw "The live SAP catalog no longer contains $($row.Identifier) ($uuid)."
  }

  $detail = Invoke-RestMethod -Uri "$CatalogApi/$uuid" -Method Get
  $products = @(Split-CatalogList $row.Product)
  if ($products.Count -eq 0) { $products = @(Split-CatalogList $detail.worksWith) }
  $quickFilters = @(Split-CatalogList $row.'Quick Filters')

  $editionLabel = ""
  if ($duplicateNames.ContainsKey($row.Name)) {
    if ($products -match "Public Edition") { $editionLabel = "Public Edition" }
    elseif ($products -match "Private Edition") { $editionLabel = "Private Edition" }
  }

  $displayName = Repair-Text $row.Name
  if ($editionLabel) { $displayName = "$displayName - $editionLabel" }

  $availability = switch ($row.Availability) {
    "Generally Available" { "Generally Available" }
    "Early Adopter Care (EAC)" { "Early Adopter Care" }
    default { Repair-Text $row.Availability }
  }

  $resources = @(
    @($detail.resources) |
      Sort-Object displayOrder |
      ForEach-Object {
        [ordered]@{
          text = Repair-Text $_.text
          type = Repair-Text $_.type
          url = Repair-Text $_.location
        }
      }
  )

  $medias = @(
    @($detail.medias) |
      Sort-Object displayOrder |
      ForEach-Object {
        [ordered]@{
          title = Repair-Text $_.title
          alt = Repair-Text $_.altText
          url = Repair-Text $_.location
          format = Repair-Text $_.format
        }
      }
  )

  $officialImage = @($medias | Where-Object { $_.format -eq "IMAGE" } | Select-Object -First 1)
  $officialVideo = @($medias | Where-Object { $_.format -like "VIDEO*" } | Select-Object -First 1)
  $entitlement = @($detail.entitlementRulesList | Select-Object -First 1)

  [ordered]@{
    id = Repair-Text $row.Identifier
    uuid = $uuid
    slug = New-AgentSlug $row.Name $row.Identifier
    name = Repair-Text $row.Name
    displayName = $displayName
    editionLabel = $editionLabel
    type = Repair-Text $summary.type
    typeLabel = if ($summary.type -eq "ai_agent_package") { "Agent package entry" } else { "AI Agent" }
    description = Repair-Text $detail.shortDescription
    longDescription = Repair-Text $detail.description
    category = Repair-Text $row.'Product Category'
    products = $products
    commercialType = Repair-Text $row.'Commercial Type'
    availability = $availability
    package = Repair-Text $row.Package
    quickFilters = $quickFilters
    minimumRequiredVersion = Repair-Text $detail.minimumRequiredVersion
    supportComponent = Repair-Text $detail.supportComponent
    additionalType = Repair-Text $detail.additionalType
    additionalCategory = Repair-Text $summary.additionalCategory
    catalogUrl = Repair-Text $row.'Detail Page'
    apiUrl = "$CatalogApi/$uuid"
    catalogSource = "SAP Discovery Center"
    isFeatured = [bool]($quickFilters -contains "Featured")
    isJoule = [bool](($quickFilters -contains "Joule") -or ($products -contains "Joule"))
    benefits = @(
      @($detail.benefits) |
        Sort-Object displayOrder |
        ForEach-Object { Repair-Text $_.text }
    )
    businessValue = @(
      @($detail.businessValue) |
        Sort-Object displayOrder |
        ForEach-Object { Repair-Text $_.text }
    )
    resources = $resources
    medias = $medias
    officialImage = if ($officialImage.Count) { $officialImage[0].url } else { "" }
    officialVideo = if ($officialVideo.Count) { $officialVideo[0].url } else { "" }
    directBillingRelationship = if ($entitlement.Count) { Repair-Text $entitlement[0].directBillingRelationship } else { "" }
    dataQuality = [ordered]@{
      commercialNotPublished = [string]::IsNullOrWhiteSpace($row.'Commercial Type')
      productNotPublished = [string]::IsNullOrWhiteSpace($row.Product)
      agentSpecificSetupPublished = [bool](@($resources | Where-Object { $_.url -like "https://help.sap.com/*" }).Count)
    }
  }
}

$payload = [ordered]@{
  snapshotDate = $SnapshotDate.ToString("yyyy-MM-dd")
  snapshotLabel = $SnapshotDate.ToString("d MMMM yyyy", [Globalization.CultureInfo]::GetCultureInfo("en-AU"))
  sourceCsv = [IO.Path]::GetFileName($CsvPath)
  catalogUrl = "https://discovery-center.cloud.sap/ai-catalog/?aiType=ai_agent_package,ai_agent"
  catalogApi = $CatalogApi
  counts = [ordered]@{
    total = @($agents).Count
    agents = @($agents | Where-Object { $_.type -eq "ai_agent" }).Count
    packages = @($agents | Where-Object { $_.type -eq "ai_agent_package" }).Count
  }
  agents = @($agents)
}

$json = $payload | ConvertTo-Json -Depth 20
$javascript = "window.jouleAgentCatalog = $json;`r`n"
$utf8NoBom = New-Object Text.UTF8Encoding($false)
[IO.File]::WriteAllText($OutputPath, $javascript, $utf8NoBom)

Write-Output "Wrote $($payload.counts.total) records to $OutputPath"
Write-Output "AI agents: $($payload.counts.agents)"
Write-Output "Agent package entries: $($payload.counts.packages)"
