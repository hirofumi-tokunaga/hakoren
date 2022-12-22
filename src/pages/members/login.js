import React, { useEffect, useState,useContext } from 'react'
import Link from 'next/link'
import { getDb } from 'src/components/api'
import { LoginMemberContext } from "src/components/loginMember"
import { useRouter } from 'next/router'

import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment';

import CheckIcon from '@mui/icons-material/Check'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import styles from 'src/styles/member_login.module.scss'

export default function Login() {
	const [members, setMembers] = useState([])
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const [idOk,setIdOk] = useState(false)
	const [passOk, setPassOk] = useState(false)
	const [currentMember, setCurrentMember] = useState({})
	const router = useRouter()

	const { member, setMember, booking } = useContext(LoginMemberContext)
	useEffect(() => {
		async function init() {
			setMembers(await getDb('members'))
		}
		init()
	}, [])
	useEffect(() => {
		if (idOk && currentMember.pass === pass) {
			setPassOk(true)
		} else {
			setPassOk(false)
		}
	}, [email])
	console.log("pass", pass, currentMember.pass,passOk,email)
	const handleSubmit = () => {
		if (idOk && passOk) {
			setMember(currentMember)
			if (booking.classData) {
				router.push("/members/booking")
			} else {
				router.push("/members/mypage")
			}
		}
	}
	const handleEmail = (e) => {
		setEmail(e.target.value)
		if (members.filter((item) => item.email === e.target.value)[0]?.email) {
			setIdOk(true)
			setCurrentMember(members.filter((item) => item.email === e.target.value)[0])
		} else {
			setIdOk(false)
		}
	}
	const handlePass = (e) => {
		setPass(e.target.value)
		if (idOk &&	currentMember.pass === e.target.value) {
			setPassOk(true)
		} else {
			setPassOk(false)
		}
	}

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show)
	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}
	return (
		<>
			<Box className={styles.container}>
				<Box>
				<TextField label='Email' name='email' onChange={handleEmail} value={email} />
					{idOk && (
						<CheckIcon className={styles.check } />
					)}
				</Box>
				<Box>
					<FormControl variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							label='Password' name='pass' onChange={handlePass} value={pass}
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					{passOk && (
						<CheckIcon className={styles.check} />
					)}
				</Box>
				<Button className={styles.btn } variant="contained" onClick={handleSubmit}>ログイン</Button>
				<Link href="/members/registry" >
					<a className={styles.registry}>新規会員登録</a>
				</Link>
			</Box>
		</>
	)
}
