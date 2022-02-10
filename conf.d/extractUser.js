function extractUser(r) {
    let userOid = '';
    r.rawHeadersIn.forEach(function(h) {
        if(h[0] == "Authorization") // Not logging the authorization header as that will be a security risk
        {
            // Decode JWT. No signature verification as that will be done in the backend. Only claims extraction here
            let jwt = h[1].split(" ")[1].split(".")[1]; // Extracting the claims part from the JWT
            let jwtJson = Buffer.from(jwt, 'base64').toString();
            let jwtClaims = JSON.parse(jwtJson);
            userOid = jwtClaims.oid;
        }
    });
    return userOid;
}

export default { extractUser }