// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKI67kS3Q2J4nwZ21Ix7c6Nc0qwcrfhHY",
  authDomain: "audio-recorder-9f89a.firebaseapp.com",
  projectId: "audio-recorder-9f89a",
  storageBucket: "audio-recorder-9f89a.appspot.com",
  messagingSenderId: "112381190674",
  appId: "1:112381190674:web:4e3fb26871398ab27ceecb",
  measurementId: "G-B42NLNJS5T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
