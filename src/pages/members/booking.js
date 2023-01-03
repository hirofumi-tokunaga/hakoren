import React, { useEffect, useState, useContext } from 'react'
import { LoginMemberContext } from "src/components/loginMember"
import { addData ,getBookingDate} from 'src/components/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import styles from 'src/styles/booking.module.scss'

export default function Booking() {
	const { member, booking } = useContext(LoginMemberContext)
	const [selectPref, setSelectPref] = useState("")
	const [nameA, setNameA] = useState("")
	const [nameB, setNameB] = useState("")
	const [nameKanaA, setNameKanaA] = useState("")
	const [nameKanaB, setNameKanaB] = useState("")
	const [tel, setTel] = useState("")
	const [email, setEmail] = useState("")
	const [selectPeople, setSelectPeople] = useState("")
	const [purpose, setPurpose] = useState("")
	const [text, setText] = useState("")
	const [checked, setChecked] = useState(false)
	const [confirm, setConfirm] = useState(false)
	const [bookingInfo, setBookingInfo] = useState([])
	const [sday, setSday] = useState("")
	const [eday, setEday] = useState("")
	const router = useRouter()

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

	

	const transDate = (date,calc = 0) => {

		var dd = String(date.getDate()).padStart(2, "0")
		var mm = String(date.getMonth()).padStart(2, "0")
		var yyyy = date.getFullYear()
		var dt = new Date(yyyy , mm , dd,0,0,0)

		dt.setDate(dt.getDate() + calc)
		var dd = String(dt.getDate()).padStart(2, "0")
		var mm = String(dt.getMonth()+1 ).padStart(2, "0")
		var yyyy = dt.getFullYear()
		return yyyy + mm + dd
	}
	useEffect(() => {
		async function init() {
			setNameA(member.nameA)
			setNameB(member.nameB)
			setNameKanaA(member.nameKanaA)
			setNameKanaB(member.nameKanaB)
			setTel(member.tel)
			setEmail(member.email)
			if(booking.startDate){
				let sy = booking.startDate.substr(0, 4)
				let sm = booking.startDate.substr(4, 2)
				let sd = booking.startDate.substr(6, 2)
				let sdate = sy + '年' + sm + '月' + sd + '日'
				setSday(sdate)
	
				let ey = booking.endDate.substr(0, 4)
				let em = booking.endDate.substr(4, 2)
				let ed = booking.endDate.substr(6, 2)
				let edate = ey + '年' + em + '月' + ed + '日' 
				setEday(edate)

				let dt = new Date(sy , sm - 1 , sd,0,0,0)
				let currentStart = transDate(dt,-20)
				setBookingInfo(await getBookingDate("bookinginfo",currentStart))
			}

		}
		init()
	}, [])
	useEffect(() => {
		if(booking.carId){
			async function init() {
				setNameA(member.nameA)
				setNameB(member.nameB)
				setNameKanaA(member.nameKanaA)
				setNameKanaB(member.nameKanaB)
				setTel(member.tel)
				setEmail(member.email)
				if(booking.startDate){
					let sy = booking.startDate.substr(0, 4)
					let sm = booking.startDate.substr(4, 2)
					let sd = booking.startDate.substr(6, 2)
					let sdate = sy + '年' + sm + '月' + sd + '日'
					setSday(sdate)
		
					let ey = booking.endDate.substr(0, 4)
					let em = booking.endDate.substr(4, 2)
					let ed = booking.endDate.substr(6, 2)
					let edate = ey + '年' + em + '月' + ed + '日' 
					setEday(edate)
	
					let dt = new Date(sy , sm - 1 , sd,0,0,0)
					let currentStart = transDate(dt,-20)
					setBookingInfo(await getBookingDate("bookinginfo",currentStart))
				}
			}
			init()
		}
	}, [booking])
	const handleConfirm = () => {
		if (
			nameA &&
			nameB &&
			nameKanaA &&
			nameKanaB &&
			tel &&
			email &&
			selectPeople) {
			setConfirm(true)
		} else {
			alert('入力内容が不足しています')
		}
	}
	
	const handleSubmit = async () => {
		let currentStart = booking.startDate
		let currentEnd = booking.endDate
		let carId = booking.carId
		let ngCar = bookingInfo?.filter((item) => (
			(((item.startDate <= currentStart) &&
			(item.endDate >= currentStart)) ||
			((item.startDate <= currentEnd) &&
			(item.endDate >= currentEnd)) ||
			((item.startDate >= currentStart) &&
			(item.endDate <= currentEnd)) ||
			((item.startDate <= currentStart) &&
			(item.endDate >= currentEnd))) &&
			(item.carId === carId)))[0]?.carId
		if (!ngCar?.length) {
			let object = {
				carId:booking.carId,
				classId:booking.classData.id,
				startDate: booking.startDate,
				startTime: booking.startTime,
				endDate: booking.endDate,
				endTime: booking.endTime,
				nameA: nameA,
				nameB: nameB,
				nameKanaA: nameKanaA,
				nameKanaB: nameKanaB,
				memberId:member.id,
				tel: tel,
				email: email,
				prefectures: selectPref,
				send: checked,
				people: selectPeople,
				purpose: purpose,
				text: text,
				basicCalc:booking.basicCalc,
				addCalc: booking.addCalc,
				totalCalc: booking.totalCalc,
				bookingDateTime:new Date().toLocaleString()
			}
			await addData('bookinginfo', object).
				then(() => {
					alert('予約が完了しました')
					router.push("/members/mypage")
				})
				.catch(() => { alert('登録に失敗しました') })
		} else {
			alert('予約が重複しました。大変お手数ですが再度検索下さい。')
		}

	}
	return (
		<Box className={styles.booking}>
			{confirm ? (
				<h1>ご予約内容確認</h1>
			) : (
				<h1>ご予約お申込み情報入力</h1>
			)}

			<Box className={styles.container}>
				{confirm ? (
					<Box className={styles.confirm }>
						<h2>予約情報</h2>
						<Box className={styles.tr}>
							<Box className={styles.th}>氏名</Box>
							<Box className={styles.td}>
								<Box className={styles.flex}>
									{nameA} {nameB}
								</Box>
							</Box>
						</Box>
						<Box className={styles.tr}>
							<Box className={styles.th}>氏名（カナ）</Box>
							<Box className={styles.td}>
								<Box className={styles.flex}>
									{nameKanaA} {nameKanaB}
								</Box>
							</Box>
						</Box>
						<Box className={styles.tr}>
							<Box className={styles.th}>携帯番号</Box>
							<Box className={styles.td}>{tel}
							</Box>
						</Box>
						<Box className={styles.tr}>
							<Box className={styles.th}>メールアドレス</Box>
							<Box className={styles.td}>
								{email}
							</Box>
						</Box>
						<Box className={styles.tr}>
							<Box className={styles.th}>ご住所（都道府県）</Box>
							<Box className={styles.td}>
								{selectPref}
							</Box>
						</Box>
						<Box className={styles.tr}>
							<Box className={styles.th}>送迎について</Box>
							<Box className={styles.td}>
								{checked ? (
									"要"
								) : (
									"不要"
								)}
							</Box>
						</Box>
						<Box className={styles.tr}>
							<Box className={styles.th}>ご利用人数</Box>
							<Box className={styles.td}>
								{selectPeople}
							</Box>
						</Box>
						<Box className={styles.tr}>
							<Box className={styles.th}>ご利用目的</Box>
							<Box className={styles.td}>
								{purpose}
							</Box>
						</Box>
						<h2>ご質問・備考</h2>
						<Box
							className={styles.textarea}
							style={{overFlow:"hidden"}}
						>
							{text}
						</Box>
						<Box className={styles.btns}>
							<Button variant="outlined" onClick={() => {
								setConfirm(false)
							}} >入力画面へ戻る</Button>
							<Button variant="contained" onClick={handleSubmit}>予約確定</Button>
						</Box>
					</Box>

				) : (

						<Box>
							<h2>予約情報</h2>
							<Box className={styles.tr}>
								<Box className={styles.th}>氏名</Box>
								<Box className={styles.td}>
									<Box className={styles.flex}>
										<TextField variant='outlined' label="姓" style={{ marginRight: "15px" }} value={nameA} onChange={(e) => {setNameA(e.target.value)}} />
										<TextField variant='outlined' label="名" value={nameB} onChange={(e) => { setNameB(e.target.value) }} />
									</Box>
									<Box className={styles.text}>
										※法人のお客様は、備考欄へ法人名をご入力下さい。
									</Box>
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>氏名（カナ）</Box>
								<Box className={styles.td}>
									<Box className={styles.flex}>
										<TextField variant='outlined' label="セイ" style={{ marginRight: "15px" }} value={nameKanaA} onChange={(e) => { setNameKanaA(e.target.value) }} />
										<TextField variant='outlined' label="メイ"
											value={nameKanaB} onChange={(e) => { setNameKanaB(e.target.value) }}/>
									</Box>
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>携帯番号</Box>
								<Box className={styles.td}>
									<TextField variant='outlined' style={{ width: "100%" }} value={tel} onChange={(e) => { setTel(e.target.value) }} />
									<Box className={styles.text}>
										※ハイフンなしでご入力してください。(例：09012341234)<br />
										※当日必ず連絡のつく携帯電話の番号をご入力ください。
									</Box>
								</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>メールアドレス</Box>
								<Box className={styles.td}>
									<TextField variant='outlined' style={{ width: "100%" }} value={email} onChange={(e) => { setEmail(e.target.value) }} />
									<Box className={styles.textRed }>
										※予約者ご本人様のメールアドレスをご入力ください。<br/>
										※ご予約完了メールが届かないケースが増えております。<br />ドコモ、ソフトバンク、au、その他携帯会社のメールアドレスをご利用のお客様は迷惑メール対策の設定をご確認ください。<br />※【 @www.hakoren.net 】のドメインを受信可能にしてください。
									</Box>
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
									<Box>
										<Switch checked={checked}
											onChange={(event) => {setChecked(event.target.checked) }} />
										{checked ? (
											"要"
										): (
												"不要"
										)}
									</Box>
									{/* <Box className={styles.flex}>
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
									</Box> */}
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
								minRows={3}
								maxRows={3}
								className={styles.textarea}
								value={text}
								onChange={(event) => setText(event.target.value) }
							/>
							<Box className={styles.btns}>
								<Link href={'/members/estimate'}>
									<Button variant="outlined">詳細へ戻る</Button>
								</Link>
								<Button variant="contained" onClick={handleConfirm}>予約内容の確認へ進む</Button>
							</Box>
						</Box>
					)}
				{booking.classData && (

					<Box>
						<h2>ご予約内容</h2>
						<Box className={styles.table}>
							<Box className={styles.tr}>
								<Box className={styles.th}>車型</Box>
								<Box className={styles.td}>{booking.classData.car}</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>定員</Box>
								<Box className={styles.td}>{booking.classData.capacity}</Box>
							</Box>
							<Box className={styles.tr}>
								<Box className={styles.th}>標準装備</Box>
								<Box className={styles.td}>
									{booking.basicOpt.map((item,i) => {
										return (
											<Box key={i}>
												{item}
											</Box>
										)
									})}
								</Box>
							</Box>
						</Box>
						<h3>基本料金</h3>
						<Box className={styles.tr}>
							<Box className={styles.th}>貸出日時</Box>
							<Box className={styles.td}>{sday} {booking.startTime }</Box>
						</Box>
						<Box className={styles.tr}>
							<Box className={styles.th}>返却日時</Box>
							<Box className={styles.td}>{eday} {booking.endTime}</Box>
						</Box>
						<Box className={styles.price}>
							<Box className={styles}>
								{booking.basicCalc.toLocaleString()}
							</Box>円
						</Box>
						<h3>オプション料金</h3>
						{booking.addOptList.map((item,i) => {
							return (
								<Box className={styles.tr} key={i }>
									<Box className={styles.th}>{`${item.name} (${item.num})`}</Box>
									<Box className={styles.td}>{(item.num * item.price).toLocaleString()} 円</Box>
								</Box>
							)
						})}
						<Box className={styles.price}>
							<Box>
								{booking.addCalc.toLocaleString()}
							</Box>円
						</Box>
						<Box className={styles.total}>
							<Box>合計料金</Box>
							<Box><span>{booking.totalCalc.toLocaleString()}</span> 円</Box>
						</Box>
					</Box>
				)}
			</Box>
		</Box>
	)
}
