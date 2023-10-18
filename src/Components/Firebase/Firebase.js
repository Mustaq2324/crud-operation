// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAIXu5j594FeAoG88WunzCNFds7_LgGGU",
  authDomain: "tabledata-49efd.firebaseapp.com",
  projectId: "tabledata-49efd",
  storageBucket: "tabledata-49efd.appspot.com",
  messagingSenderId: "759019762563",
  appId: "1:759019762563:web:c6e7f63e6145ce1fdbfcb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore()
export{db}
export default app