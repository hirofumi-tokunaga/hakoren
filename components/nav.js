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
					<Link href="/master/car_list">
						<a>車両管理</a>
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
					<Link href="/master/class_list">
						<a>クラス</a>
					</Link>
				</li>
				<li>
					<Link href="/master/option_list">
						<a>オプション</a>
					</Link>
				</li>
				<li>
					<Link href="/media">
						<a>メディア</a>
					</Link>
				</li>
				<li>
					<Link href="/signup">
						<a>ログインユーザー追加</a>
					</Link>
				</li>
				<li>
					<Link href="/search">
						<a>コーポレートサイトの検索フォーム</a>
					</Link>
					<Link href="/estimate">
						<a>見積フォーム</a>
					</Link>
					<Link href="/post_put">
						<a>テスト送信フォーム</a>
					</Link>
				</li>

			</ul>
		</nav>
	)

}
