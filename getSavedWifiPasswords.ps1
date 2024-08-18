foreach ($l in (netsh wlan show profiles)) {
    if ($l.contains(":")) {
        $n = $l.split(":")[1].trim()
        if ($n.length -gt 0) {
            $p = (netsh wlan show profile name="$n" key=clear)[32].split(":")[1].trim()

            write-host "$n : $p"
        }
    }
}
