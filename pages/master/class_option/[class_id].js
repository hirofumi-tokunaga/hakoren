import { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link'

import { getDb, upDate  } from 'components/api'
import MainHead from 'components/mainhead'
import Loading from 'components/loading'

import Button from '@mui/material/Button'
import CheckBox from '@mui/material/Checkbox'

import styles from 'styles/class_option.module.scss'

export default function ClassOption(){
	const router = useRouter()
	// パスパラメータから値を取得
	const { class_id } = router.query

	const [classList, setClassList] = useState([{}])
	const [optionList, setOptionList] = useState([{}])
	const [switchId, setSwitchId] = useState()
	const [sortSw, setSortSw] = useState([false, false, false, false, false])
	const [order, setOrder] = useState("")
	const [basicOption, setBasicOption] = useState([])
	const [addOption, setAddOption] = useState([])

	const [loading, setLoading] = useState(false)
	const [currentClass, setCurrentClass] = useState([{}])

	// 読み込み ----------------------
	useEffect(() => {
		async function init() {
			setOptionList(await getDb('option', 'name', true))
			setClassList(await getDb('class', '', true))
		}
		init();
	}, [])
	useEffect(() => {
		setCurrentClass(classList.filter((item) => item.id === class_id)[0])
	}, [classList])
	useEffect(() => {
		setBasicOption(currentClass?.basic_option)
		setAddOption(currentClass?.add_option)
	}, [currentClass])

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

	// 更新 ----------------------
	async function handleSubmit() {
		await upDate("class", class_id, "basic_option", basicOption)
		await upDate("class", class_id, "add_option", addOption)
		router.push("/master/class_list")
	}
	const handleBasicOpt = (e, id) => {
		if (e.target.checked) {
			setBasicOption((prevState) => ([...prevState, id]))
		} else {
			setBasicOption((prevState) => prevState.filter((value) => value !== id))
		}
	}
	return (
		<>
			<Loading loading={loading} />
			<MainHead title={`[クラス：${currentClass?.name}] オプション設定`} />
			<div className={styles.table} >
				<div className={styles.thead}>
					<div className={styles.tr}>
						<div className={styles.th}>
							使用
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
						</div>
						<div className={styles.th}>
							料金
						</div>
						<div className={styles.th}>
							最大貸渡
						</div>
					</div>
				</div>
				<div className={styles.tbody}>
					{optionList && (optionList.map((item, index) => {
						return (
							<div key={index}>
								<div key={index} className={styles.tr}>
									<div className={styles.td}>
										<CheckBox onChange={(e) => handleBasicOpt(e, item.id)} checked={basicOption?.some((i) => i === item.id) || false} />
										{console.log("koko", basicOption?.some((i) => i === item.id)) }

									</div>
									<div className={`${styles.td} ${styles.name}`}>
										<div>{item.name}</div>
									</div>
									<div className={styles.td}>
										{item.category === "日数" ? "当日" : `1${item.unit}`}
										{" "}
										{item.price === "0" ? "無料" : `${Number(item.price).toLocaleString()}円～`}
									</div>
									<div className={styles.td}>
										{item.max}{item.unit}
									</div>
								</div>
							</div>
						)
					}))}
				</div>
				<div className={styles.tfoot}>
					<div className={styles.td}>
						<Link href={"/master/class_list"}>
							<Button
								variant="outlined"
								className={styles.btn}
							>
								取消
							</Button>
						</Link>
					</div>
					<div className={styles.td}>
						<Button
							className={styles.btn}
							type="submit"
							variant="contained"
							sx={{ mb: 2 }}
							onClick={handleSubmit}
						>登録</Button>
					</div>
				</div>
			</div>
		</>
	)
}
