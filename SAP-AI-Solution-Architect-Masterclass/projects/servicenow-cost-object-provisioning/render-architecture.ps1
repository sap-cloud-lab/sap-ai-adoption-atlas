param(
    [string]$OutputPath = (Join-Path $PSScriptRoot 'servicenow-cost-object-provisioning-architecture.png')
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$width = 2800
$height = 1750
$bitmap = [System.Drawing.Bitmap]::new($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$graphics.Clear([System.Drawing.Color]::White)

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

function DrawRoundedBox(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$fill, [string]$stroke,
    [string]$title, [string]$subtitle,
    [string]$titleColor = '#071a45',
    [string]$subtitleColor = '#29415f',
    [float]$titleSize = 29,
    [float]$subtitleSize = 21,
    [float]$radius = 18,
    [float]$strokeWidth = 3
) {
    $path = RoundedPath $x $y $w $h $radius
    $brush = [System.Drawing.SolidBrush]::new((Color $fill))
    $pen = [System.Drawing.Pen]::new((Color $stroke), $strokeWidth)
    $graphics.FillPath($brush, $path)
    $graphics.DrawPath($pen, $path)

    $titleFont = Font $titleSize ([System.Drawing.FontStyle]::Bold)
    $subtitleFont = Font $subtitleSize
    $format = [System.Drawing.StringFormat]::new()
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $format.Trimming = [System.Drawing.StringTrimming]::EllipsisWord

    if ($h -le 95) {
        $titleHeight = [Math]::Min(32, $h * 0.36)
        $subtitleTop = $titleHeight + 10
        $subtitleHeight = $h - $subtitleTop - 6
        $titleRect = [System.Drawing.RectangleF]::new([single]($x + 14), [single]($y + 6), [single]($w - 28), [single]$titleHeight)
        $subtitleRect = [System.Drawing.RectangleF]::new([single]($x + 16), [single]($y + $subtitleTop), [single]($w - 32), [single]$subtitleHeight)
    }
    else {
        $titleRect = [System.Drawing.RectangleF]::new([single]($x + 14), [single]($y + 10), [single]($w - 28), [single]([Math]::Min(58, $h * 0.42)))
        $subtitleRect = [System.Drawing.RectangleF]::new([single]($x + 16), [single]($y + 56), [single]($w - 32), [single]($h - 66))
    }
    $titleBrush = [System.Drawing.SolidBrush]::new((Color $titleColor))
    $subtitleBrush = [System.Drawing.SolidBrush]::new((Color $subtitleColor))
    $graphics.DrawString(($title -replace '\|', [Environment]::NewLine), $titleFont, $titleBrush, $titleRect, $format)
    if ($subtitle) {
        $graphics.DrawString(($subtitle -replace '\|', [Environment]::NewLine), $subtitleFont, $subtitleBrush, $subtitleRect, $format)
    }

    $titleFont.Dispose()
    $subtitleFont.Dispose()
    $titleBrush.Dispose()
    $subtitleBrush.Dispose()
    $format.Dispose()
    $pen.Dispose()
    $brush.Dispose()
    $path.Dispose()
}

function DrawLane([float]$y, [float]$h, [string]$fill, [string]$label, [string]$labelFill) {
    $laneBrush = [System.Drawing.SolidBrush]::new((Color $fill))
    $graphics.FillRectangle($laneBrush, 35, $y, 2730, $h)
    $laneBrush.Dispose()

    $path = RoundedPath 45 ($y + 18) 245 ($h - 36) 16
    $labelBrush = [System.Drawing.SolidBrush]::new((Color $labelFill))
    $graphics.FillPath($labelBrush, $path)
    $labelBrush.Dispose()

    $format = [System.Drawing.StringFormat]::new()
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $format.FormatFlags = [System.Drawing.StringFormatFlags]::DirectionVertical
    $font = Font 28 ([System.Drawing.FontStyle]::Bold)
    $brush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
    $rect = [System.Drawing.RectangleF]::new([single]70, [single]($y + 30), [single]195, [single]($h - 60))
    $graphics.DrawString($label, $font, $brush, $rect, $format)
    $font.Dispose()
    $brush.Dispose()
    $format.Dispose()
    $path.Dispose()
}

function DrawArrow(
    [float]$x1, [float]$y1, [float]$x2, [float]$y2,
    [string]$color = '#086ad8',
    [float]$width = 6,
    [bool]$dashed = $false
) {
    $pen = [System.Drawing.Pen]::new((Color $color), $width)
    if ($dashed) {
        $pen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    }
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $graphics.DrawLine($pen, $x1, $y1, $x2, $y2)

    $angle = [Math]::Atan2($y2 - $y1, $x2 - $x1)
    $head = 18
    $spread = 0.55
    $p1 = [System.Drawing.PointF]::new([single]$x2, [single]$y2)
    $p2 = [System.Drawing.PointF]::new(
        [single]($x2 - $head * [Math]::Cos($angle - $spread)),
        [single]($y2 - $head * [Math]::Sin($angle - $spread))
    )
    $p3 = [System.Drawing.PointF]::new(
        [single]($x2 - $head * [Math]::Cos($angle + $spread)),
        [single]($y2 - $head * [Math]::Sin($angle + $spread))
    )
    $brush = [System.Drawing.SolidBrush]::new((Color $color))
    $graphics.FillPolygon($brush, @($p1, $p2, $p3))
    $brush.Dispose()
    $pen.Dispose()
}

function DrawLine(
    [float]$x1, [float]$y1, [float]$x2, [float]$y2,
    [string]$color = '#086ad8',
    [float]$width = 6,
    [bool]$dashed = $false
) {
    $pen = [System.Drawing.Pen]::new((Color $color), $width)
    if ($dashed) {
        $pen.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
    }
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $graphics.DrawLine($pen, $x1, $y1, $x2, $y2)
    $pen.Dispose()
}

function DrawLabel(
    [float]$x, [float]$y, [float]$w, [float]$h,
    [string]$text, [float]$size, [string]$color,
    [System.Drawing.FontStyle]$style = [System.Drawing.FontStyle]::Regular,
    [System.Drawing.StringAlignment]$align = [System.Drawing.StringAlignment]::Center
) {
    $font = Font $size $style
    $brush = [System.Drawing.SolidBrush]::new((Color $color))
    $format = [System.Drawing.StringFormat]::new()
    $format.Alignment = $align
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $format.Trimming = [System.Drawing.StringTrimming]::EllipsisWord
    $rect = [System.Drawing.RectangleF]::new([single]$x, [single]$y, [single]$w, [single]$h)
    $graphics.DrawString(($text -replace '\|', [Environment]::NewLine), $font, $brush, $rect, $format)
    $font.Dispose()
    $brush.Dispose()
    $format.Dispose()
}

# Palette
$navy = '#062b5e'
$deepNavy = '#031f49'
$blue = '#086ad8'
$cyan = '#22b9de'
$lavender = '#7056ff'
$teal = '#2aa7a1'
$ink = '#071a45'
$orange = '#f59e0b'
$red = '#c62828'
$green = '#18864b'

# Header
$headerBrush = [System.Drawing.SolidBrush]::new((Color $deepNavy))
$graphics.FillRectangle($headerBrush, 0, 0, $width, 150)
$headerBrush.Dispose()
DrawLabel 65 15 1980 74 'Governed AI Provisioning for Cost Centers & WBS Elements' 48 '#ffffff' ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Near)
DrawLabel 68 86 2000 44 'ServiceNow intake; SAP Business AI; human approval; S/4HANA Cloud APIs; Business Data Cloud' 25 '#bfe7ff' ([System.Drawing.FontStyle]::Regular) ([System.Drawing.StringAlignment]::Near)
DrawRoundedBox 2190 27 540 94 '#ffffff' '#22b9de' 'CONTROL PRINCIPLE' 'AI proposes; rules validate; human approves; APIs execute' $navy $ink 24 17 16 3

# Lanes
DrawLane 175 260 '#f1f7ff' '1  EXPERIENCE & INTAKE' $navy
DrawLane 465 320 '#f7f4ff' '2  BUSINESS AI & INTEGRATION' $lavender
DrawLane 815 360 '#f1fbfa' '3  GOVERNED PROCESS CONTROL' $teal
DrawLane 1205 400 '#f6f8fb' '4  SAP BUSINESS APPLICATIONS & DATA' $blue

# Lane 1
DrawRoundedBox 320 240 300 130 '#ffffff' '#7aaee6' 'Microsoft 365' 'Outlook email|and attachments'
DrawRoundedBox 670 240 300 130 '#ffffff' '#7aaee6' 'ServiceNow' 'Catalog form|Inbound email flow'
DrawRoundedBox 1020 240 300 130 '#ffffff' '#7aaee6' 'WalkMe + Joule' 'Action Bar in ServiceNow|screen context only'
DrawRoundedBox 1370 240 300 130 '#ffffff' '#7aaee6' 'Joule' 'Ask, clarify, inspect|approve through workflow' $navy $ink 29 17 18 3
DrawRoundedBox 1720 240 300 130 '#fffaf0' '#f0b24b' 'ChatGPT / Codex' 'Optional user/developer tool|NOT production middleware' $navy $ink 28 18 18 3
DrawRoundedBox 2070 225 330 160 '#e8f4ff' $blue 'ServiceNow Request' 'SYSTEM OF RECORD|ticket; requester; evidence' $navy $ink 29 18 20 4
DrawArrow 620 305 670 305 $blue 5
DrawLine 820 370 820 410 $blue 5
DrawLine 1170 370 1170 410 $blue 5
DrawLine 1520 370 1520 410 $blue 5
DrawLine 820 410 2235 410 $blue 5
DrawLine 1870 370 1870 410 $orange 5 $true
DrawArrow 2235 410 2235 385 $blue 5

# Lane 2 main products
DrawRoundedBox 320 525 300 110 '#ffffff' '#a79aef' 'API Management' 'OAuth; mTLS; schema|quota; threat protection' $navy $ink 27 18 18 3
DrawRoundedBox 670 525 300 110 '#ffffff' '#a79aef' 'SAP Integration Suite' 'HTTPS inbound mapping|ServiceNow receiver for callbacks' $navy $ink 24 16 18 3
DrawRoundedBox 1020 525 300 110 '#ffffff' '#a79aef' 'SAP Build' 'Process Automation|API / event trigger'
DrawRoundedBox 1370 525 300 110 '#ffffff' '#a79aef' 'Joule Studio' 'Custom Agent|extract; ask; summarize' $navy $ink 27 18 18 3
DrawRoundedBox 1720 525 300 110 '#ffffff' '#a79aef' 'Joule Skill' 'Deterministic workflow|submission and status'
DrawRoundedBox 2070 525 330 110 '#ffffff' '#a79aef' 'AI Agent Hub' 'Agent inventory|policy; lifecycle; traces' $navy $ink 27 18 18 3

DrawLine 2370 385 2370 450 $blue 6
DrawLine 2370 450 470 450 $blue 6
DrawArrow 470 450 470 525 $blue 6
DrawArrow 620 580 670 580 $lavender 6
DrawArrow 970 580 1020 580 $lavender 6
DrawArrow 1720 580 1670 580 $lavender 5 $true
DrawArrow 1370 580 1320 580 $lavender 5 $true
DrawLine 1520 370 1520 500 $lavender 4 $true
DrawLabel 1390 462 630 28 'optional conversational trigger / status' 15 '#544a88' ([System.Drawing.FontStyle]::Italic)

# Lane 2 supporting platform row
DrawRoundedBox 410 670 390 85 '#eef8ff' '#7aaee6' 'SAP Cloud Identity Services' 'IAS; Entra federation; app-to-app trust' $navy $ink 24 14 15 2
DrawRoundedBox 850 670 390 85 '#eef8ff' '#7aaee6' 'Destinations & Secrets' 'Scopes: read, create, plan, release' $navy $ink 24 14 15 2
DrawRoundedBox 1290 670 390 85 '#f1efff' '#a79aef' 'SAP AI Core' 'Generative AI Hub; masking; filtering' $navy $ink 24 14 15 2
DrawRoundedBox 1730 670 390 85 '#f1efff' '#a79aef' 'Optional OpenAI API Agent' 'Approved deployed service; A2A outbound from Joule' $navy $ink 23 14 15 2
DrawRoundedBox 2170 670 230 85 '#eef8ff' '#7aaee6' 'Event Mesh' 'Optional async replay' $navy $ink 23 18 15 2

DrawLine 1170 635 1170 650 $lavender 6
DrawLine 1170 650 300 650 $lavender 6
DrawLine 300 650 300 800 $lavender 6
DrawLine 300 800 455 800 $lavender 6
DrawArrow 455 800 455 880 $teal 6

# Lane 3 governed flow
DrawRoundedBox 320 880 270 155 '#ffffff' '#65bfb8' 'CAP + HANA Cloud' 'Draft proposal|revision; audit|idempotency' $navy $ink 27 18 18 3
DrawRoundedBox 630 880 270 155 '#ffffff' '#65bfb8' 'AI Extraction' 'Schema constrained|confidence + evidence|no financial guessing'
DrawRoundedBox 940 880 270 155 '#ffffff' '#65bfb8' 'Deterministic Validation' 'SAP values; duplicates|dates; hierarchy|plan scope' $navy $ink 27 18 18 3
DrawRoundedBox 1250 865 360 185 '#fff4df' $orange 'HUMAN APPROVAL' 'Named approver; SoD|approve; reject; clarify|NO SAVE BEFORE APPROVAL' $red $ink 30 20 22 5
DrawRoundedBox 1650 880 300 155 '#ffffff' '#65bfb8' 'Approved Process Action' 'Immutable payload hash|durable workflow state|controlled retry'
DrawRoundedBox 1990 880 300 155 '#eaf9ef' '#59a778' 'Released API Calls' 'Allowlisted SAP actions|least privilege|no generic write tool' $green $ink 28 20 18 4

DrawArrow 590 958 630 958 $teal 6
DrawArrow 900 958 940 958 $teal 6
DrawArrow 1210 958 1250 958 $orange 7
DrawArrow 1610 958 1650 958 $teal 6
DrawArrow 1950 958 1990 958 $green 6

# Lane 3 context and controls
DrawRoundedBox 430 1080 430 70 '#edf7ff' '#7aaee6' 'Clarification loop' 'Return missing or ambiguous fields to ServiceNow / Joule' $navy $ink 22 14 14 2
DrawRoundedBox 900 1080 430 70 '#edf7ff' '#7aaee6' 'Read-before-retry' 'After timeout, check SAP before another create' $navy $ink 22 17 14 2
DrawRoundedBox 1370 1080 430 70 '#edf7ff' '#7aaee6' 'Immutable approval evidence' 'Source; proposal; validation; approver; timestamp' $navy $ink 22 14 14 2
DrawRoundedBox 1840 1080 430 70 '#edf7ff' '#7aaee6' 'Exception work queue' 'Never auto-delete a partially created object' $navy $ink 22 17 14 2

DrawLine 2290 958 2400 958 $green 6
DrawLine 2400 958 2400 1175 $green 6
DrawLine 2400 1175 300 1175 $green 6
DrawLine 300 1175 300 1520 $green 6

# Monitoring rail across lanes 2-4
DrawRoundedBox 2450 495 275 1080 '#eef2f7' '#8290a3' 'MONITOR & AUDIT' 'ServiceNow history||API Management||Integration Suite||Build Process Automation||Joule / model traces||S/4 API and AIF logs||Plan reconciliation||SAP Cloud ALM||Common correlation ID' $navy $ink 27 22 20 3

# Lane 4 Cost Center track
DrawLabel 315 1220 2050 42 'COST CENTER PATH - stage outside S/4 until approval' 25 $navy ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Near)
DrawRoundedBox 320 1270 340 120 '#ffffff' '#7aaee6' 'Cost Center API' 'API_COST_CENTER; OData V4|SAP_COM_0943' $navy $ink 29 18 18 3
DrawRoundedBox 705 1270 340 120 '#ffffff' '#7aaee6' 'Cost Center Created' 'Active master record|no documented draft API'
DrawRoundedBox 1090 1270 340 120 '#ffffff' '#7aaee6' 'Forecast / BUDGET02' 'Periodic forecast or annual budget|category-specific fixed scope' $navy $ink 26 16 18 3
DrawRoundedBox 1475 1270 340 120 '#ffffff' '#7aaee6' 'Plan Read-Back' 'API_FINPLANNINGENTRYITEM_SRV|reconcile lines and totals' $navy $ink 27 14 18 3
DrawRoundedBox 1860 1270 430 120 '#eaf9ef' '#59a778' 'Ready for Finance Use' 'Master and plan data verified|eligible for approved use' $green $ink 27 18 18 4
DrawArrow 300 1330 320 1330 $green 6
DrawArrow 660 1330 705 1330 $blue 6
DrawArrow 1045 1330 1090 1330 $blue 6
DrawArrow 1430 1330 1475 1330 $blue 6
DrawArrow 1815 1330 1860 1330 $green 6

# Lane 4 Project / WBS track
DrawLabel 315 1415 2050 42 'ENTERPRISE PROJECT / WBS PATH - two approval gates' 25 $navy ([System.Drawing.FontStyle]::Bold) ([System.Drawing.StringAlignment]::Near)
DrawRoundedBox 320 1460 340 120 '#ffffff' '#a79aef' 'Enterprise Project API' 'API_ENTERPRISE_PROJECT_SRV_0002|SAP_COM_0308' $navy $ink 27 17 18 3
DrawRoundedBox 705 1460 340 120 '#f1efff' '#a79aef' 'Created (00) + Blocks' 'Project and WBS exist|planning allowed; not released' $navy $ink 27 18 18 3
DrawRoundedBox 1090 1460 340 120 '#ffffff' '#a79aef' 'Forecast / BUDGET01' 'Periodic WBS plan or|whole-project annual budget' $navy $ink 26 16 18 3
DrawRoundedBox 1475 1460 340 120 '#fff4df' $orange 'GATE 2' 'Review created hierarchy|scope-aware reconciliation' $red $ink 29 18 18 4
DrawRoundedBox 1860 1460 430 120 '#eaf9ef' '#59a778' 'Released (10)' 'Commitments and actual costs enabled|ready for approved execution' $green $ink 29 18 18 4
DrawArrow 300 1520 320 1520 $green 6
DrawArrow 660 1520 705 1520 $lavender 6
DrawArrow 1045 1520 1090 1520 $lavender 6
DrawArrow 1430 1520 1475 1520 $orange 6
DrawArrow 1815 1520 1860 1520 $green 7

# Business Data Cloud, downstream consumers and control boundary
DrawRoundedBox 70 1630 800 90 '#eaf8f7' '#65bfb8' 'SAP Business Data Cloud' 'Trusted data products; SAP Datasphere; SAP Analytics Cloud' $navy $ink 27 16 18 3
DrawRoundedBox 905 1630 520 90 '#f1efff' '#a79aef' 'SAP Knowledge Graph' 'Semantic business-object and process context' $navy $ink 27 20 18 3
DrawRoundedBox 1460 1630 600 90 '#eef8ff' '#7aaee6' 'DOWNSTREAM CONSUMERS' 'R2R; Project Financial Control|S2P; O2C / Project-to-Cash|SAC; Finance Data; QDP definition required' $navy $ink 23 13 16 3
DrawRoundedBox 2080 1630 650 90 '#fff0f0' $red 'HARD CONTROL BOUNDARY' 'Only the approved workflow uses released S/4 APIs; no direct LLM or agent write.' $red $ink 24 15 18 4

# Approved operational outputs to downstream process consumers
DrawLine 2290 1330 2335 1330 $green 5
DrawLine 2290 1520 2335 1520 $green 5
DrawLine 2335 1330 2335 1590 $green 5
DrawLine 2335 1590 1760 1590 $green 5
DrawArrow 1760 1590 1760 1630 $green 5

# Asynchronous S/4 data products into BDC; never the transaction write path
DrawLine 2290 1360 2365 1360 $teal 4 $true
DrawLine 2290 1550 2365 1550 $teal 4 $true
DrawLine 2365 1360 2365 1605 $teal 4 $true
DrawLine 2365 1605 470 1605 $teal 4 $true
DrawArrow 470 1605 470 1630 $teal 4 $true
DrawLabel 1790 1578 520 25 'asynchronous governed data products' 15 '#257d78' ([System.Drawing.FontStyle]::Italic)

# BDC semantic context through Knowledge Graph to the optional Joule path
DrawArrow 870 1675 905 1675 $lavender 4 $true
DrawLine 1165 1630 1165 1595 $lavender 4 $true
DrawLine 1165 1595 2425 1595 $lavender 4 $true
DrawLine 2425 1595 2425 500 $lavender 4 $true
DrawLine 2425 500 1520 500 $lavender 4 $true
DrawArrow 1520 500 1520 525 $lavender 4 $true

# Small explanatory labels
DrawLabel 1950 400 450 45 'ticket event / API payload' 20 '#29415f' ([System.Drawing.FontStyle]::Italic)
DrawLabel 1970 760 430 40 'governed model and agent support' 19 '#544a88' ([System.Drawing.FontStyle]::Italic)

$directory = Split-Path -Parent $OutputPath
if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
}
$bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$bitmap.Dispose()

Write-Output $OutputPath
