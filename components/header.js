import Logo from './logo'
import styles from 'styles/header.module.scss'

export default function Header() {
	return (
		<header className={styles.wrapper}>
			<Logo />
		</header>
	)
}
