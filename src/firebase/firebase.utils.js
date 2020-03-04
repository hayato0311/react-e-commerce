import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCQX_IUVzXzlEr98LPWiXwsNN20VGPCmFU",
    authDomain: "react-764f8.firebaseapp.com",
    databaseURL: "https://react-764f8.firebaseio.com",
    projectId: "react-764f8",
    storageBucket: "react-764f8.appspot.com",
    messagingSenderId: "414238414062",
    appId: "1:414238414062:web:d68cea14eb140b9b3a4fff",
    measurementId: "G-HSQWD184YL"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;