function kvAccess(r) {
    var log = `${r.variables.time_iso8601} client=${r.remoteAddress} method=${r.method} uri=${r.uri} status=${r.status}`;
    // r.rawHeadersOut.forEach(h => log += ` out.${h[0]}=${h[1]}`);
    r.rawHeadersIn.forEach(function(h) {
        log += ` in.${h[0]}=${h[1]}`;
        if(h[0] == "Authorization")
        {
            // Decode JWT. No signature verification as that will be done in the backend. Only claims extraction here
            let jwt = h[1].split(" ")[1].split(".")[1]; // Extracting the claims part from the JWT
            let jwtJson = Buffer.from(jwt, 'base64').toString();
            let jwtClaims = JSON.parse(jwtJson);
            log += " in:Name=" + jwtClaims.name;
        }
    });

    if(false == log.includes("in.Authorization"))
    {
        log += " in.Authorization=No Authorization header passed";
    }

    return log;
}

export default { kvAccess }