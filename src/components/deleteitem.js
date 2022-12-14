import { collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';
import { db } from 'src/components/firebase'
import { useEffect } from 'react';

export default function Delete({ collectionName, id }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		db.collection(collectionName).doc(id).get().then(ob => {setData(ob.data()) })

	}, [message])
	return (
		<>
			Name: {data != null ? data.name : '...'}
		</>
	)
}
