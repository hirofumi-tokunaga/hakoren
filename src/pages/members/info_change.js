import { useEffect, useState, useContext } from 'react'
import { getDb,setData} from 'src/components/api'
import { LoginMemberContext } from "src/components/loginMember"
import { useRouter } from 'next/router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import styles from 'src/styles/registry.module.scss'

export default function Registry() {
	const [confirm, setConfirm] = useState(false)
	const [members,setMembers] = useState([])
	const {member,setMember, booking } = useContext(LoginMemberContext)
	const [nameA, setNameA] = useState(member.nameA)
	const [nameB, setNameB] = useState(member.nameB)
	const [nameKanaA, setNameKanaA] = useState(member.nameKanaA)
	const [nameKanaB, setNameKanaB] = useState(member.nameKanaB)
	const [tel, setTel] = useState(member.tel)
	const [pass, setPass] = useState(member.pass)
	const router = useRouter()

	useEffect(() => {
		async function init() {
			setMembers(await getDb('members'))
		}
		init()
	}, [])
	const handleInput = (e) => {
		let name = e.target.name
		let value = e.target.value
		name === 'nameA' ? setNameA(value) : ""
		name === 'nameB' ? setNameB(value) : ""
		name === 'nameKanaA' ? setNameKanaA(value) : ""
		name === 'nameKanaB' ? setNameKanaB(value) : ""
		name === 'tel' ? setTel(value) : ""
		name === 'pass' ? setPass(value) : ""
	}
	const handleConfirm = () => {
		if (
			nameA &&
			nameB &&
			nameKanaA &&
			nameKanaB &&
			tel &&
			pass) {
			setConfirm(true)
		} else {
			alert('入力内容が不足しています')
		}
	}
	const handleBack = () => {
		setConfirm(false)
	}
	
	const handleSubmit = async () => {
		let object = {
			nameA: nameA,
			nameB: nameB,
			nameKanaA: nameKanaA,
			nameKanaB: nameKanaB,
			email: member.email,
			tel: tel,
			pass:pass
		}
		// setMember(object)
		await setData('members', object,member.id).
			then(() => {
				alert('変更しました。次回ログイン時より有効になります')
				// setMember(object)
				if (booking.classData) {
					router.push("/members/booking")
				} else {
					router.push("/members/mypage")
				}
			})
			.catch(() => { alert('変更に失敗しました') })
	}
	return (
		<>
			<Box className={styles.container}>
				<h2 className={styles.pageTitle }>会員情報変更</h2>
				{!confirm ? (
					<Box className={styles.registryInfo}>
						<h2>お客様情報</h2>
						<Box className={styles.table}>
							<Box className={styles.tr}>
								<Box className={styles.th}>お名前</Box>
								<Box className={`${styles.td} ${styles.flex}`}>
									<TextField label="姓" style={{ marginRight: "10px" }} name="nameA" onChange={handleInput} value={nameA} />
									<TextField label="名" name="nameB" onChange={handleInput} value={nameB} />
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>お名前（カナ）</Box>
								<Box className={`${styles.td} ${styles.flex}`}>
									<TextField label="セイ" style={{ marginRight: "10px" }} name="nameKanaA" onChange={handleInput} value={nameKanaA} />
									<TextField label="メイ" name="nameKanaB" onChange={handleInput} value={nameKanaB} />
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>携帯電話番号</Box>
								<Box className={styles.td}>
									<TextField name="tel" onChange={handleInput} value={tel} />
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>パスワード</Box>
								<Box className={styles.td}>
									<TextField name="pass" onChange={handleInput} value={pass} />
								</Box>
							</Box>
						</Box>
						<Button variant="contained" className={styles.confirm} onClick={handleConfirm}>入力内容を確認</Button>
					</Box>
				) : (
						<Box className={`${styles.registryInfo} ${styles.confirmInfo}`}>
						<h2>お客様情報</h2>
						<Box className={styles.table}>
							<Box className={styles.tr}>
								<Box className={styles.th}>お名前</Box>
								<Box className={`${styles.td} ${styles.flex}`}>
									{nameA} {nameB}
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>お名前（カナ）</Box>
								<Box className={`${styles.td} ${styles.flex}`}>
									{nameKanaA} {nameKanaB}
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th} name="tel">携帯電話番号</Box>
								<Box className={styles.td}>
									{tel}
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>パスワード</Box>
								<Box className={styles.td}>
									{pass}
								</Box>
							</Box>
						</Box >
						<Box className={styles.btns } >
							<Button variant="outlined" className={styles.confirm} onClick={handleBack}>
								内容を変更
							</Button>
								<Button variant="contained" className={styles.confirm} onClick={handleSubmit}>
								この内容で登録
							</Button>
						</Box>
					</Box>
				)}
			</Box>
		</>
	)
}
