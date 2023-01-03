import { useContext } from 'react'
import Link from 'next/link'
import Logo from './logo'
import { KEYS, removeItem } from "src/components/LocalStorage"
import styles from 'src/styles/memberHeader.module.scss'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { LoginMemberContext } from "src/components/loginMember"
import { useRouter } from 'next/router'

export default function Header() {
	const { member, setMember } = useContext(LoginMemberContext)
	const router = useRouter()
	console.log(member)

	const handleSignout = () => {
		removeItem(KEYS.MEMBER)
		setMember({})
		router.push("/members/login")
	}
	return (
		<header className={styles.wrapper}>
			<Logo />
			<Box className={styles.controll }>
				{member.id && (
					<>
						<Link href="/members/mypage">
							<a>マイページ</a>
						</Link>
						<Link href="/members/info_change">
							<a>会員情報変更</a>
						</Link>
					</>
				)}
				<Link href="/members/search">
					<a>レンタカー検索</a>
				</Link>
				<Link href="/members/registry">
					<a>新規会員登録</a>
				</Link>
				{member.email ? (
					<>
						<Box>
							{`ログインユーザー : ${member.nameA} さま`}
						</Box>
						<Button onClick={handleSignout}>ログアウト</Button>
					</>
				) : (
						<Link href="/members/login">
							<Button>ログイン</Button>
						</Link>
				)}

			</Box>

		</header>
	)
}
