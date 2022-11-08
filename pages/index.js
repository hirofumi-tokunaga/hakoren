import Box from '@mui/material/Box';
import Meta from 'components/meta'
import MainHead from 'components/mainhead'
import { SignInOrOutButton } from 'components/SignInOrOutButton'
import { useAuthState } from 'hooks/useAuthState'

export default function Home() {
	const login = useAuthState()
	console.log(login)
	return (
		<>
			<Meta />
			<Box>
				<MainHead title="トップページ" />
			</Box>
			<SignInOrOutButton />

		</>
	)
}
