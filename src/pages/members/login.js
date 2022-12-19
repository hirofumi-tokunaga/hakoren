import React, { useEffect, useState,useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getDb } from 'src/components/api'
import { LoginMemberContext } from "src/components/loginMember"

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import styles from 'src/styles/member_login.module.scss'

export default function Registry() {
	const [members, setMembers] = useState([])
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const {member,setMember } = useContext(LoginMemberContext)
	useEffect(() => {
		async function init() {
			setMembers(await getDb('members'))
		}
		init()
	}, [])
	const handleSubmit = () => {
	}
	const handleEmail = (e) => {
		setEmail(e.target.value)
		if (members.filter((item) => item.email === e.target.value)[0]?.email) {
			console.log("ID-OK")
		} else {
			console.log("ID-NON")
		}
	}
	const handlePass = (e) => {
		setPass(e.target.value)
		if (members.filter((item) => item.pass)[0] === e.target.value) {
			console.log("pass-OK")
		} else {
			console.log("pass-NON")
		}
	}
	console.log(member)
	return (
		<>
			<Box className={styles.container }>
				<TextField label='email' name='email' onChange={handleEmail} value={email} />
				<TextField label='password' name='pass' onChange={handlePass} value={pass} />
				<Button variant="contained" onClick={handleSubmit()}>ログイン</Button>
			</Box>

		</>
	)
}
