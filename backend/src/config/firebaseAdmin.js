const admin = require("firebase-admin");
const path = require("path");

// ✅ Load service account key
const serviceAccount = require(path.join(__dirname, "../../serviceAccountKey.json"));

// ✅ Initialize only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
