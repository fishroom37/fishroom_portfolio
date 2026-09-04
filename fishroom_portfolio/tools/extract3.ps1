# PDF 텍스트 추출 v3: 글꼴별 CMap 적용 + 좌표 기반 재구성
$ErrorActionPreference = 'Stop'
$pdf = 'C:\Users\user\Desktop\소프트웨어기술자 경력관리시스템.pdf'
$latin = [System.Text.Encoding]::GetEncoding('ISO-8859-1')
$bytes = [System.IO.File]::ReadAllBytes($pdf)
$txt = $latin.GetString($bytes)

# --- 객체번호 매핑 (N 0 obj) ---
$objMatches = [regex]::Matches($txt, '(\d+)\s+0\s+obj\b')

# --- 스트림 수집 (객체번호 + 데이터) ---
$streamRe = [regex]'(?s)stream\r?\n'
$endRe = [regex]'(?s)\r?\nendstream'
$streams = New-Object System.Collections.Generic.List[object]
$pos = 0
while ($true) {
    $m = $streamRe.Match($txt, $pos)
    if (-not $m.Success) { break }
    $ss = $m.Index + $m.Length
    $e = $endRe.Match($txt, $ss)
    if (-not $e.Success) { break }
    $len = $e.Index - $ss
    # 가장 가까운 앞쪽 obj 번호 찾기
    $objNo = 0
    foreach ($om in $objMatches) {
        if ($om.Index -lt $m.Index) { $objNo = [int]$om.Groups[1].Value } else { break }
    }
    $streams.Add([pscustomobject]@{ Obj = $objNo; Data = [byte[]]($bytes[$ss..($ss + $len - 1)]) })
    $pos = $e.Index + $e.Length
}

function Decompress-Flate([byte[]]$data) {
    $ms = New-Object System.IO.MemoryStream(,$data)
    $out = New-Object System.IO.MemoryStream
    try {
        $z = New-Object System.IO.Compression.ZLibStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
        $z.CopyTo($out); $z.Dispose()
        return $out.ToArray()
    } catch { return $null }
}

$decoded = @{}
foreach ($s in $streams) {
    $d = Decompress-Flate $s.Data
    if ($d -ne $null) { $decoded[$s.Obj] = $latin.GetString($d) }
}

# --- ToUnicode CMap 파싱 ---
function Read-CMap([string]$content) {
    $map = @{}
    foreach ($mm in [regex]::Matches($content, '<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>')) {
        $src = [Convert]::ToInt32($mm.Groups[1].Value, 16)
        $dstHex = $mm.Groups[2].Value
        $nb = $dstHex.Length / 2
        $dstBytes = New-Object byte[] $nb
        for ($i = 0; $i -lt $dstHex.Length; $i += 2) { $dstBytes[$i/2] = [Convert]::ToByte($dstHex.Substring($i, 2), 16) }
        $map[$src] = [System.Text.Encoding]::BigEndianUnicode.GetString($dstBytes)
    }
    foreach ($mm in [regex]::Matches($content, '<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>')) {
        $lo = [Convert]::ToInt32($mm.Groups[1].Value, 16)
        $hi = [Convert]::ToInt32($mm.Groups[2].Value, 16)
        $dst0 = [Convert]::ToInt32($mm.Groups[3].Value, 16)
        for ($cid = $lo; $cid -le $hi; $cid++) { $map[$cid] = [char]($dst0 + ($cid - $lo)) }
    }
    return $map
}

$cmapByObj = @{}
foreach ($kv in $decoded.GetEnumerator()) {
    if ($kv.Value -match 'beginbf(char|range)') {
        $cmapByObj[$kv.Key] = Read-CMap $kv.Value
    }
}
Write-Output "CMAPS_PARSED: $($cmapByObj.Count)"

# --- 페이지 리소스: F번호 -> 폰트객체, 폰트객체 -> ToUnicode ---
$pageFontMap = @{}
$pageRe = [regex]'(?s)/Type\s*/Page.*?/Font\s*<<(.*?)>>'
foreach ($pm in $pageRe.Matches($txt)) {
    foreach ($fm in [regex]::Matches($pm.Groups[1].Value, '/F(\d+)\s+(\d+)\s+0\s+R')) {
        $pageFontMap[('F' + $fm.Groups[1].Value)] = [int]$fm.Groups[2].Value
    }
}
$fontObjToUnicode = @{}
$foRe = [regex]'(?s)(\d+)\s+\d+\s+obj\s*<<.*?/Type\s*/Font.*?/ToUnicode\s+(\d+)\s+0\s+R'
foreach ($fm in $foRe.Matches($txt)) {
    $fontObjToUnicode[[int]$fm.Groups[1].Value] = [int]$fm.Groups[2].Value
}
Write-Output "FONT_OBJ_TO_UNICODE: $($fontObjToUnicode.Count)"
foreach ($k in $pageFontMap.GetEnumerator()) {
    $tucObj = $null
    if ($fontObjToUnicode.ContainsKey($k.Value)) { $tucObj = $fontObjToUnicode[$k.Value] }
    $cmapLoaded = ($tucObj -ne $null -and $cmapByObj.ContainsKey($tucObj))
    Write-Output ("  F{0} -> fontobj {1} -> ToUnicode obj {2} (cmap loaded={3})" -f $k.Key, $k.Value, $tucObj, $cmapLoaded)
}

# --- CID <-> 문자열 디코드 ---
function Decode-CIDHex([string]$hexStr, $map) {
    $sb = New-Object System.Text.StringBuilder
    $i = 0
    while ($i + 2 -le $hexStr.Length) {
        $cid = [Convert]::ToInt32($hexStr.Substring($i, 2), 16)
        if ($map -ne $null -and $map.ContainsKey($cid)) { [void]$sb.Append($map[$cid]) }
        else { [void]$sb.Append('?') }
        $i += 2
    }
    return $sb.ToString()
}
# --- 컨텐츠 스트림 파싱 (페이지별) ---
$contentPages = @(21, 24, 29)
$textRuns = @()
$pageIdx = 0
foreach ($cp in $contentPages) {
    if (-not $decoded.ContainsKey($cp)) { continue }
    $pageIdx++
    $content = $decoded[$cp]

    $opRe = [regex]'(?s)(?:/F(\d+)\s+[\d.]+\s+Tf)|(?:([-+]?[\d.]+)\s+([-+]?[\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([-+]?[\d.]+)\s+([-+]?[\d.]+)\s+Tm)|(?:([-+]?[\d.]+)\s+([-+]?[\d.]+)\s+Td)|(?:<([0-9A-Fa-f]+)>\s*Tj)|(?:\[([^\]]*)\]\s*TJ)'

    $blocks = [regex]::Matches($content, '(?s)BT(.*?)ET')
    $bi = 0
    foreach ($bm in $blocks) {
        $bi++
        $body = $bm.Groups[1].Value
        $curFontNum = 0
        $tx = $null; $ty = $null
        $runText = ''; $runX = $null; $runY = $null; $runFont = ''
        foreach ($op in $opRe.Matches($body)) {
            if ($op.Groups[1].Success) { $curFontNum = [int]$op.Groups[1].Value }
            elseif ($op.Groups[2].Success) { $tx = [double]$op.Groups[6].Value; $ty = [double]$op.Groups[7].Value }
            elseif ($op.Groups[8].Success) {
                if ($tx -ne $null) { $tx += [double]$op.Groups[8].Value }
                if ($ty -ne $null) { $ty += [double]$op.Groups[9].Value }
            }
            elseif ($op.Groups[10].Success) {
                $fontKey = 'F' + $curFontNum
                $fontObj = $pageFontMap[$fontKey]
                $map = $null
                if ($fontObjToUnicode.ContainsKey($fontObj)) { $map = $cmapByObj[$fontObjToUnicode[$fontObj]] }
                $t = Decode-CIDHex $op.Groups[10].Value $map
                if ($runX -eq $null) { $runX = $tx; $runY = $ty; $runFont = $fontKey }
                $runText += $t
            }
            elseif ($op.Groups[11].Success) {
                # TJ 배열 처리
                $fontKey = 'F' + $curFontNum
                $fontObj = $pageFontMap[$fontKey]
                $map = $null
                if ($fontObjToUnicode.ContainsKey($fontObj)) { $map = $cmapByObj[$fontObjToUnicode[$fontObj]] }
                foreach ($hm in [regex]::Matches($op.Groups[11].Value, '<([0-9A-Fa-f]+)>')) {
                    $t = Decode-CIDHex $hm.Groups[1].Value $map
                    if ($runX -eq $null) { $runX = $tx; $runY = $ty; $runFont = $fontKey }
                    $runText += $t
                }
            }
        }
        if ($runText -ne '') {
            $textRuns += [pscustomobject]@{ Page = $pageIdx; Block = $bi; Font = $runFont; X = $runX; Y = $runY; Text = $runText }
        }
    }

    Write-Output "===== PAGE $pageIdx (obj $cp) blocks=$($blocks.Count) ====="
}

# --- 행 재구성: Y 클러스터링 (컬럼별) ---
# 1차: 동일 열(x)에서 y gap이 큰 지점 = 새 줄
# 행 그룹: 각 run을 y로 정렬 후 gap > 40이면 새 행
$pageCount = 3
for ($p = 1; $p -le $pageCount; $p++) {
    $runs = @($textRuns | Where-Object { $_.Page -eq $p } | Sort-Object { [double]$_.Y } -Descending)
    if ($runs.Count -eq 0) { continue }
    $rows = New-Object System.Collections.Generic.List[object]
    $curRow = $null
    $lastY = $null
    foreach ($r in $runs) {
        if ($null -eq $lastY -or ([double]$lastY - [double]$r.Y) -gt 40) {
            $curRow = New-Object System.Collections.Generic.List[object]
            $rows.Add($curRow)
        }
        $curRow.Add($r)
        $lastY = [double]$r.Y
    }
    Write-Output "----- PAGE $p : rows=$($rows.Count) -----"
    $ri = 0
    foreach ($row in $rows) {
        $ri++
        # x순 정렬
        $sorted = @($row | Sort-Object { [double]$_.X })
        $lineParts = @()
        foreach ($s in $sorted) {
            $lineParts += ("[{0} x={1} y={2}] {3}" -f $s.Font, $s.X, $s.Y, $s.Text)
        }
        Write-Output ("R{0}: " + ($lineParts -join ' | ')) -f $ri
    }
}

$outPath = 'C:\Users\user\Desktop\fishroom_portfolio\career_runs.txt'
$sb = New-Object System.Text.StringBuilder
foreach ($r in $textRuns) {
    [void]$sb.AppendLine("P$($r.Page) B$($r.Block) $($r.Font) x=$($r.X) y=$($r.Y) | $($r.Text)")
}
[System.IO.File]::WriteAllText($outPath, $sb.ToString(), (New-Object System.Text.UTF8Encoding($true)))
Write-Output "WROTE: $outPath (runs=$($textRuns.Count))"