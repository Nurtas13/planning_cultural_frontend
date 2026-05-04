import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDgIK0wgv8FLJTAjD5-e-ycQ9g3QFFosI",
  authDomain: "culturhub-2e4a6.firebaseapp.com",
  projectId: "culturhub-2e4a6",
  storageBucket: "culturhub-2e4a6.firebasestorage.app",
  messagingSenderId: "864072062217",
  appId: "1:864072062217:web:725adb1267c551f7f82fd8",
  measurementId: "G-VGQVM4342M"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();