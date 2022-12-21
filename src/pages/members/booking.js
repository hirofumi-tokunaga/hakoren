import React, { useEffect, useState, useContext } from 'react'
import { LoginMemberContext } from "src/components/loginMember"

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import styles from 'src/styles/booking.module.scss'

export default function Booking() {
	const { member, booking } = useContext(LoginMemberContext)
	const [selectPref, setSelectPref] = useState("")
	const [selectAir, setSelectAir] = useState("")
	const [selectPeople, setSelectPeople] = useState("")
	const [purpose, setPurpose] = useState("")
	const [text, setText] = useState("")
	const prefectures = [
		'北海道',
		'青森県',
		'岩手県',
		'宮城県',
		'秋田県',
		'山形県',
		'福島県',
		'茨城県',
		'栃木県',
		'群馬県',
		'埼玉県',
		'千葉県',
		'東京都',
		'神奈川県',
		'新潟県',
		'富山県',
		'石川県',
		'福井県',
		'山梨県',
		'長野県',
		'岐阜県',
		'静岡県',
		'愛知県',
		'三重県',
		'滋賀県',
		'京都府',
		'大阪府',
		'兵庫県',
		'奈良県',
		'和歌山県',
		'鳥取県',
		'島根県',
		'岡山県',
		'広島県',
		'山口県',
		'徳島県',
		'香川県',
		'愛媛県',
		'高知県',
		'福岡県',
		'佐賀県',
		'長崎県',
		'熊本県',
		'大分県',
		'宮崎県',
		'鹿児島県',
		'沖縄県'
	]
	const air = [
		'ご来店（送迎不要）',
		'ANA',
		'JAL',
		'スカイマーク',
		'ピーチ',
		'バニラエア',
		'その他',
		'未定'
	]
	const people = [
		'未定',
		'1名',
		'2名',
		'3名',
		'4名',
		'5名',
		'6名',
		'7名',
		'8名',
		'9名',
		'10名'
	]
	return (
		<Box className={styles.booking }>
			<h1>ご予約お申込みフォーム</h1>
			<Box className={styles.container}>
				<Box>
					<h2>予約情報</h2>
					<Box className={styles.tr}>
						<Box className={styles.th}>氏名</Box>
						<Box className={styles.td}>
							<Box className={styles.flex}>
								<TextField variant='outlined' label="姓"/>
								<TextField variant='outlined' label="名" />
							</Box>
						</Box>
					</Box>
					<Box className={styles.tr}>
						<Box className={styles.th}>氏名（カナ）</Box>
						<Box className={styles.td}>
							<Box className={styles.flex}>
								<TextField variant='outlined' label="セイ" />
								<TextField variant='outlined' label="メイ" />
							</Box>
						</Box>
					</Box>
					<Box className={styles.tr}>
						<Box className={styles.th}>携帯番号</Box>
						<Box className={styles.td}>
							<TextField variant='outlined' />
						</Box>
					</Box>
					<Box className={styles.tr}>
						<Box className={styles.th}>メールアドレス</Box>
						<Box className={styles.td}>
							<TextField variant='outlined' />
						</Box>
					</Box>
					<Box className={styles.tr}>
						<Box className={styles.th}>ご住所（都道府県）</Box>
						<Box className={styles.td}>
							<Select
								value={selectPref}
								onChange={(event) => setSelectPref(event.target.value)}
								className={styles.selectBox}
							>
								{prefectures.map((item, i) => {
									return (
										<MenuItem key={i} value={item} >
											{item}
										</MenuItem>
									)
								})}
							</Select>
						</Box>
					</Box>
					<Box className={styles.tr}>
						<Box className={styles.th}>送迎について</Box>
						<Box className={styles.td}>
							<Box className={styles.flex}>
								<Select
									value={selectAir}
									onChange={(event) => setSelectAir(event.target.value)}
									className={styles.selectBox}
								>
									{air.map((item, i) => {
										return (
											<MenuItem key={i} value={item} >
												{item}
											</MenuItem>
										)
									})}
								</Select>
								<TextField variant='outlined' label="便名" />
							</Box>
							<Box>
								※送迎をご希望のお客様は「便名」をご入力ください。<br />
								※便名が未定のお客様は「未定」と記載下さい。
							</Box>
						</Box>
					</Box>
					<Box className={styles.tr}>
						<Box className={styles.th}>ご利用人数</Box>
						<Box className={styles.td}>
							<Select
								value={selectPeople}
								onChange={(event) => setSelectPeople(event.target.value)}
								className={styles.selectBox}
							>
								{people.map((item, i) => {
									return (
										<MenuItem key={i} value={item} >
											{item}
										</MenuItem>
									)
								})}
							</Select>
						</Box>
					</Box>
					<Box className={styles.tr}>
						<Box className={styles.th}>ご利用目的</Box>
						<Box className={styles.td}>
							<RadioGroup
								aria-labelledby="demo-radio-buttons-group-label"
								defaultValue="観光"
								name="radio-buttons-group"
								row
								value={purpose}
								onChange={(event) => setPurpose(event.target.value)}
							>
								<FormControlLabel value="観光" control={<Radio />} label="観光" />
								<FormControlLabel value="ビジネス" control={<Radio />} label="ビジネス" />
								<FormControlLabel value="その他" control={<Radio />} label="その他" />
							</RadioGroup>
						</Box>
					</Box>
					<h2>ご質問・備考</h2>
					<TextField
						multiline
						className={styles.textarea}
						value={text}
						onChange={(event) => setText(event.target.value) }
					/>
					<Button>予約内容の確認へ進む</Button>
					<Button>詳細へ戻る</Button>
				</Box>

				<Box>
					<h2>ご予約内容</h2>
					<Box className={styles.table}>
						<Box className={styles.tr}>
							<Box className={styles.th}>車型</Box>
							<Box className={styles.td}></Box>
						</Box>
						<Box className={styles.tr}>
							<Box className={styles.th}>定員</Box>
							<Box className={styles.td}></Box>
						</Box>
						<Box className={styles.tr}>
							<Box className={styles.th}>標準装備</Box>
							<Box className={styles.td}></Box>
						</Box>
					</Box>
					<h3>基本料金</h3>
					<Box className={styles.tr}>
						<Box className={styles.th}>貸出日時</Box>
						<Box className={styles.td}></Box>
					</Box>
					<Box className={styles.tr}>
						<Box className={styles.th}>返却日時</Box>
						<Box className={styles.td}></Box>
					</Box>
					<Box>円</Box>
					<h3>オプション料金</h3>
					<Box className={styles.tr}>
						<Box className={styles.th}></Box>
						<Box className={styles.td}></Box>
					</Box>
					<Box>円</Box>
					<Box>合計料金</Box>
				</Box>
			</Box>
		</Box>
	)
}
