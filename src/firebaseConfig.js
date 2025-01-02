import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase (ambil dari Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDTNZkWUma6EqqKWvVudMqyJ63IZgZilGw",
  authDomain: "infra-planning.firebaseapp.com",
  projectId: "infra-planning",
  storageBucket: "infra-planning.firebasestorage.app",
  messagingSenderId: "800500909549",
  appId: "1:800500909549:web:afa7084b78dff3be2113e4"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;
