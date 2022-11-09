import {useState } from 'react'
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import Button from "@mui/material/Button";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { app } from "../components/firebase"
import { useRouter } from "next/router"

export default function Signup() {
	const router = useRouter();
	const auth = getAuth(app);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await createUserWithEmailAndPassword(auth, email, password);
		router.push("/");
	};
	const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};
	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};
	return(
		<form onSubmit={handleSubmit}>
			<div

			>
				<InputLabel>メールアドレス</InputLabel>
				<TextField
					name="email"
					type="email"
					size="small"
					onChange={handleChangeEmail}

				/>
			</div>
			<div

			>
				<InputLabel>パスワード</InputLabel>
				<TextField
					name="password"
					type="password"
					size="small"
					onChange={handleChangePassword}

				/>
			</div>
			<div

			>
				<Button type="submit" variant="outlined">
					登録
				</Button>
			</div>
			<div
			>
			</div>
		</form>
	)
}
