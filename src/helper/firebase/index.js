import admin from 'firebase-admin';
import 'dotenv/config';

const firebaseConfig = {
  credential: admin.credential.cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
};

const firebaseApp = admin.initializeApp(firebaseConfig);

export default firebaseApp;
