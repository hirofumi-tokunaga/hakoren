import {useEffect} from 'react'
import {initializeApp} from 'firebase/app'
import { getFirestore, collection, getDocs ,setDoc,doc,addDoc} from 'firebase/firestore/lite';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const firebaseConfig = {
	apiKey: "AIzaSyB9HqsJZVXqE3-JygdZ1wlHOgG_zVTbB5E",
	authDomain: "hakoren-system.firebaseapp.com",
	projectId: "hakoren-system",
	storageBucket: "hakoren-system.appspot.com",
	messagingSenderId: "278234650408",
	appId: "1:278234650408:web:14a875c87c58f67876221d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default function Home() {
	// async function getCities(db) {
	// 	const citiesCol = collection(db, 'mydata');
	// 	const citySnapshot = await getDocs(citiesCol);
	// 	const cityList = citySnapshot.docs.map(doc => doc.data());
	// 	return cityList;
	// }

	useEffect (async () => {
		const citiesCol = collection(db, 'mydata');
		const citySnapshot = await getDocs(citiesCol);
		const cityList = citySnapshot.docs.map(doc => doc.data());
		console.log(cityList)
		// citySnapshot.docs.map(doc => doc.data())
	},[])
	const handleSubmit = async (event) => {
		event.preventDefault();
		let data = new FormData(event.currentTarget);
		let name2 = data.get('nameInput')
		let number2 = data.get('numberInput')
		const ref = await addDoc(collection(db, "mydata"), {
			name:name2,
			number:number2
		})
		console.log(ref);
	}
	return (
		<div>
			<Box component="form" noValidate onSubmit={handleSubmit} >
					<TextField
						required
						name="numberInput"
						label="ナンバー"
						type="text"
						id=""
					/>
					<TextField
						required
						name="nameInput"
						label="名称"
						type="text"
						id=""
					/>
					<Button
					type="submit"
					variant="contained"
					sx={{ mb: 2 }}
				>登録</Button>
			</Box>
		</div>
	)
}
