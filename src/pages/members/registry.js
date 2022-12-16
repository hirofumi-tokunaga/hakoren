import React, { useEffect, useState } from 'react'
import { getDb } from 'src/components/api'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
		console.log(e.target.name)
		let name = e.target.name
		let value = e.target.value
		name === 'nameA' ? setNameA(value) : ""
		console.log(nameA)
	}
	const handleConfirm = () => {
		setConfirm(true)
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
									<TextField name="tel" onChange={handleInput} value={tel}/>
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>メールアドレス</Box>
								<Box className={styles.td} name="email" onChange={handleInput} value={email}>
									<TextField />
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>パスワード</Box>
								<Box className={styles.td}>
									<TextField name="pass" onChange={handleInput} value={pass } />
								</Box>
							</Box>
						</Box>
						<Button variant="contained" className={styles.confirm} onClick={handleConfirm}>入力内容を確認</Button>
					</Box>
				): (
					<Box className={styles.confirmInfo}>
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
						</Box>
						<Button variant="contained" className={styles.confirm} onClick={handleConfirm}>入力内容を確認</Button>
					</Box>
				)}
			</Box>
		</>
	)
}
