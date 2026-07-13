param(
    [string]$OutputPath = (Join-Path (Split-Path -Parent $PSScriptRoot) 'assets\sap-business-ai-architecture-2026.png')
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$width = 3840
$height = 2160
$bitmap = [System.Drawing.Bitmap]::new($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#eef3f8'))

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
    [string]$fill, [string]$stroke = '#d2dce8',
    [float]$strokeWidth = 2, [float]$radius = 18,
    [bool]$dashed = $false
) {
    $path = RoundedPath $x $y $w $h $radius
    $brush = [System.Drawing.SolidBrush]::new((Color $fill))
    $pen = [System.Drawing.Pen]::new((Color $stroke), $strokeWidth)
    if ($dashed) {
        $pen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    }
    $graphics.FillPath($brush, $path)
    $graphics.DrawPath($pen, $path)
    $pen.Dispose()
    $brush.Dispose()
    $path.Dispose()
}

function DrawGradientRoundedRect(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$from, [string]$to, [float]$radius = 18
) {
    $path = RoundedPath $x $y $w $h $radius
    $rect = [System.Drawing.RectangleF]::new([single]$x, [single]$y, [single]$w, [single]$h)
    $brush = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
        $rect,
        (Color $from),
        (Color $to),
        [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal
    )
    $graphics.FillPath($brush, $path)
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

function DrawCard(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$fill, [string]$stroke,
    [string]$title, [string]$body,
    [string]$titleColor = '#071a45',
    [string]$bodyColor = '#29415f',
    [float]$titleSize = 30,
    [float]$bodySize = 22,
    [bool]$dashed = $false,
    [float]$radius = 18,
    [float]$strokeWidth = 2
) {
    DrawRoundedRect $x $y $w $h $fill $stroke $strokeWidth $radius $dashed
    $titleHeight = if ($h -lt 105) { 40 } elseif ($h -lt 155) { 52 } else { 60 }
    DrawText ($x + 20) ($y + 10) ($w - 40) $titleHeight $title $titleSize $titleColor ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
    if ($body) {
        DrawText ($x + 24) ($y + $titleHeight + 10) ($w - 48) ($h - $titleHeight - 24) $body $bodySize $bodyColor ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Near) ([System.Drawing.StringAlignment]::Near)
    }
}

function DrawChip(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$fill, [string]$stroke,
    [string]$text, [string]$textColor = '#071a45',
    [float]$textSize = 21, [bool]$dashed = $false
) {
    DrawRoundedRect $x $y $w $h $fill $stroke 2 14 $dashed
    DrawText ($x + 12) ($y + 4) ($w - 24) ($h - 8) $text $textSize $textColor ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
}

function DrawArrow(
    [float]$x1, [float]$y1, [float]$x2, [float]$y2,
    [string]$color = '#0a6ed1', [float]$strokeWidth = 5,
    [bool]$dashed = $false
) {
    $pen = [System.Drawing.Pen]::new((Color $color), $strokeWidth)
    if ($dashed) {
        $pen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    }
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $graphics.DrawLine($pen, $x1, $y1, $x2, $y2)

    $angle = [Math]::Atan2($y2 - $y1, $x2 - $x1)
    $head = 18
    $spread = 0.55
    $points = @(
        [System.Drawing.PointF]::new([single]$x2, [single]$y2),
        [System.Drawing.PointF]::new(
            [single]($x2 - $head * [Math]::Cos($angle - $spread)),
            [single]($y2 - $head * [Math]::Sin($angle - $spread))
        ),
        [System.Drawing.PointF]::new(
            [single]($x2 - $head * [Math]::Cos($angle + $spread)),
            [single]($y2 - $head * [Math]::Sin($angle + $spread))
        )
    )
    $brush = [System.Drawing.SolidBrush]::new((Color $color))
    $graphics.FillPolygon($brush, $points)
    $brush.Dispose()
    $pen.Dispose()
}

function DrawLaneLabel(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$fill, [string]$number, [string]$title
) {
    DrawRoundedRect $x $y $w $h $fill $fill 1 20 $false
    DrawText ($x + 18) ($y + 22) ($w - 36) 62 $number 42 '#ffffff' ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
    DrawText ($x + 18) ($y + 82) ($w - 36) ($h - 104) $title 21 '#ffffff' ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
}

function DrawPillarHeader(
    [float]$x, [float]$y, [float]$w,
    [string]$fill, [string]$title, [string]$subtitle
) {
    DrawRoundedRect $x $y $w 66 $fill $fill 1 16 $false
    DrawText ($x + 18) ($y + 4) ($w - 36) 34 $title 27 '#ffffff' ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
    DrawText ($x + 18) ($y + 36) ($w - 36) 24 $subtitle 17 '#ffffff' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Center)
}

# Palette
$navy = '#071a45'
$deepNavy = '#031f49'
$blue = '#0a6ed1'
$cyan = '#1fa8d1'
$purple = '#6f43e8'
$lavender = '#8d6df2'
$teal = '#0b8f8c'
$green = '#18864b'
$orange = '#e9730c'
$ink = '#071a45'
$body = '#29415f'
$muted = '#62758b'

# Header
$headerBrush = [System.Drawing.SolidBrush]::new((Color $deepNavy))
$graphics.FillRectangle($headerBrush, 0, 0, $width, 174)
$headerBrush.Dispose()

DrawText 62 26 2500 66 'SAP AI architecture: where everything fits' 60 '#ffffff' ([System.Drawing.FontStyle]::Bold)
DrawText 66 98 2500 44 'Official 2026 reference map - experience, autonomous applications, data, models, integration, runtime and governance' 27 '#c8e9ff'

DrawRoundedRect 2640 22 1135 130 '#ffffff' '#57c7ee' 3 18 $false
DrawText 2664 30 1085 30 'NAME IT RIGHT' 22 $blue ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
DrawText 2672 58 1068 88 'SAP Business AI = umbrella / portfolio|SAP Business AI Platform = unified 2026 foundation|AI Foundation = technical services on SAP BTP|Joule (not Journey) / Salesforce = non-SAP endpoint' 17 $ink ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Near) ([System.Drawing.StringAlignment]::Near)

# North-star banner
DrawGradientRoundedRect 48 186 3744 76 $purple $blue 20
DrawText 84 193 3672 60 'SAP AUTONOMOUS ENTERPRISE - people set direction; AI executes; governance applies at every step' 31 '#ffffff' ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)

# Layer 1: Joule
DrawRoundedRect 48 276 3744 268 '#f7f3ff' '#c9b9f7' 2 24 $false
DrawLaneLabel 62 290 230 240 $purple '1' 'JOULE|ONE INTENT-DRIVEN|EXPERIENCE'

$jouleX = @(330, 1186, 2042, 2898)
DrawCard $jouleX[0] 306 830 224 '#ffffff' '#a996ef' 'Joule Work' 'Human entry point|Conversations / Spaces / Develop|Web / desktop / mobile / voice' $purple $body 32 22 $false 18 3
DrawCard $jouleX[1] 306 830 224 '#ffffff' '#a996ef' 'Joule Assistants' 'Role and process-aware coordinators|Translate intent into an end-to-end plan|Coordinate agents across business domains' $purple $body 30 21 $false 18 3
DrawCard $jouleX[2] 306 830 224 '#ffffff' '#a996ef' 'Joule Agents' 'SAP-delivered, custom and third-party agents|Reason, select tools and execute multi-step work|Grounded in business data and process context' $purple $body 30 21 $false 18 3
DrawCard $jouleX[3] 306 830 224 '#ffffff' '#a996ef' 'Embedded AI & Joule Skills' 'Embedded AI works inside SAP applications|Skills perform bounded, deterministic actions|Hundreds of scenarios; availability varies' $purple $body 29 21 $false 18 3

DrawArrow 1160 418 1180 418 $purple 5
DrawArrow 2016 418 2036 418 $purple 5
DrawArrow 2872 418 2892 418 $purple 5

# Layer 2: SAP Autonomous Suite
DrawRoundedRect 48 560 3744 382 '#f1f7ff' '#a9c9eb' 2 24 $false
DrawLaneLabel 62 574 230 354 $blue '2' 'SAP|AUTONOMOUS|SUITE|WHERE|PROCESSES RUN'

DrawRoundedRect 330 578 3430 60 '#dceeff' '#7fb5e7' 2 16 $false
DrawText 352 584 3386 48 'ERP foundation: SAP Cloud ERP / SAP Cloud ERP Private / eligible hybrid and on-premise systems' 25 $navy ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)

$domainX = @(330, 1010, 1690, 2370, 3050)
$domainW = 656
DrawCard $domainX[0] 650 $domainW 214 '#ffffff' '#74aee2' 'Autonomous Finance' 'SAP Cloud ERP / Private|Accounting and close / treasury / tax / risk|Planning / quote-to-cash / project finance' $blue $body 28 20 $false 18 3
DrawCard $domainX[1] 650 $domainW 214 '#ffffff' '#74aee2' 'Autonomous Spend' 'SAP Ariba / SAP Concur / SAP Fieldglass|Sourcing / contracts / buying / invoicing|Travel, expense and external workforce' $blue $body 28 20 $false 18 3
DrawCard $domainX[2] 650 $domainW 214 '#ffffff' '#74aee2' 'Autonomous SCM' 'SAP IBP / Digital Manufacturing / EWM / TM|Product lifecycle / planning / logistics|Manufacturing / asset and service management' $blue $body 28 19 $false 18 3
DrawCard $domainX[3] 650 $domainW 214 '#ffffff' '#74aee2' 'Autonomous HCM' 'SAP SuccessFactors HCM|Employee Central / payroll / recruiting|Learning / talent / workforce planning' $blue $body 28 20 $false 18 3
DrawCard $domainX[4] 650 $domainW 214 '#ffffff' '#74aee2' 'Autonomous CX' 'SAP Sales Cloud / Service Cloud / Commerce Cloud|SAP Engagement Cloud / CPQ / Field Service|Customer data and order management' $blue $body 28 19 $false 18 3

DrawChip 330 882 820 46 '#e8ddff' '#a996ef' 'INDUSTRY AI - vertical scenarios across all five domains' $purple 20
DrawChip 1174 882 820 46 '#e5f7fa' '#72bfd0' 'SAP BUSINESS NETWORK - cross-company collaboration' '#126b7b' 20
DrawChip 2018 882 820 46 '#e9f7ed' '#75bc8e' 'SUSTAINABILITY & EHS - cross-domain outcomes' $green 20
DrawChip 2862 882 844 46 '#edf1f5' '#a8b4c2' 'EMBEDDED AI - features inside the applications above' $navy 20

# Layer 3: SAP Business AI Platform
DrawRoundedRect 48 958 3744 994 '#ffffff' '#7e9ab8' 3 24 $false
DrawLaneLabel 62 972 230 966 $deepNavy '3' 'SAP BUSINESS|AI PLATFORM|UNIFIED|FOUNDATION'

DrawRoundedRect 330 974 3430 62 '#e8eef6' '#aebdcd' 2 16 $false
DrawText 352 980 3386 50 'Three official pillars: BUILD & INTEGRATE / CONTEXTUALIZE & REASON / GOVERN & RUN' 28 $navy ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)

$pillarY = 1050
$pillarH = 832
$pillarW = 1124
$buildX = 330
$contextX = 1478
$governX = 2626

DrawRoundedRect $buildX $pillarY $pillarW $pillarH '#fff8ef' '#f0b17a' 2 20 $false
DrawPillarHeader 346 1066 1092 $orange 'BUILD & INTEGRATE' 'Create, extend and connect agents, applications and workflows'
DrawCard 356 1148 1072 126 '#ffffff' '#f0b17a' 'Joule Studio' 'AI-first design and development environment for custom agents, applications, skills, extensions and workflows.' $orange $body 29 21 $false 16 2
DrawCard 356 1288 1072 126 '#ffffff' '#f0b17a' 'SAP Integration Suite' 'Connects SAP and non-SAP systems through APIs, events, adapters, Graph and integration flows; the action path for agents.' $orange $body 29 20 $false 16 2
DrawCard 356 1428 1072 104 '#ffffff' '#f0b17a' 'SAP Build + CAP + pro-code SDKs' 'Low-code and pro-code development / SAP Cloud SDK for AI / custom tools, APIs and workflows.' $orange $body 27 20 $false 16 2

DrawRoundedRect 356 1546 1072 318 '#fffdf9' '#e9a060' 3 18 $true
DrawText 378 1554 1028 34 'AI Foundation - cross-cutting SAP BTP technical / AI operating-system view' 23 $orange ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
DrawChip 378 1596 1028 42 '#fff3e7' '#e9a060' 'OS INTERFACES - Unified AI Portal* / AI Playground / development / operations and administration' $orange 17 $true
DrawChip 378 1646 1028 42 '#fff3e7' '#e9a060' 'AI KERNEL - agents / orchestration / routing / lifecycle / security' $orange 18
DrawChip 378 1696 1028 42 '#fff3e7' '#e9a060' 'AI INTEGRATION - data / workloads / AI models / services' $orange 18
DrawChip 378 1746 500 54 '#fff3e7' '#e9a060' 'BUSINESS CONTEXT|Knowledge Graph / SAP content / SAP Foundation Model -> current Domain and predictive models' $orange 13
DrawChip 898 1746 508 54 '#fff3e7' '#e9a060' 'PERIPHERAL & DATA|SAP/non-SAP data / infrastructure / partner models / remote services' $orange 14
DrawText 386 1806 1012 27 'Named services: generative AI hub (within SAP AI Core) / SAP AI Launchpad / SAP Document AI / AI SDKs and APIs' 16 $orange ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
DrawText 386 1835 1012 19 '*Spans build, context and runtime. Unified AI Portal is an interface term, not a separate platform.' 14 $muted ([System.Drawing.FontStyle]::Italic) ([System.Drawing.StringAlignment]::Center)

DrawRoundedRect $contextX $pillarY $pillarW $pillarH '#f0fbfa' '#70c2bd' 2 20 $false
DrawPillarHeader 1494 1066 1092 $teal 'CONTEXTUALIZE & REASON' 'Give AI trusted data, business meaning, policies and fit-for-purpose models'
DrawCard 1504 1148 1072 272 '#ffffff' '#70c2bd' 'SAP Business Data Cloud' 'Governed business data fabric + reusable data products|SAP Datasphere / SAP Analytics Cloud / SAP HANA Cloud|SAP Business Warehouse / SAP Master Data Governance|SAP Databricks / SAP Business Data Cloud Connect|Unifies SAP + third-party data through federation, replication and zero-copy sharing.' $teal $body 29 20 $false 16 2
DrawCard 1504 1434 1072 194 '#ffffff' '#70c2bd' 'SAP Knowledge Graph' 'SAP-managed semantic map of business meaning and relationships.|Supplier <-> purchase order <-> invoice / policies / APIs / processes|It guides agents to the right entity and action; it is not the transaction-data store.' $teal $body 29 20 $false 16 2
DrawCard 1504 1642 1072 222 '#ffffff' '#70c2bd' 'SAP AI Services & Models' 'SAP Domain Models / SAP-ABAP-1 / SAP-RPT-1.5 / SAP Document AI|SAP and governed third-party frontier models|generative AI hub: multi-provider access, selection, prompts and orchestration|Business grounding via HANA vector and graph engines, plus agent memory.' $teal $body 28 18 $false 16 2

DrawRoundedRect $governX $pillarY $pillarW $pillarH '#f2fbf5' '#83bf96' 2 20 $false
DrawPillarHeader 2642 1066 1092 $green 'GOVERN & RUN' 'Operate safely; control identity, lifecycle, value, observability and compliance'
DrawCard 2652 1148 1072 170 '#ffffff' '#83bf96' 'SAP AI Agent Hub' 'Vendor-agnostic command center for discovery, inventory, evaluation and governance of SAP and third-party agents, LLMs and MCP servers. It governs; it does not execute agents.' $green $body 29 20 $false 16 2
DrawCard 2652 1332 1072 156 '#ffffff' '#83bf96' 'Joule Studio runtime' 'Managed production execution for custom agents, applications and workflows; sandboxing, memory, policies, lifecycle and observability. Phased 2026 rollout.' $green $body 28 20 $true 16 3
DrawCard 2652 1502 1072 150 '#ffffff' '#83bf96' 'Identity, access, security & Responsible AI' 'Relevant / Reliable / Responsible|SAP Cloud Identity Services / CIAM / least privilege / human approval / audit / data protection / policy enforcement.' $green $body 27 19 $false 16 2
DrawCard 2652 1666 1072 198 '#ffffff' '#83bf96' 'SAP LeanIX / SAP Signavio / SAP Cloud ALM' 'LeanIX: architecture, dependencies and value alignment.|Signavio: process context, agent mining, conformance and outcomes.|Cloud ALM: lifecycle and operational observability.' $green $body 27 20 $false 16 2

DrawRoundedRect 330 1896 3430 42 '#e8eef6' '#aebdcd' 2 14 $false
DrawText 350 1898 3390 36 'SAP BTP core capabilities: runtime / application lifecycle / security / interoperability / administration / multi-cloud and sovereign deployment' 20 $navy ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)

# Custom and cross-platform execution path
DrawRoundedRect 48 1968 3744 132 $deepNavy $deepNavy 1 20 $false
DrawText 74 1973 3692 30 'CUSTOM & CROSS-PLATFORM EXECUTION PATH' 21 '#9fddff' ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)

$flowX = @(109, 631, 1153, 1675, 2197, 2719, 3241)
$flowW = 490
$flowColors = @('#6f43e8', '#6f43e8', '#0b8f8c', '#e9730c', '#0a6ed1', '#425b76', '#18864b')
$flowTitles = @('1  INTENT', '2  COORDINATE', '3  GROUND', '4  REASON', '5  ACT', '6  SYSTEMS', '7  GOVERN')
$flowBodies = @(
    'Joule Work',
    'Assistant + agents',
    'BDC + Knowledge Graph',
    'Models via gen AI hub',
    'Integration Suite|MCP / A2A / API / event',
    'SAP apps + Salesforce / Agentforce|Microsoft / ServiceNow / custom',
    'Agent Hub + runtime|observe / approve / audit'
)

for ($i = 0; $i -lt 7; $i++) {
    DrawRoundedRect $flowX[$i] 2010 $flowW 74 '#ffffff' $flowColors[$i] 3 14 $false
    DrawText ($flowX[$i] + 12) 2014 ($flowW - 24) 25 $flowTitles[$i] 18 $flowColors[$i] ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Center)
    DrawText ($flowX[$i] + 14) 2038 ($flowW - 28) 42 $flowBodies[$i] 15 $ink ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Center)
    if ($i -lt 6) {
        DrawArrow ($flowX[$i] + $flowW + 4) 2047 ($flowX[$i + 1] - 6) 2047 '#9fddff' 4
    }
}

# Footer / accuracy note
DrawText 58 2107 2750 42 'SAP AI landscape as of 13 July 2026 - product families and major platform services. Individual features, agents, licensing, regions and availability vary by release.' 18 $muted ([System.Drawing.FontStyle]::Regular)
DrawText 2830 2107 950 42 'Solid = current product/capability     Dashed = interface term or phased 2026 availability' 18 $muted ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Far)

$directory = Split-Path -Parent $OutputPath
if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
}
$bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$bitmap.Dispose()

Write-Output $OutputPath
