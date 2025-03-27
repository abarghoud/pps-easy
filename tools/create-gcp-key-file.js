const execSync = require('child_process').execSync;

const base64GCPKey = process.env.GCP_JSON_FILE_BASE_64;

execSync(`mkdir -p /etc/secrets && echo "${base64GCPKey}" | base64 -d > /etc/secrets/gcp-key.json`)
