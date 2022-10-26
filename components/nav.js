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
						<a>車両一覧</a>
					</Link>
				</li>
				<li>
					<Link href="/input">
						<a>予約</a>
					</Link>
				</li>
				<li>
					<Link href="/view">
						<a>稼働表</a>
					</Link>
				</li>
			</ul>
		</nav>
	)

}
