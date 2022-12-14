import { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link'

import { getDb, upDate } from 'src/components/api'
import MainHead from 'src/components/mainhead'
import Loading from 'src/components/loading'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import styles from 'src/styles/class_text.module.scss'

export default function ClassText(){
	const router = useRouter()
	// パスパラメータから値を取得
	const { class_id } = router.query

	const [classList, setClassList] = useState([{}])
	const [text, setText] = useState([])

	const [loading, setLoading] = useState(false)
	const [currentClass, setCurrentClass] = useState([{}])

	// 読み込み ----------------------
	useEffect(() => {
		async function init() {
			setClassList(await getDb('class', '', true))
		}
		init();
	}, [])
	useEffect(() => {
		setCurrentClass(classList.filter((item) => item.id === class_id)[0])
	}, [classList])
	useEffect(() => {
		setText(currentClass?.text)
	}, [currentClass])


	// 更新 ----------------------
	async function handleSubmit() {
		await upDate("class", class_id, "text", text)
		router.push("/master/class_list")
	}
	const handleText = (e) => {
		setText(e.target.value)
	}
	return (
		<>
			<Loading loading={loading} />
			<MainHead title={`[クラス：${currentClass?.name}] オプション設定`} />

			<div className={styles.section}>
				<TextField
					label="紹介文"
					multiline
					value={text}
					onChange={handleText}
					className={styles.field}
				/>
			</div>
			<div className={styles.section}>
				<div className={styles.btns}>
					<Link href={"/master/class_list"}>
						<Button
							variant="outlined"
							className={styles.btn}
						>
							取消
						</Button>
					</Link>
					<Button
						className={styles.btn}
						type="submit"
						variant="contained"
						sx={{ mb: 2 }}
						onClick={handleSubmit}
					>登録</Button>
				</div>
			</div>
		</>
	)
}
