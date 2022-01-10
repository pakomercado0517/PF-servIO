import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtqANFbcxpyGgSp9lZvzyiawdPt1NA8o4",
  authDomain: "servio-34472.firebaseapp.com",
  projectId: "servio-34472",
  storageBucket: "servio-34472.appspot.com",
  messagingSenderId: "944898012752",
  appId: "1:944898012752:web:d85d74ba39836909f30355",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
