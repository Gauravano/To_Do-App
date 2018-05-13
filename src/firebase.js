import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCFm0t3sP093a6aVwCl8jIgmKWODFVOTIg",
    authDomain: "goal-coach-cefa9.firebaseapp.com",
    databaseURL: "https://goal-coach-cefa9.firebaseio.com",
    projectId: "goal-coach-cefa9",
    storageBucket: "goal-coach-cefa9.appspot.com",
    messagingSenderId: "729567092791"
  };


export const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref('goals');
export const completeGoalRef = firebase.database().ref('completeGoals');
