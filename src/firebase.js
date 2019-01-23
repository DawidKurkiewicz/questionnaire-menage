import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD-fpu8IAnU-Jcu4eAF9ZH6hoV3SqUt5LA",
    authDomain: "recrutation-task.firebaseapp.com",
    databaseURL: "https://recrutation-task.firebaseio.com",
    projectId: "recrutation-task",
    storageBucket: "recrutation-task.appspot.com",
    messagingSenderId: "651247308876"
}
firebase.initializeApp(config)

export const database = firebase.database()