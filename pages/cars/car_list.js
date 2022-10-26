import { useEffect, useState } from 'react'
import { getDb, deleteData, setData, addData  } from 'components/api'
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
	const [edit, setEdit] = useState(false)
	const [editName, setEditName] = useState()
	const [editNumberA, setEditNumberA] = useState()
	const [editNumberB, setEditNumberB] = useState()
	const [editClass, setEditClass] = useState()
	const [sortSw, setSortSw] = useState([false, false, false, false, false])
	const [newPost,setNewPost] = useState(false)
	const [order, setOrder] = useState("")
	const [switchId, setSwitchId] = useState()
	const [loading, setLoading] = useState(false)

	// 読み込み ----------------------
	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist','number_b',true))
			setClassList(await getDb('class'))
			setSelectClass(await classList[0]?.name)
		}
		init();
	}, [])

	// 追加 ----------------------
	const handleSubmit = async (event) => {
		event.preventDefault();
		let data = new FormData(event.currentTarget);
		let name = data.get('nameInput')
		let numberA = data.get('numberInputA')
		let numberB = data.get('numberInputB')
		let cl = data.get('classInput')
		let object = {
			name: name,
			number_a: numberA,
			number_b: numberB,
			class: cl
		}
		setLoading(true)
		await addData('carlist',object)
		setNewPost(false)
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
			number_a: editNumberA,
			number_b: editNumberB,
			class: editClass
		}
		await setData("carlist", object, id)
		setSelectId("")
		setEdit(false)
		sort()
	}
	const handleNameChange = (event) => {
		setEditName(event.target.value)
	}
	const handleNumberChangeA = (event) => {
		setEditNumberA(event.target.value)
	}
	const handleNumberChangeB = (event) => {
		setEditNumberB(event.target.value)
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
		sort()
		setLoading(false)
	}
	// ソート ----------------------
	async function sort() {
		if (order) {
			setCarList(await getDb('carlist',order,sortSw[switchId]))
		} else {
			setCarList(await getDb('carlist', "number_b", true))
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

							ナンバー
							<Button className={styles.btn} onClick={() => {
								setOrder("number_a")
								setSortSw((prevState) =>
									prevState.map((value, index) => (index === 2 ? !value : value))
								)
								setSwitchId(2)
							}}>ソート</Button>
							<Button className={styles.btn} onClick={() => {
									setOrder("number_b")
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
											<div className={styles.td}>
												<FormControl>
													<InputLabel InputLabelProps={{ shrink: true }}>クラス</InputLabel>
													<Select
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
											</div>
											<div className={styles.td}>
												<TextField
													name="nameInput"
													label="名称"
													type="text"
													defaultValue={item.name}
													value={editName}
													onChange={handleNameChange}
													InputLabelProps={{ shrink: true }}
												/>
											</div>
											<div className={styles.td}>
												<TextField
													name="numberInputA"
													label="ナンバー"
													type="text"
													defaultValue={item.number_a}
													onChange={handleNumberChangeA}
													value={editNumberA}
													InputLabelProps={{ shrink: true }}
												/>
											</div>
											<div className={styles.td}>
												<TextField
													name="numberInputB"
													label="ナンバー（下４桁）"
													type="text"
													defaultValue={item.number_b}
													onChange={handleNumberChangeB}
													value={editNumberB}
													InputLabelProps={{ shrink: true }}
												/>
											</div>
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
												{item.number_a}
											</div>
											<div className={styles.td}>
												{item.number_b}
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
													{setEditNumberA(item.number_a)}
													{setEditNumberB(item.number_b)}
													{setEditClass(item.class)}
												</>
											) : (
													<>
														{setSelectClass(item.class) }
														{setEdit(index)}
														{setSelectId(carList[index].id)}
														{setEditName(item.name)}
														{setEditNumberA(item.number_a)}
														{setEditNumberB(item.number_b)}
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
													handleSet(carList[index].id)
												): (
													<>
														{ setSelectId(carList[index].id) }
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
									<InputLabel className="input-label" shrink={true} >クラス</InputLabel>
										<Select
											id=""
											value={selectClass}
											label="クラス"
											InputLabelProps={{ shrink: true }}
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
										name="nameInput"
										label="名称"
										type="text"
										className={styles.text}
										InputLabelProps={{ shrink: true }}
									/>
								)}
							</div>
							<div className={styles.td}>
								{newPost && (
									<TextField
										name="numberInputA"
										label="ナンバー"
										type="text"
										className={styles.text}
										InputLabelProps={{ shrink: true }}
									/>
									)}
							</div>
							<div className={styles.td}>
								{newPost && (
									<TextField
										name="numberInputB"
										label="ナンバー"
										type="text"
										className={styles.text}
										InputLabelProps={{ shrink: true }}
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
								{newPost ? "取消" : "新規登録"}
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
