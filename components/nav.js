import Link from 'next/link'
import styles from 'styles/nav.module.scss'

export default function Nav() {
	return (
		<nav className={`shadow ${styles.list}`}>
			<ul>
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/cars/car_list">
						<a>CAR_LIST</a>
					</Link>
				</li>
				
			</ul>
		</nav>
	)

}
