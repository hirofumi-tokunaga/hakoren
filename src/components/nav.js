import Link from 'next/link'
import styles from 'src/styles/nav.module.scss'

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
						<a>予約車両検索フォーム</a>
					</Link>
					<Link href="/post_put">
						<a>予約登録</a>
					</Link>
					<Link href="/members/registry">
						<a>新規会員登録</a>
					</Link>
					<Link href="/members/login">
						<a>メンバーログイン</a>
					</Link>
				</li>

			</ul>
		</nav>
	)

}
