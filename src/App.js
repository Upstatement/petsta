import './App.css';

import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from 'react';
import Posts from './Posts';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0CBil3DzvluMaIbv6DCcBkpQDfDENyME",
  authDomain: "petsta-36d51.firebaseapp.com",
  projectId: "petsta-36d51",
  storageBucket: "petsta-36d51.appspot.com",
  messagingSenderId: "630175032333",
  appId: "1:630175032333:web:d876d40760d23a5bc4e144",
  measurementId: "G-DD7N41GBDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

function App() {
  const [user, setUser] = useState(null);

  function signIn(){
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        signIn()
      }
    }); 
  },[])

  if (!user) {
    return (<div><h1>Nobody is logged in</h1></div>)
  }

  return (
    <div className="App">
      <h1>{user?.displayName} is Great!</h1>
      <Posts />
    </div>
  );
}

export default App;
