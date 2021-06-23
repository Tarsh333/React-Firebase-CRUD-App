// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseApp=firebase.initializeApp(
    {
        apiKey: "AIzaSyCJmYnVt_NtVigDtgslrGPrbb3IM3c080k",
        authDomain: "todo-app-react-5db55.firebaseapp.com",
        projectId: "todo-app-react-5db55",
        storageBucket: "todo-app-react-5db55.appspot.com",
        messagingSenderId: "223224163275",
        appId: "1:223224163275:web:2872e5f76e1484983a244e",
        measurementId: "G-R5RML1FR06"
      }
)
  const db=firebaseApp.firestore()
  export default db