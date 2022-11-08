import Box from '@mui/material/Box';
import Meta from 'components/meta'
import MainHead from 'components/mainhead'
import { SignInOrOutButton } from 'components/SignInOrOutButton'
import { useAuthState } from 'hooks/useAuthState'
import { SignInForm } from "../components/SignInForm"

export default function Home() {
	const login = useAuthState()
	console.log(login)
	return (
		login.isSignedIn ? (
			<>
				<Meta />
				<Box>
					<MainHead title="トップページ" />
				</Box>
				<SignInOrOutButton />
			</>
		) : (
			<>
				<MainHead title="ログインページ" />
				<SignInForm />
			</>
		)
	)
}
