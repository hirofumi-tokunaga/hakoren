import Logo from './logo'
import styles from 'styles/header.module.scss'
import { SignInOrOutButton } from 'components/SignInOrOutButton'

export default function Header() {
	return (
		<header className={styles.wrapper}>
			<Logo />
			<SignInOrOutButton />
		</header>
	)
}
