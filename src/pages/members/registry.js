import React, { useEffect, useState } from 'react'
import { getDb } from 'src/components/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { init, emailjs } from 'emailjs-com'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'


import styles from 'src/styles/registry.module.scss'

export default function Registry() {
	const [confirm, setConfirm] = useState(false)
	const [nameA, setNameA] = useState()
	const [nameB, setNameB] = useState()
	const [nameKanaA, setNameKanaA] = useState()
	const [nameKanaB, setNameKanaB] = useState()
	const [tel, setTel] = useState()
	const [email, setEmail] = useState()
	const [pass, setPass] = useState()
	useEffect(() => {
		async function init() {

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
		name === 'email' ? setEmail(value) : ""
		name === 'pass' ? setPass(value) : ""
	}
	const handleConfirm = () => {
		if (
			nameA &&
			nameB &&
			nameKanaA &&
			nameKanaB &&
			tel &&
			email &&
			pass) {
			setConfirm(true)
		} else {
			alert('入力内容が不足しています')
		}
	}
	const handleBack = () => {
		setConfirm(false)
	}
	const handleSendMail = () => {
		// emailjsのUser_IDを使って初期化
		init('1haj4SXf6QFkzxOWH')

		// 環境変数からService_IDとTemplate_IDを取得する。
		const emailjsServiceId = 'service_0hbt7kp';
		const emailjsTemplateId = 'template_iwpkhd4';

		// emailjsのテンプレートに渡すパラメータを宣言
		const templateParams = {
			email: email,
		};

		// ServiceId,Template_ID,テンプレートに渡すパラメータを引数にemailjsを呼び出し
		emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams).
			then(() => {
				// do something
			});
	}

	return (
		<>
			<Box className={styles.container}>
				<h2 className={styles.pageTitle }>新規会員登録</h2>
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
								<Box className={styles.th}>メールアドレス</Box>
								<Box className={styles.td}>
									<TextField name="email" onChange={handleInput} value={email} />
								</Box>
								<Box>
									<Button onClick={handleSendMail} variant="contained">
										受信確認メールを送信
									</Button>
									※このボタンをクリックすると、ご入力いただいたメールアドレス宛てにメールを受信確認メールを送信いたします。
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
								<Box className={styles.th}>メールアドレス</Box>
								<Box className={styles.td}>
									{email}
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
							<Button variant="contained" className={styles.confirm} onClick={handleConfirm}>
								この内容で登録
							</Button>
						</Box>
					</Box>
				)}
			</Box>
		</>
	)
}
