import { useEffect, useState } from 'react'
import { getDb, deleteData, setData, addData } from 'components/api'

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

import styles from 'styles/option_list.module.scss'

export default function optionList() {
	const [optionList, setOptionList] = useState([{}])
	// const [classList, setClassList] = useState([])
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
	const [newPost, setNewPost] = useState(false)
	const [order, setOrder] = useState("")
	const [switchId, setSwitchId] = useState()
	const [loading, setLoading] = useState(false)
	const [values, setValues] = useState({})

	const daynumObj = ["日数","数量"]
	const unitObj = ["個", "台", "枚", "人","つ" ]

	// 読み込み ----------------------
	useEffect(() => {
		async function init() {
			setOptionList(await getDb('option', 'name', true))
			// setSelectClass(await classList[0]?.name)
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
		await addData('option', object)
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
		await setData("option", object, id)
		setSelectId("")
		setEdit(false)
		sort()
	}
	const handleInputChange = (e) => {
		const target = e.target
		// const value = target.type === "checkbox" ? target.checked : target.value;
		const value = target.value
		const name = target.name
		setValues({ ...values, [name]: value })
	}
	const setInputChange = (val1, val2, val3, val4, val5, val6, val7) => {
		// item.visible, item.name, item.s_name, item.category, item.unit, item.price, item.max
		setValues({ ...values, visibleInput: val1, nameInput: val2, s_nameInput: val3, categoryInput: val4, unitInput: val5, priceInput: val6, maxInput: val7})
	}
	// 削除 ----------------------
	async function handleDelete() {
		setLoading(true)
		await deleteData("option", selectId)
		setOpen(false);
		setSelectId("")
		setSelectName("")
		sort()
		setLoading(false)
	}
	// ソート ----------------------
	async function sort() {
		if (order) {
			setOptionList(await getDb('option', order, sortSw[switchId]))
		} else {
			setOptionList(await getDb('option', "name", true))
		}
	}
	useEffect(() => {
		sort()
	}, [switchId, sortSw, order])
	return (
		<>
			<Loading loading={loading} />
			<MainHead title="オプション" />
			<div className={styles.table} >
				<div className={styles.thead}>
					<div className={styles.tr}>
						<div className={styles.th}>
							表示/非表示<Button className={styles.btn} onClick={() => {
								setOrder("visible")
								setSortSw((prevState) =>
									prevState.map((value, index) => (index === 0 ? !value : value))
								)
								setSwitchId(0)
							}}>ソート</Button>
						</div>
						<div className={styles.th}>
							<div>
								オプション名<Button className={styles.btn} onClick={() => {
									setOrder("name")
									setSortSw((prevState) =>
										prevState.map((value, index) => (index === 1 ? !value : value))
									)
									setSwitchId(1)
								}}>ソート</Button>
							</div>
							<div>
								{`【 略称 】`}
							</div>
						</div>
						<div className={styles.th}>
							料金
						</div>
						<div className={styles.th}>
							最大貸渡
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
					{optionList && (optionList.map((item, index) => {
						return (
							<div key={index}>
								<div key={index} className={styles.tr}>

									{edit === index ? (
										<>
											<div className={styles.td}>
												<Button
													name="visibleInput"
													label="表示/非表示"
													type="button"
													onChange={handleInputChange}
													InputLabelProps={{ shrink: true }}
													variant={item.visible ? "contained" : "outlined"}
												>
													{item.visible ? "表示" : "非表示"}
												</Button>
											</div>
											<div className={styles.td}>
												<TextField
													name="nameInput"
													label="オプション名"
													type="text"
													defaultValue={item.name}
													value={values.nameInput}
													onChange={handleInputChange}
													InputLabelProps={{ shrink: true }}
												/>
												<TextField
													name="s_nameInput"
													label="略称"
													type="text"
													defaultValue={item.s_name}
													value={values.s_nameInput}
													onChange={handleInputChange}
													InputLabelProps={{ shrink: true }}
												/>
											</div>
											<div className={styles.td}>
												<Select
													name="categoryInput"
													label="料金区分"
													type="text"
													defaultValue={item.category}
													onChange={handleInputChange}
													value={values.categoryInput}
													InputLabelProps={{ shrink: true }}
												>
													{daynumObj.map((item, index) => (
														<MenuItem
															key={index}
															value={item}
														>
															{item}
														</MenuItem>
													))}
												</Select>
												<Select
													name="unitInput"
													label="単位"
													type="text"
													defaultValue={item.unit}
													onChange={handleInputChange}
													value={values.unitInput}
													InputLabelProps={{ shrink: true }}
												>
													{unitObj.map((item, index) => (
														<MenuItem
															key={index}
															value={item}
														>
															{item}
														</MenuItem>
													))}
												</Select>
											</div>
											<div className={styles.td}>
												<TextField
													name="maxInput"
													label="最大貸渡数"
													type="text"
													defaultValue={item.max}
													onChange={handleInputChange}
													value={values.maxInput}
													InputLabelProps={{ shrink: true }}
												/>
												{values.unitInput }
											</div>

										</>
									) : (
											<>
												<div className={styles.td}>
													{item.visible ? "表示" : "非表示"}
												</div>
												<div className={styles.td}>
													<div>{item.name}</div>
													<div>{`【 ${item.s_name} 】`}</div>
												</div>
												<div className={styles.td}>
													{item.category === "当日" ? "当日" : `1${item.unit}`}
													{" "}
													{item.price === 0 ? "無料" : `${Number(item.price).toLocaleString()}円～` }
												</div>
												<div className={styles.td}>
													{item.max}{item.unit}
												</div>
											</>
									)}
									<div className={styles.td}>
										<Button
											variant="outlined"
											className={styles.btn}
											onClick={() => {
												edit === index ? (
													setEdit(false)
												) : (
													<>
															{setInputChange(item.visible, item.name, item.s_name, item.category, item.unit, item.price,item.max)}
															{setEdit(index)}
													</>
												)
											}}
										>
											{edit === index ? "取消" : "編集"}
										</Button>
									</div>
									<div key={index} className={styles.td}>
										<Button
											variant="contained"
											className={styles.btn}
											onClick={() => {
												edit === index ? (
													handleSet(optionList[index].id)
												) : (
													<>
														{setSelectId(optionList[index].id)}
														{setSelectName(item.name)}
														{setOpen(true)}
													</>
												)
											}}
										>
											{edit === index ? "登録" : "削除"}
										</Button>
									</div>
								</div>
							</div>
						)
					}))}
				</div>
				<div className={styles.tfoot}>
					<Box className={styles.tr} component="form" noValidate onSubmit={handleSubmit} >

						<div className={styles.td}>
							{newPost && (
								<Button
									name="visibleInput"
									label="表示/非表示"
									type="button"
									onChange={handleInputChange}
									InputLabelProps={{ shrink: true }}
								// variant={item.visible ? "contained" : "outlined"}
								>
									{/* {item.visible ? "表示" : "非表示"} */}
								</Button>
							)}
						</div>
						<div className={styles.td}>
							{newPost && (
								<>
									<TextField
										name="nameInput"
										label="オプション名"
										type="text"
										value={values.nameInput}
										onChange={handleInputChange}
										InputLabelProps={{ shrink: true }}
									/>
									<TextField
										name="s_nameInput"
										label="略称"
										type="text"
										value={values.s_nameInput}
										onChange={handleInputChange}
										InputLabelProps={{ shrink: true }}
									/>
								</>
							)}
						</div>
						<div className={styles.td}>
							{newPost && (
								<>
									<Select
										name="categoryInput"
										label="料金区分"
										type="text"
										onChange={handleInputChange}
										value={values.categoryInput}
										InputLabelProps={{ shrink: true }}
									>
										{daynumObj.map((item, index) => (
											<MenuItem
												key={index}
												value={item}
											>
												{item}
											</MenuItem>
										))}
									</Select>
									<Select
										name="unitInput"
										label="単位"
										type="text"
										onChange={handleInputChange}
										value={values.unitInput}
										InputLabelProps={{ shrink: true }}
									>
										{unitObj.map((item, index) => (
											<MenuItem
												key={index}
												value={item}
											>
												{item}
											</MenuItem>
										))}
									</Select>
								</>
							)}
						</div>
						<div className={styles.td}>
							{newPost && (
								<>
									<TextField
										name="maxInput"
										label="最大貸渡数"
										type="text"
										onChange={handleInputChange}
										value={values.maxInput}
										InputLabelProps={{ shrink: true }}
									/>
									{values.unitInput}
								</>
							)}
						</div>
						<div className={styles.td}>
							<Button
								variant="outlined"
								className={styles.btn}
								onClick={() => {
									newPost ? (
										setNewPost(false)
									) : (
										setNewPost(true)
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
									onClick={handleSubmit}
								>登録</Button>
							)}
						</div>
					</Box>
				</div>
			</div>

			<DeleteModal submit={handleDelete} name={selectName} id={selectId} open={open} setOpen={setOpen} />
		</>
	)
}
