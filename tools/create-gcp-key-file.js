const fs = require('fs');
const base64GCPKey = process.env.GCP_JSON_FILE_BASE_64;

const decodedKey = Buffer.from(base64GCPKey, 'base64').toString('utf8');

if (!fs.existsSync('/etc/secrets')) {
  fs.mkdirSync('/etc/secrets', { recursive: true });
}

fs.writeFileSync('/etc/secrets/gcp-key.json', decodedKey);
