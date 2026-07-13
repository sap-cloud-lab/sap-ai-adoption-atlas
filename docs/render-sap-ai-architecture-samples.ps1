param(
    [string]$OutputPath = (Join-Path (Split-Path -Parent $PSScriptRoot) 'assets\sap-ai-architecture-concept-samples.png')
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$width = 3840
$height = 2160
$bitmap = [System.Drawing.Bitmap]::new($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#edf3f9'))

function Color([string]$hex) {
    return [System.Drawing.ColorTranslator]::FromHtml($hex)
}

function Font([float]$size, [System.Drawing.FontStyle]$style = [System.Drawing.FontStyle]::Regular) {
    return [System.Drawing.Font]::new('Segoe UI', $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function RoundedPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $diameter = $r * 2
    $path.AddArc($x, $y, $diameter, $diameter, 180, 90)
    $path.AddArc($x + $w - $diameter, $y, $diameter, $diameter, 270, 90)
    $path.AddArc($x + $w - $diameter, $y + $h - $diameter, $diameter, $diameter, 0, 90)
    $path.AddArc($x, $y + $h - $diameter, $diameter, $diameter, 90, 90)
    $path.CloseFigure()
    return $path
}

function DrawRoundedRect(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$fill, [string]$stroke = '#d1dbe7',
    [float]$strokeWidth = 2, [float]$radius = 18,
    [bool]$dashed = $false
) {
    $path = RoundedPath $x $y $w $h $radius
    $brush = [System.Drawing.SolidBrush]::new((Color $fill))
    $pen = [System.Drawing.Pen]::new((Color $stroke), $strokeWidth)
    if ($dashed) { $pen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash }
    $graphics.FillPath($brush, $path)
    $graphics.DrawPath($pen, $path)
    $pen.Dispose()
    $brush.Dispose()
    $path.Dispose()
}

function DrawText(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$text, [float]$size, [string]$color,
    [System.Drawing.FontStyle]$style = [System.Drawing.FontStyle]::Regular,
    [System.Drawing.StringAlignment]$align = [System.Drawing.StringAlignment]::Near,
    [System.Drawing.StringAlignment]$lineAlign = [System.Drawing.StringAlignment]::Center
) {
    $font = Font $size $style
    $brush = [System.Drawing.SolidBrush]::new((Color $color))
    $format = [System.Drawing.StringFormat]::new()
    $format.Alignment = $align
    $format.LineAlignment = $lineAlign
    $format.Trimming = [System.Drawing.StringTrimming]::EllipsisWord
    $rect = [System.Drawing.RectangleF]::new([single]$x, [single]$y, [single]$w, [single]$h)
    $graphics.DrawString(($text -replace '\|', [Environment]::NewLine), $font, $brush, $rect, $format)
    $format.Dispose()
    $brush.Dispose()
    $font.Dispose()
}

function DrawChip(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$fill, [string]$stroke, [string]$text,
    [string]$textColor = '#071a45', [float]$textSize = 18,
    [bool]$dashed = $false
) {
    DrawRoundedRect $x $y $w $h $fill $stroke 2 12 $dashed
    DrawText ($x + 10) ($y + 4) ($w - 20) ($h - 8) $text $textSize $textColor ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
}

function DrawArrow(
    [float]$x1, [float]$y1, [float]$x2, [float]$y2,
    [string]$color = '#1fa8d1', [float]$strokeWidth = 5,
    [bool]$dashed = $false
) {
    $pen = [System.Drawing.Pen]::new((Color $color), $strokeWidth)
    if ($dashed) { $pen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash }
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $graphics.DrawLine($pen, $x1, $y1, $x2, $y2)
    $angle = [Math]::Atan2($y2 - $y1, $x2 - $x1)
    $head = 17
    $spread = 0.55
    $points = @(
        [System.Drawing.PointF]::new([single]$x2, [single]$y2),
        [System.Drawing.PointF]::new([single]($x2 - $head * [Math]::Cos($angle - $spread)), [single]($y2 - $head * [Math]::Sin($angle - $spread))),
        [System.Drawing.PointF]::new([single]($x2 - $head * [Math]::Cos($angle + $spread)), [single]($y2 - $head * [Math]::Sin($angle + $spread)))
    )
    $brush = [System.Drawing.SolidBrush]::new((Color $color))
    $graphics.FillPolygon($brush, $points)
    $brush.Dispose()
    $pen.Dispose()
}

function DrawNode(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$title, [string]$subtitle,
    [string]$accent, [string]$fill = '#ffffff',
    [float]$titleSize = 22, [float]$bodySize = 16,
    [bool]$dashed = $false
) {
    DrawRoundedRect $x $y $w $h $fill $accent 3 16 $dashed
    DrawText ($x + 14) ($y + 8) ($w - 28) 36 $title $titleSize $accent ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
    if ($subtitle) {
        DrawText ($x + 16) ($y + 46) ($w - 32) ($h - 56) $subtitle $bodySize '#425b76' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Center) ([System.Drawing.StringAlignment]::Near)
    }
}

function DrawTooltip(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$title, [string]$body, [string]$accent
) {
    $shadow = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(42, 7, 26, 69))
    $shadowPath = RoundedPath ($x + 10) ($y + 12) $w $h 16
    $graphics.FillPath($shadow, $shadowPath)
    $shadowPath.Dispose()
    $shadow.Dispose()
    DrawRoundedRect $x $y $w $h '#ffffff' $accent 3 16 $false
    DrawText ($x + 18) ($y + 12) ($w - 36) 36 $title 22 $accent ([System.Drawing.FontStyle]::Bold)
    DrawText ($x + 18) ($y + 50) ($w - 36) ($h - 64) $body 17 '#29415f' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Near) ([System.Drawing.StringAlignment]::Near)
}

function DrawCursor([float]$x, [float]$y, [string]$fill = '#071a45') {
    $points = @(
        [System.Drawing.PointF]::new([single]$x, [single]$y),
        [System.Drawing.PointF]::new([single]($x + 11), [single]($y + 34)),
        [System.Drawing.PointF]::new([single]($x + 19), [single]($y + 23)),
        [System.Drawing.PointF]::new([single]($x + 31), [single]($y + 36)),
        [System.Drawing.PointF]::new([single]($x + 38), [single]($y + 29)),
        [System.Drawing.PointF]::new([single]($x + 25), [single]($y + 17))
    )
    $brush = [System.Drawing.SolidBrush]::new((Color $fill))
    $graphics.FillPolygon($brush, $points)
    $brush.Dispose()
}

function DrawOptionHeader(
    [float]$x, [float]$y, [float]$w,
    [string]$letter, [string]$title, [string]$summary,
    [string]$accent
) {
    DrawRoundedRect ($x + 34) ($y + 28) 54 54 $accent $accent 1 14 $false
    DrawText ($x + 34) ($y + 28) 54 54 $letter 27 '#ffffff' ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
    DrawText ($x + 104) ($y + 24) ($w - 138) 48 $title 31 '#071a45' ([System.Drawing.FontStyle]::Bold)
    DrawText ($x + 104) ($y + 70) ($w - 138) 62 $summary 18 '#536a82' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Near) ([System.Drawing.StringAlignment]::Near)
}

function DrawFooterNote(
    [float]$x, [float]$y, [float]$w,
    [string]$bestFor, [string]$interaction, [string]$mobile,
    [string]$accent
) {
    DrawRoundedRect ($x + 34) $y ($w - 68) 190 '#f7faff' '#d1dbe7' 2 16 $false
    DrawText ($x + 56) ($y + 16) ($w - 112) 34 ('BEST FOR  ' + $bestFor) 19 $accent ([System.Drawing.FontStyle]::Bold)
    DrawText ($x + 56) ($y + 58) ($w - 112) 46 ('Interaction: ' + $interaction) 17 '#29415f' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Near) ([System.Drawing.StringAlignment]::Near)
    DrawText ($x + 56) ($y + 108) ($w - 112) 46 ('Mobile: ' + $mobile) 17 '#29415f' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Near) ([System.Drawing.StringAlignment]::Near)
    DrawText ($x + 56) ($y + 158) ($w - 112) 22 'Hover previews a brief definition. Click pins full detail and sources.' 15 '#6c7f93' ([System.Drawing.FontStyle]::Italic)
}

# Palette
$navy = '#071a45'
$deepNavy = '#031f49'
$blue = '#0a6ed1'
$cyan = '#1fa8d1'
$purple = '#6f43e8'
$teal = '#0b8f8c'
$green = '#18864b'
$orange = '#e9730c'

# Atlas-style header
$headerBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
$graphics.FillRectangle($headerBrush, 0, 0, $width, 166)
$headerBrush.Dispose()

$triangle = @(
    [System.Drawing.PointF]::new(62, 88),
    [System.Drawing.PointF]::new(91, 31),
    [System.Drawing.PointF]::new(119, 88)
)
$triBrush = [System.Drawing.SolidBrush]::new((Color $blue))
$graphics.FillPolygon($triBrush, $triangle)
$triBrush.Dispose()
DrawText 140 32 570 68 'AI Adoption Atlas' 38 $navy ([System.Drawing.FontStyle]::Bold)
DrawText 2480 36 310 62 'AI in SAP Applications' 21 '#425b76' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Center)
DrawText 2800 36 300 62 'Joule & Agents' 21 '#425b76' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Center)
DrawText 3120 36 300 62 'Build on SAP BTP' 21 '#425b76' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Center)
DrawText 3440 36 300 62 'Governance' 21 '#425b76' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Center)
$navPen = [System.Drawing.Pen]::new((Color $cyan), 6)
$graphics.DrawLine($navPen, 2790, 156, 3090, 156)
$navPen.Dispose()

# Hero
$heroRect = [System.Drawing.RectangleF]::new(0, 166, $width, 254)
$heroBrush = [System.Drawing.Drawing2D.LinearGradientBrush]::new($heroRect, (Color $deepNavy), (Color '#102c70'), [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal)
$graphics.FillRectangle($heroBrush, $heroRect)
$heroBrush.Dispose()
DrawText 70 205 3700 74 'Choose how the SAP AI architecture should work on the website' 52 '#ffffff' ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
DrawText 220 286 3400 76 'All three concepts use the same verified 2026 content. The difference is how users understand relationships and reveal definitions.' 25 '#bfe7ff' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Center)

# Option panels
$panelY = 448
$panelH = 1538
$panelW = 1200
$panelX = @(60, 1320, 2580)
foreach ($x in $panelX) {
    DrawRoundedRect $x $panelY $panelW $panelH '#ffffff' '#bfd0e2' 3 24 $false
}

# OPTION A - Layered North Star
$xA = $panelX[0]
DrawOptionHeader $xA $panelY $panelW 'A' 'North Star Layers' 'Four official architecture layers with cross-cutting integration and governance rails.' $blue
DrawRoundedRect ($xA + 34) 602 ($panelW - 68) 1080 $deepNavy '#183b7a' 2 20 $false
DrawChip ($xA + 62) 630 1010 50 '#15346f' '#335a9e' 'SAP AI-NATIVE NORTH STAR - DEFAULT LAYER VIEW' '#d9efff' 17

$layerX = $xA + 142
$layerW = 890
$layerYs = @(710, 910, 1128, 1346)
$layerH = 170
$layerAccents = @($purple, $blue, $teal, $green)
$layerTitles = @('1  USER EXPERIENCE', '2  PROCESS', '3  FOUNDATION - AI, DATA & KNOWLEDGE', '4  PLATFORM - RUNTIME & GOVERNANCE')
$layerBodies = @(
    'Joule Work / Conversations / Spaces / Develop / desktop / mobile / voice',
    'Five Autonomous Domains / Assistants / Agents / Skills / embedded AI / workflows',
    'Business Data Cloud / Knowledge Graph / AI Core + generative AI hub / models / Document AI',
    'SAP BTP / Joule Studio runtime / Agent Hub / identity / observability / sandboxing'
)
for ($i = 0; $i -lt 4; $i++) {
    DrawRoundedRect $layerX $layerYs[$i] $layerW $layerH '#ffffff' $layerAccents[$i] 3 16 $false
    DrawText ($layerX + 20) ($layerYs[$i] + 12) ($layerW - 40) 42 $layerTitles[$i] 22 $layerAccents[$i] ([System.Drawing.FontStyle]::Bold)
    DrawText ($layerX + 22) ($layerYs[$i] + 62) ($layerW - 44) 86 $layerBodies[$i] 17 '#29415f' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Near) ([System.Drawing.StringAlignment]::Near)
    if ($i -lt 3) { DrawArrow ($layerX + $layerW / 2) ($layerYs[$i] + $layerH + 4) ($layerX + $layerW / 2) ($layerYs[$i + 1] - 8) '#79c9e4' 4 }
}
DrawChip ($xA + 58) 710 68 806 '#102c70' '#315798' 'INTEGRATION|APIs / events|MCP / A2A' '#bfe7ff' 15
DrawChip ($xA + 1048) 710 68 806 '#102c70' '#315798' 'TRUST|identity / security|ethics / audit' '#bfe7ff' 15
DrawCursor ($xA + 762) 1190 $navy
DrawTooltip ($xA + 600) 1240 470 238 'SAP Knowledge Graph' 'Semantic backbone that maps business language to SAP entities, data products, APIs and relationships. It does not store the live transactions.' $teal
DrawFooterNote $xA 1768 $panelW 'architecture accuracy and executive explanation' 'hover on any component; click opens the full definition panel' 'layers become an accessible accordion' $blue

# OPTION B - Ground, Reason, Act
$xB = $panelX[1]
DrawOptionHeader $xB $panelY $panelW 'B' 'Ground - Reason - Act' 'A relationship-first story showing how trusted context becomes governed action.' $purple
DrawRoundedRect ($xB + 34) 602 ($panelW - 68) 1080 $deepNavy '#183b7a' 2 20 $false
DrawChip ($xB + 62) 630 1010 50 '#15346f' '#335a9e' 'FOLLOW ONE BUSINESS REQUEST END TO END' '#d9efff' 17

DrawNode ($xB + 370) 716 460 116 'Joule Work' 'User states intent' $purple '#ffffff' 25 17
DrawNode ($xB + 370) 862 460 116 'Joule Assistant' 'Coordinates the domain agents' $purple '#ffffff' 23 16
DrawArrow ($xB + 600) 836 ($xB + 600) 854 $purple 5

DrawNode ($xB + 70) 1045 220 142 'Business Data Cloud' 'Governed data products' $teal '#ffffff' 19 15
DrawNode ($xB + 320) 1045 220 142 'Knowledge Graph' 'Business meaning' $teal '#ffffff' 19 15
DrawNode ($xB + 570) 1045 220 142 'Joule Agents' 'Plan and reason' $purple '#ffffff' 20 15
DrawNode ($xB + 820) 1045 260 142 'Action Fabric' 'Integration Suite / APIs / events' $blue '#ffffff' 19 14
DrawArrow ($xB + 290) 1116 ($xB + 314) 1116 $teal 4
DrawArrow ($xB + 540) 1116 ($xB + 564) 1116 $teal 4
DrawArrow ($xB + 790) 1116 ($xB + 814) 1116 $blue 4
DrawArrow ($xB + 600) 978 ($xB + 680) 1038 $purple 4 $true

DrawNode ($xB + 660) 1250 250 132 'SAP Applications' 'Finance / Spend / SCM / HCM / CX' $blue '#ffffff' 20 15
DrawNode ($xB + 930) 1250 220 132 'Non-SAP' 'Salesforce / Microsoft / ServiceNow' '#62758b' '#ffffff' 20 14
DrawArrow ($xB + 950) 1194 ($xB + 790) 1242 $blue 4
DrawArrow ($xB + 950) 1194 ($xB + 1040) 1242 '#8ca0b4' 4

DrawNode ($xB + 90) 1430 330 136 'SAP AI Core' 'generative AI hub / models / grounding' $orange '#ffffff' 21 15
DrawNode ($xB + 450) 1430 330 136 'Joule Studio runtime' 'Managed execution / memory / sandbox' $green '#ffffff' 20 15 $true
DrawNode ($xB + 810) 1430 300 136 'SAP AI Agent Hub' 'Inventory / evaluation / governance' $green '#ffffff' 20 15
DrawArrow ($xB + 600) 1422 ($xB + 680) 1194 '#a58bff' 4 $true

DrawCursor ($xB + 974) 1088 $navy
DrawTooltip ($xB + 620) 930 500 236 'SAP Integration Suite' 'Governed action fabric connecting agents to SAP and non-SAP systems through APIs, events, adapters, MCP and A2A.' $blue
DrawFooterNote $xB 1768 $panelW 'customer storytelling, demos and custom integration' 'hover previews each step; clicking highlights its incoming and outgoing paths' 'the flow becomes a vertical step sequence' $purple

# OPTION C - Interactive explorer
$xC = $panelX[2]
DrawOptionHeader $xC $panelY $panelW 'C' 'Interactive Architecture Explorer' 'Layer, flow and product views with hover definitions and a persistent detail inspector.' $teal
DrawRoundedRect ($xC + 34) 602 ($panelW - 68) 1080 $deepNavy '#183b7a' 2 20 $false

# Mini app chrome
DrawRoundedRect ($xC + 54) 626 1092 72 '#ffffff' '#c8d5e3' 2 14 $false
DrawText ($xC + 78) 638 410 42 'SAP AI Architecture Explorer' 23 $navy ([System.Drawing.FontStyle]::Bold)
DrawChip ($xC + 600) 638 150 42 '#e8f2ff' '#7fb5e7' 'Layers' $blue 16
DrawChip ($xC + 760) 638 150 42 '#f4f7fb' '#c8d5e3' 'Flow' '#62758b' 16
DrawChip ($xC + 920) 638 190 42 '#f4f7fb' '#c8d5e3' 'Products' '#62758b' 16

# Sidebar
DrawRoundedRect ($xC + 54) 718 250 918 '#0d2b62' '#315798' 2 14 $false
DrawText ($xC + 74) 744 210 34 'ARCHITECTURE' 17 '#9fddff' ([System.Drawing.FontStyle]::Bold)
$sideItems = @('User Experience', 'Process', 'Foundation', 'Platform', 'Integration', 'Governance')
for ($i = 0; $i -lt $sideItems.Count; $i++) {
    $itemY = 798 + ($i * 84)
    $fill = if ($i -eq 2) { '#6f43e8' } else { '#15346f' }
    $stroke = if ($i -eq 2) { '#a996ef' } else { '#315798' }
    DrawChip ($xC + 72) $itemY 214 58 $fill $stroke $sideItems[$i] '#ffffff' 16
}
DrawText ($xC + 74) 1338 210 34 'VIEW OPTIONS' 17 '#9fddff' ([System.Drawing.FontStyle]::Bold)
DrawChip ($xC + 72) 1386 214 56 '#15346f' '#315798' 'Show availability' '#ffffff' 14
DrawChip ($xC + 72) 1454 214 56 '#15346f' '#315798' 'Show non-SAP' '#ffffff' 14

# Canvas
DrawRoundedRect ($xC + 324) 718 508 918 '#0a2457' '#315798' 2 14 $false
DrawText ($xC + 346) 742 464 34 'FOUNDATION LAYER' 18 '#9fddff' ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
DrawNode ($xC + 366) 810 200 116 'Business Data Cloud' 'Data products' $teal '#ffffff' 17 14
DrawNode ($xC + 590) 810 200 116 'Knowledge Graph' 'Semantics' $teal '#ffffff' 17 14
DrawArrow ($xC + 566) 868 ($xC + 584) 868 $teal 4
DrawNode ($xC + 366) 960 424 124 'AI Foundation' 'OS interfaces / AI kernel / AI integration / business context' $orange '#ffffff' 20 14 $true
DrawNode ($xC + 366) 1118 200 116 'SAP AI Core' 'Runtime + lifecycle' $orange '#ffffff' 17 14
DrawNode ($xC + 590) 1118 200 116 'generative AI hub' 'Model access' $orange '#ffffff' 17 14
DrawArrow ($xC + 566) 1176 ($xC + 584) 1176 $orange 4
DrawNode ($xC + 366) 1268 200 116 'Document AI' 'Document understanding' $orange '#ffffff' 17 14
DrawNode ($xC + 590) 1268 200 116 'SAP / partner models' 'Domain + frontier' $orange '#ffffff' 16 14
DrawNode ($xC + 366) 1418 424 120 'HANA Cloud' 'Vector, graph and agent memory capabilities' $teal '#ffffff' 19 14

# Detail inspector
DrawRoundedRect ($xC + 852) 718 294 918 '#ffffff' '#c8d5e3' 2 14 $false
DrawText ($xC + 874) 742 250 34 'DEFINITION' 17 $teal ([System.Drawing.FontStyle]::Bold)
DrawText ($xC + 874) 792 250 76 'AI Foundation' 27 $navy ([System.Drawing.FontStyle]::Bold)
DrawText ($xC + 874) 878 250 224 'Technical operating-system capabilities spanning the Foundation and Platform layers.|Includes OS interfaces, AI kernel, AI integration, business context, models and peripheral data.' 17 '#29415f' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Near) ([System.Drawing.StringAlignment]::Near)
DrawText ($xC + 874) 1120 250 28 'CONTAINS' 15 '#6c7f93' ([System.Drawing.FontStyle]::Bold)
DrawChip ($xC + 874) 1156 250 48 '#fff3e7' '#e9a060' 'SAP AI Core' $orange 15
DrawChip ($xC + 874) 1216 250 48 '#fff3e7' '#e9a060' 'generative AI hub' $orange 15
DrawChip ($xC + 874) 1276 250 48 '#fff3e7' '#e9a060' 'SAP AI Launchpad' $orange 15
DrawText ($xC + 874) 1350 250 28 'SOURCE STATUS' 15 '#6c7f93' ([System.Drawing.FontStyle]::Bold)
DrawText ($xC + 874) 1386 250 110 'Official SAP architecture and learning sources. Availability and entitlement remain product-specific.' 15 '#29415f' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Near) ([System.Drawing.StringAlignment]::Near)
DrawChip ($xC + 874) 1520 250 52 '#e9f7ed' '#75bc8e' 'Click to pin details' $green 15

DrawCursor ($xC + 705) 1014 $navy
DrawTooltip ($xC + 512) 920 340 170 'Hover preview' 'A short definition appears immediately; click keeps the detail inspector open.' $teal
DrawFooterNote $xC 1768 $panelW 'consultant learning and long-term website integration' 'hover previews; click pins definitions, dependencies, status and sources' 'detail inspector becomes a bottom sheet' $teal

# Board recommendation
DrawRoundedRect 60 2022 3720 86 '#071a45' '#1fa8d1' 3 18 $false
DrawText 90 2030 3660 68 'Recommended combination: A as the default architecture view + C interaction model + B as a selectable "How it works" flow.' 25 '#ffffff' ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)

$directory = Split-Path -Parent $OutputPath
if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
}
$bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()
Write-Output $OutputPath
