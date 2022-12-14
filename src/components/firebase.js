import { initializeApp } from 'firebase/app'
import { getFirestore} from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyB9HqsJZVXqE3-JygdZ1wlHOgG_zVTbB5E",
	authDomain: "hakoren-system.firebaseapp.com",
	projectId: "hakoren-system",
	storageBucket: "hakoren-system.appspot.com",
	messagingSenderId: "278234650408",
	appId: "1:278234650408:web:14a875c87c58f67876221d"
};
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const fireauth = getAuth()
export const storage = getStorage(app)
