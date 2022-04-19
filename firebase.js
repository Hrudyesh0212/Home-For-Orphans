import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBOjBB9ur-5ix4Y0YbS9_wAK-cdVdXhAcI",
    authDomain: "home-for-orphan.firebaseapp.com",
    databaseURL: "https://home-for-orphan-default-rtdb.firebaseio.com",
    projectId: "home-for-orphan",
    storageBucket: "home-for-orphan.appspot.com",
    messagingSenderId: "514736953469",
    appId: "1:514736953469:web:82615a6e39da3bf3caf914",
    measurementId: "G-XMXS0KFXDW"
}
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const rdb = firebase.database();
const storage = firebase.storage();
export {firebaseApp,db,rdb,storage};
export default firebaseApp;
