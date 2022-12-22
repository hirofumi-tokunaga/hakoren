import { useContext } from 'react'
import Link from 'next/link'
import Logo from './logo'
import styles from 'src/styles/memberHeader.module.scss'

import { useAuthState } from 'src/hooks/useAuthState'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { LoginMemberContext } from "src/components/loginMember"

export default function Header() {
	const { member, setMember } = useContext(LoginMemberContext)
	console.log(member)
	const handleSignout = () => {
		setMember({})
	}
	return (
		<header className={styles.wrapper}>
			<Logo />
			<Box className={styles.controll }>
				<Link href="/members/mypage">
					<a>マイページ</a>
				</Link>
				<Link href="/search">
					<a>レンタカー検索</a>
				</Link>
				<Link href="/members/registry">
					<a>会員情報変更</a>
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
