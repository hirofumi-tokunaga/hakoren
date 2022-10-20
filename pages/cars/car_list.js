import { useEffect, useState } from 'react'
import { getDb, getId, deleteData, setData, addData, getSortData } from 'components/api'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import MainHead from 'components/mainhead'
import DeleteModal from 'pages/modal/delete_modal'
import Loading from 'components/loading'

import styles from 'styles/car_list.module.scss'

export default function CarList() {
	const [carList, setCarList] = useState([{}])
	const [classList, setClassList] = useState([])
	const [selectClass, setSelectClass] = useState("")
	const [selectId, setSelectId] = useState()
	const [selectName, setSelectName] = useState()
	const [open, setOpen] = useState(false)
	const [carId, setCarId] = useState([])
	const [edit, setEdit] = useState(false)
	const [editName, setEditName] = useState()
	const [editNumber, setEditNumber] = useState()
	const [editClass, setEditClass] = useState()
	const [sortSw, setSortSw] = useState([false, false, false, false, false])
	const [newPost,setNewPost] = useState(false)
	const [order, setOrder] = useState("")
	const [switchId, setSwitchId] = useState()
	const [loading, setLoading] = useState(false)

	// 読み込み ----------------------
	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist'))
			setCarId(await getId('carlist'))
			setClassList(await getDb('class'))
			setSelectClass(classList[0]?.name)
		}
		init();
	}, [])

	// 追加 ----------------------
	const handleSubmit = async (event) => {
		event.preventDefault();
		let data = new FormData(event.currentTarget);
		let name = data.get('nameInput')
		let number = data.get('numberInput')
		let cl = data.get('classInput')
		let object = {
			name: name,
			number: number,
			class: cl
		}
		setLoading(true)
		await addData('carlist',object)
		setNewPost(false)
		setCarList(await getDb('carlist'))
		setCarId(await getId('carlist'))
		sort()
		setLoading(false)
	}
	const handleChange = (event) => {
		setSelectClass(event.target.value)
	}
	// 編集 ----------------------
	async function handleSet(id) {
		let object = {
			name: editName,
			number: editNumber,
			class: editClass
		}
		await setData("carlist", object, id)
		setSelectId("")
		setEdit(false)
		setCarList(await getDb('carlist'))
		setCarId(await getId('carlist'))
		sort()
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
	// 削除 ----------------------
	async function handleDelete() {
		setLoading(true)
		await deleteData("carlist", selectId)
		setOpen(false);
		setSelectId("")
		setSelectName("")
		setCarList(await getDb('carlist'))
		setCarId(await getId('carlist'))
		sort()
		setLoading(false)
	}
	// ソート ----------------------
	async function sort() {
		if (order) {
			setCarList(await getSortData('carlist',order,sortSw[switchId]))
		}
	}
	useEffect(() => {
		sort()
	}, [switchId,sortSw,order])
	return (
		<>
			<Loading loading={loading} />
				<MainHead title="車両リスト"/>
				<div className={styles.table} >
					<div className={styles.thead}>
						<div className={styles.tr}>
							<div className={styles.th}>
								クラス<Button className={styles.btn} onClick={() => {
									setOrder("class")
									setSortSw((prevState) =>
										prevState.map((value, index) => (index === 0 ? !value : value))
									)
									setSwitchId(0)
								}}>ソート</Button>
							</div>
							<div className={styles.th}>
								車種<Button className={styles.btn} onClick={() => {
									setOrder("name")
									setSortSw((prevState) =>
										prevState.map((value, index) => (index === 1 ? !value : value))
									)
									setSwitchId(1)
								}}>ソート</Button>
							</div>
							<div className={styles.th}>
								ナンバー<Button className={styles.btn} onClick={() => {
									setOrder("number")
									setSortSw((prevState) =>
										prevState.map((value, index) => (index === 2 ? !value : value))
									)
									setSwitchId(2)
								}}>ソート</Button>
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
						{carList && (carList.map((item, index) => {
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
													handleSet(carId[index])
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
						}))}
					</div>
					<div className={styles.tfoot}>
						<Box className={styles.tr} component="form" noValidate onSubmit={handleSubmit} >
							<div className={styles.td}>
								{newPost && (
									<FormControl className={styles.classinput}>
										<InputLabel id="demo-multiple-name-label">クラス</InputLabel>
										<Select
											id=""
											value={selectClass}
											label="クラス"
											onChange={handleChange}
											name='classInput'
											style={{ height: "53px" }}
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
								)}
							</div>
							<div className={styles.td}>
								{newPost && (
									<TextField
										required
										name="nameInput"
										label="名称"
										type="text"
										id=""
										className={styles.text}
									/>
								)}
							</div>
							<div className={styles.td}>
								{newPost && (
									<TextField
										required
										name="numberInput"
										label="ナンバー"
										type="text"
										id=""
										className={styles.text}
									/>
									)}
							</div>

							<div className={styles.td}>
								<Button
									variant="outlined"
									className={styles.btn}
									onClick={() => {
										newPost ? (
											<>
												{setNewPost(false)}
											</>
										) : (
											<>
												{setNewPost(true)}

											</>
										)
									}}
								>
									{newPost ? "キャンセル" : "新規登録"}
								</Button>
							</div>
							<div className={styles.td}>
								{newPost && (
									<Button
										className={styles.btn}
										type="submit"
										variant="contained"
										sx={{ mb: 2 }}
									>登録</Button>
								)}
							</div>
						</Box>
					</div>
				</div>

				<DeleteModal submit={handleDelete} name={selectName } id={selectId} open={open} setOpen={setOpen}/>
		</>
	)
}
