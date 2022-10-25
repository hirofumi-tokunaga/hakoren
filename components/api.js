import { db } from 'components/firebase'
import { collection, getDocs, setDoc, doc, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore/lite';

export async function getDb(collectionName) {
	try {
		const collect = await collection(db, collectionName)
		const docSet = await getDocs(collect)
		const docList = docSet.docs.map(doc => doc.data())
		let ids = []
		docSet.docs.forEach(doc => {
			ids.push(
				doc.id
			)
		})
		docList.forEach((item,index) => {
			item.id = ids[index]
		})
		console.log("docList",docList)
		return docList
	} catch (err){
		console.log('~~ getDb ~~')
		console.log(err)
	}
}
export async function addData(collectionName,object){
	try{
		const val = await addDoc(collection(db,collectionName), object)
		return val
	} catch (err){
		console.log('~~ addData ~~')
		console.log(err)
	}
}
export async function deleteData(collectionName,id){
	try{
		await deleteDoc(doc(db, collectionName, id))
	} catch (err){
		console.log('~~ deleteData ~~')
		console.log(err)
	}
}
export async function setData(collectionName, object, id){
	try{
		await setDoc(doc(db, collectionName, id),object)
	} catch (err){
		console.log('~~ setData ~~')
		console.log(err)
	}
}
export async function getSortData(collectionName, order, desc){
	try{
		const collect = await collection(db, collectionName)
		const val = await getDocs(query(collect, orderBy(order, desc ? "desc" : "")))
		const docList = val.docs.map(doc => doc.data())
		return docList
	} catch (err){
		console.log('~~ getSortData ~~')
		console.log(err)
	}
}
