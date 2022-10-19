import { useEffect, useState } from 'react'
import { collection, getDocs, setDoc, doc, addDoc, deleteDoc } from 'firebase/firestore/lite';
// import db from 'components/firebase'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MainHead from 'components/mainhead'
import DeleteModal from 'pages/modal/delete_modal'

import styles from 'styles/car_list.module.scss'

// const database = db()
// console.log(db);
import { db } from 'components/firebase'

export default function CarList() {
	const [carList, setCarList] = useState([{}])
	const [classList, setClassList] = useState([])
	const [selectClass, setSelectClass] = useState("")
	const [selectId, setSelectId] = useState()
	const [selectName, setSelectName] = useState()
	const [open,setOpen] = useState(false)
	const [carId, setCarId] = useState([])
	const [edit, setEdit] = useState(false)
	const [editName, setEditName] = useState()
	const [editNumber, setEditNumber] = useState()
	const [editClass, setEditClass] = useState()

	// 読み込み ----------------------
	async function fetchCar() {
		const collect = await collection(db, 'carlist')
		const docSet = await getDocs(collect)
		let posts = []
		const docList = docSet.docs.map(doc => doc.data())
		setCarList(docList)
		docSet.docs.forEach(doc => {
			posts.push(
				doc.id
			)
		})
		setCarId(posts)
	}
	async function fetchClass() {
		const collect = await collection(db, 'class')
		const docSet = await getDocs(collect)

		const docList = docSet.docs.map(doc => doc.data())
		setClassList(docList)
		setSelectClass(docList[0]?.name)
	}
	useEffect(() => {
		fetchCar()
		fetchClass()
	}, [])

	// 追加 ----------------------
	const handleSubmit = async (event) => {
		event.preventDefault();
		let data = new FormData(event.currentTarget);
		let name = data.get('nameInput')
		let number = data.get('numberInput')
		let cl = data.get('classInput')

		await addDoc(collection(db, "carlist"), {
			name: name,
			number: number,
			class:cl
		}).then(ref => {
			fetchCar()
		})
	}
	// 編集 ----------------------
	async function handleEdit(id) {
		await setDoc(doc(db, "carlist", id), {
				name: editName,
				number: editNumber,
				class: editClass
			})
			.then((res) => {
				setSelectId("")
				setEdit(false)
				fetchCar()
			}
			);
	}
	// 削除 ----------------------
  async function handleDelete() {
		await deleteDoc(doc(db, "carlist", selectId ))
			.then((res) => {
				setOpen(false);
				setSelectId("")
				setSelectName("")
				fetchCar()
			});
	}
	const handleNameChange = (event) => {
		setEditName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setEditNumber(event.target.value)
	}
	const handleClassChange = (event) => {
		setEditClass(event.target.value)
	}

	const handleChange = (event) => {
		setSelectClass(event.target.value)
	}
	return (
		<>
			<MainHead title="車両リスト"/>
			<div className={styles.table} >
				<div className={styles.thead}>
					<div className={styles.tr}>
						<div className={styles.th}>
							クラス
						</div>
						<div className={styles.th}>
							車種
						</div>
						<div className={styles.th}>
							ナンバー
						</div>
						<div className={styles.th}>
							編集
						</div>
						<div className={styles.th}>
							削除
						</div>
					</div>
				</div>
				<div className={styles.tbody}>
					{carList.map((item, index) => {
						return (
							<div key={index} className={styles.tr}>
								{edit === index ? (
									<>
										<FormControl className={styles.td}>
											<InputLabel id="demo-multiple-name-label">クラス</InputLabel>
											<Select
												id=""
												value={editClass}
												label="クラス"
												onChange={handleClassChange}
												name='classInput'
												defaultValue={item.class }
											>
												{classList.map((name, index) => (
													<MenuItem
														key={index}
														value={name.name}
													>
														{name.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
										<TextField
											required
											name="nameInput"
											label="名称"
											type="text"
											id=""
											defaultValue={item.name}
											value={editName}
											onChange={handleNameChange}
											className={styles.td}
										/>
										<TextField
											required
											name="numberInput"
											label="ナンバー"
											type="text"
											id=""
											defaultValue={item.number}
											onChange={handleNumberChange}
											className={styles.td}
											value={editNumber}
										/>
									</>
								): (
									<>
										<div className={styles.td}>
											{item.class}
										</div>
										<div className={styles.td}>
											{item.name}
										</div>
										<div className={styles.td}>
											{item.number}
										</div>
									</>
								)}
							<div className={styles.td}>
								<Button
									variant="outlined"
									className={styles.btn}
									onClick={() => {
										edit === index ? (
											<>
												{setEdit(false)}
												{setEditName(item.name)}
												{setEditNumber(item.number)}
												{setEditClass(item.class)}
											</>
										) : (
												<>
													{setSelectClass(item.class) }
													{setEdit(index)}
													{setSelectId(carId[index])}
													{setEditName(item.name)}
													{setEditNumber(item.number)}
													{setEditClass(item.class)}
												</>
										)
									}}
								>
										{edit === index ? "取消" : "編集"}
								</Button>
							</div>
							<div className={styles.td}>
									<Button
										variant="contained"
										className={styles.btn}
										onClick={() => {
											edit === index ? (
												handleEdit(carId[index])
											): (
												<>
													{ setSelectId(carId[index]) }
													{ setSelectName(item.name) }
													{ setOpen(true) }
												</>
											)
										}}
									>
										{edit === index ? "登録" : "削除"  }
								</Button>
							</div>
						</div>
						)
					})}
				</div>
			</div>
			<Box className={styles.inputbox} component="form" noValidate onSubmit={handleSubmit} >
				<FormControl className={styles.classinput}>
					<InputLabel id="demo-multiple-name-label">クラス</InputLabel>
					<Select
						id=""
						value={selectClass}
						label="クラス"
						onChange={handleChange}
						name='classInput'
					>
						{classList.map((name, index) => (
							<MenuItem
								key={index}
								value={name.name}
							>
								{name.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					required
					name="nameInput"
					label="名称"
					type="text"
					id=""
					className={styles.nameinput}
				/>

				<TextField
					required
					name="numberInput"
					label="ナンバー"
					type="text"
					id=""
					className={styles.numberinput}
				/>
				<Button
					type="submit"
					variant="contained"
					sx={{ mb: 2 }}
				>登録</Button>
			</Box>
			<DeleteModal submit={handleDelete} name={selectName } id={selectId} open={open} setOpen={setOpen}/>
		</>
	)
}
