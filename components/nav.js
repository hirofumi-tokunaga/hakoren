import Link from 'next/link'
import styles from 'styles/nav.module.scss'

export default function Nav() {
	return (
		<nav className={`shadow ${styles.list}`}>
			<ul>
				<li>
					<Link href="/">
						<a>ダッシュボード</a>
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
				<li>
					<Link href="/class/class_list">
						<a>クラス</a>
					</Link>
				</li>

				<li>
					<Link href="/signup">
						<a>ログインユーザー追加</a>
					</Link>
				</li>
				<li>
					<Link href="/reservation">
						<a>コーポレートサイトの予約フォーム</a>
					</Link>
				</li>

			</ul>
		</nav>
	)

}
