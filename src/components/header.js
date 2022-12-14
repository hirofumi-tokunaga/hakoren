import Logo from './logo'
import styles from 'src/styles/header.module.scss'
import { SignInOrOutButton } from 'src/components/SignInOrOutButton'
import { useAuthState } from 'src/hooks/useAuthState'

export default function Header() {
	const login = useAuthState()
	return (
		<header className={styles.wrapper}>
			<Logo />
			<div>
				<span style={{marginRight:"20px"}}>
					{login.userName ? `Login - ${login.userName}` : `LoginID - ${login.userId}`}
				</span>
				<SignInOrOutButton />
			</div>
		</header>
	)
}
