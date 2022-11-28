import Logo from './logo'
import styles from 'styles/header.module.scss'
import { SignInOrOutButton } from 'components/SignInOrOutButton'
import { useAuthState } from 'hooks/useAuthState'

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
