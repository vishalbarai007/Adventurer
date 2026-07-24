import * as admin from 'firebase-admin';
import * as path from 'path';

import * as fs from 'fs';

let serviceAccount: any;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (e) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:", e);
  }
} else {
  // On Local Machine (Development): Read from local json file
  serviceAccount = require(path.resolve(__dirname, '../../firebase_key.json'));
}

if (!serviceAccount) {
  const keyPath = path.resolve(__dirname, '../../firebase_key.json');
  if (fs.existsSync(keyPath)) {
    serviceAccount = require(keyPath);
  } else {
    console.warn("WARNING: firebase_key.json not found and FIREBASE_SERVICE_ACCOUNT environment variable is not defined.");
  }
}

if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

export { admin, db };
