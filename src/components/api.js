import { db, storage } from 'src/components/firebase'
import { collection, getDocs, setDoc, doc, addDoc, deleteDoc, query, orderBy, updateDoc } from 'firebase/firestore/lite';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function getDb(collectionName, order = null, desc = true) {
	try {
		const collect = await collection(db, collectionName)
		let docSet
		if (order) {
			docSet = await getDocs(query(collect, orderBy(order, desc ? "desc" : "")))
		} else {
			docSet = await getDocs(collect)
		}

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
export async function upDate(collectionName,id,field,val) {
	try {
		await updateDoc(doc(db, collectionName, id),{[field]:val})
	} catch (err) {
		console.log('~~ setUpDate ~~')
		console.log(err)
	}
}

export async function postImage(image = null) {
	let uploadResult = ''

	if (image.name) {
		const storageRef = ref(storage)
		const ext = image.name.split('.').pop()
		const hashName = Math.random().toString(36).slice(-8)
		const fullPath = '/images/' + hashName + '.' + ext
		const uploadRef = ref(storageRef, fullPath)

		// 'file' comes from the Blob or File API
		await uploadBytes(uploadRef, image).then(async function (result) {
			console.log(result)
			console.log('Uploaded a blob or file!')

			await getDownloadURL(uploadRef).then(function (url) {
				uploadResult = url
			});
		});
	}
	return uploadResult
}
