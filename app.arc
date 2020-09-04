@app
begin-app

@static
fingerprint true

@http
get /
post /upload

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
