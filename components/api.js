import { collection, getDocs, setDoc, doc, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore/lite';

export async function getDb(collectionName) {
	const collect = await collection(db, collectionName)
	const docSet = await getDocs(collect)
	const docList = docSet.docs.map(doc => doc.data())
	return docList
}
export async function getId(collectionName) {
	const collect = await collection(db, collectionName)
	const docSet = await getDocs(collect)
	let ids = []
	docSet.docs.forEach(doc => {
		ids.push(
			doc.id
		)
	})
	return ids
}
