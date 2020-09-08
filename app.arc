@app
begin-app

@static
fingerprint true

@http
post /upload

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
