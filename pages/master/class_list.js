import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getDb, deleteData, setData, addData} from 'components/api'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'


import MainHead from 'components/mainhead'
import DeleteModal from 'pages/modal/delete_modal'
import Loading from 'components/loading'
import UploadImage from 'components/upload_image'
import styles from 'styles/class_list.module.scss'

export default function ClassList() {
	const [classList, setClassList] = useState([{}])
	const [open, setOpen] = useState(false)
	const [edit, setEdit] = useState(false)
	const [sortSw, setSortSw] = useState([false, false, false, false, false])
	const [newPost,setNewPost] = useState(false)
	const [order, setOrder] = useState("")
	const [switchId, setSwitchId] = useState()
	const [loading, setLoading] = useState(false)
	const [selectId, setSelectId] = useState()
	const [selectName, setSelectName] = useState()
	const [imageUrl,setImageUrl] = useState("")

	const [values, setValues] = useState({

	});
		// 読み込み ----------------------
	useEffect(() => {
		async function init() {
			setClassList(await getDb('class','',true))
			setSelectName(await classList[0]?.name)
		}
		init();
	}, [])

	// 追加 ----------------------
	const handleSubmit = async () => {
		let name = values.nameInput
		let car = values.carInput
		let capacity = values.capacityInput
		let price = values.priceInput

		let object = {
			name: name,
			car: car,
			capacity: capacity,
			basic_option: "",
			add_option: "",
			price:price,
		}
		setLoading(true)
		await addData('class',object)
		setNewPost(false)
		sort()
		setLoading(false)
	}
	// 編集 ----------------------
	async function handleSet(id) {
		let name = values.nameInput
		let car = values.carInput
		let capacity = values.capacityInput
		let url = imageUrl ? imageUrl : ""
		let price = values.priceInput
		let object = {
			name: name,
			car: car,
			capacity: capacity,
			basic_option: "",
			add_option: "",
			image: url,
			price: price
		}
		await setData("class", object, id)
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
	const setInputChange = (val1, val2, val3,val4) => {
		setValues({ ...values,  nameInput: val1 , carInput: val2 , capacityInput: val3,priceInput:val4 })
	}
	// 削除 ----------------------
	async function handleDelete() {
		setLoading(true)
		await deleteData("class", selectId)
		setOpen(false);
		setSelectId("")
		setSelectName("")
		sort()
		setLoading(false)
	}
	// ソート ----------------------
	async function sort() {
		if (order) {
			setClassList(await getDb('class',order,sortSw[switchId]))
		} else {
			setClassList(await getDb('class', "name", true))
		}
	}
	useEffect(() => {
		sort()
	}, [switchId, sortSw, order])
	return (
		<>
			<Loading loading={loading} />
				<MainHead title="クラス管理"/>
				<div className={styles.table} >
					<div className={styles.thead}>
						<div className={styles.tr}>
							<div className={styles.th}>
								クラス名<Button className={styles.btn} onClick={() => {
									setOrder("name")
									setSortSw((prevState) =>
										prevState.map((value, index) => (index === 0 ? !value : value))
									)
									setSwitchId(0)
								}}>ソート</Button>
							</div>
							<div className={styles.th}>
								代表車種<Button className={styles.btn} onClick={() => {
									setOrder("car")
									setSortSw((prevState) =>
										prevState.map((value, index) => (index === 1 ? !value : value))
									)
									setSwitchId(1)
								}}>ソート</Button>
							</div>
							<div className={styles.th}>
								定員
								<Button className={styles.btn} onClick={() => {
									setOrder("capacity")
									setSortSw((prevState) =>
										prevState.map((value, index) => (index === 2 ? !value : value))
									)
									setSwitchId(2)
								}}>ソート</Button>
							</div>
							<div className={styles.th}>
								当日価格
							</div>
							<div className={styles.th}>
								画像
							</div>
							<div className={styles.th}>
								オプション
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
						{classList && (classList.map((item, index) => {
							return (
								<div key={index}>
									<div key={index} className={styles.tr}>
										{edit === index ? (
											<>
												<div className={styles.td}>
													<TextField
														name="nameInput"
														label="クラス名"
														type="text"
														defaultValue={item.name}
														value={values.nameInput}
														onChange={handleInputChange}
														InputLabelProps={{ shrink: true }}
													/>
												</div>
												<div className={styles.td}>
													<TextField
														name="carInput"
														label="代表車種"
														type="text"
														defaultValue={item.car}
														value={values.carInput}
														onChange={handleInputChange}
														InputLabelProps={{ shrink: true }}
													/>
												</div>
												<div className={styles.td}>
													<TextField
														name="capacityInput"
														label="定員"
														type="text"
														defaultValue={item.capacity}
														onChange={handleInputChange}
														value={values.capacityInput}
														InputLabelProps={{ shrink: true }}
													/>
												</div>
												<div className={styles.td}>
													<TextField
														name="priceInput"
														label="当日価格"
														type="text"
														defaultValue={item.price}
														onChange={handleInputChange}
														value={values.priceInput}
														InputLabelProps={{ shrink: true }}
													/>
												</div>
												<div className={styles.td}>
													<img src={item.image} style={{height: "100px" }} />
													<UploadImage setUrl={setImageUrl} />
												</div>
											</>
										): (
											<>
												<div className={styles.td}>
													{item.name}
												</div>
												<div className={styles.td}>
													{item.car}
												</div>
												<div className={styles.td}>
													{item.capacity}
												</div>
												<div className={styles.td}>
													{item.price}
												</div>
												<div className={styles.td}>
														<img src={item.image} style={{ height:"100px"}} />
												</div>
											</>
										)}
										<div className={styles.td}>
											<Link href={"/master/class_option"} as={`/master/class_option/${item.id}`}>
												<Button
													variant="outlined"
													className={styles.btn}
												>
													OP設定
												</Button>
											</Link>
										</div>
										<div className={styles.td}>
											<Button
												variant="outlined"
												className={styles.btn}
												onClick={() => {
													edit === index ? (
														setEdit(false)
													) : (
															<>
																{setInputChange(item.name, item.car, item.capacity,item.price)}
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
														handleSet(classList[index].id)
													): (
														<>
															{ setSelectId(classList[index].id) }
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

									<div className={styles.tr}>
										<div className={styles.basicOpt}>
											標準装備：
										</div>
										<div className={styles.addOpt}>
											追加オプション：
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
									<TextField
										name="nameInput"
										label="クラス名"
										type="text"
										className={styles.text}
										onChange={handleInputChange}
										InputLabelProps={{ shrink: true }}

									/>
								)}
							</div>
							<div className={styles.td}>
								{newPost && (
									<TextField
										name="carInput"
										label="代表車種"
										type="text"
										onChange={handleInputChange}
										className={styles.text}
										InputLabelProps={{ shrink: true }}
									/>
									)}
							</div>
							<div className={styles.td}>
								{newPost && (
									<TextField
										name="capacityInput"
										label="定員"
										onChange={handleInputChange}
										type="text"
										className={styles.text}
										InputLabelProps={{ shrink: true }}
									/>
								)}
						</div>
						<div className={styles.td}>
							{newPost && (
								<TextField
									name="capacityInput"
									label="画像"
									onChange={handleInputChange}
									type="text"
									className={styles.text}
									InputLabelProps={{ shrink: true }}
								/>
							)}
						</div>
						<div className={styles.td}>
							{newPost && (
								<TextField
									name="capacityInput"
									label="オプション"
									onChange={handleInputChange}
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

				<DeleteModal submit={handleDelete} name={selectName } id={selectId} open={open} setOpen={setOpen}/>
		</>
	)
}
