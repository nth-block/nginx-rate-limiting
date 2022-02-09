function kvAccess(r) {
    var log = `${r.variables.time_iso8601} client=${r.remoteAddress} method=${r.method} uri=${r.uri} status=${r.status}`;
    // r.rawHeadersOut.forEach(h => log += ` out.${h[0]}=${h[1]}`);
    r.rawHeadersIn.forEach(function(h) {
        if(h[0] == "Authorization") // Not logging the authorization header as that will be a security risk
        {
            // Decode JWT. No signature verification as that will be done in the backend. Only claims extraction here
            let jwt = h[1].split(" ")[1].split(".")[1]; // Extracting the claims part from the JWT
            let jwtJson = Buffer.from(jwt, 'base64').toString();
            let jwtClaims = JSON.parse(jwtJson);
            log += " in:Authorization.SubjectName=" + jwtClaims.name;
        }
        else {
            log += ` in.${h[0]}=${h[1]}`;
        }
    });

    return log;
}

export default { kvAccess }