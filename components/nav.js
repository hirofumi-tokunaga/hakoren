import Link from 'next/link'
import styles from 'styles/nav.module.css'

export default function Nav() {
	return (
		<nav className={styles.list}>
			<ul>
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/cars">
						<a>CARS</a>
					</Link>
				</li>

			</ul>
		</nav>
	)

}
