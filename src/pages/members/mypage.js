import { useEffect, useState, useContext } from 'react'
import { getDb,deleteData,upDate} from 'src/components/api'
import { LoginMemberContext } from "src/components/loginMember"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import styles from 'src/styles/mypage.module.scss'

import DeleteModal from 'src/pages/modal/booking_delete'
import { alertClasses } from '@mui/material'

export default function Mypage() {
	const { member } = useContext(LoginMemberContext)
	const [bookingInfo, setBookingInfo] = useState([])
	const [classList, setClassList] = useState([])
	const [selectId, setSelectId] = useState()
	const [open, setOpen] = useState(false)

	useEffect(() => {
		async function init() {
			let bookingInfo = await getDb('bookinginfo','startDate')
			setBookingInfo(bookingInfo?.filter((item) => item.memberId === member.id))
			setClassList(await getDb('class')) 
		}
		init()
	},[])
	const transDate = (date) => {
		let y = date.substr(0, 4)
		let m = date.substr(4, 2)
		let d = date.substr(6, 2)
		const day = y + '年' + m + '月' + d + '日'
		return day
	}
	console.log(bookingInfo,classList)
	async function handleDelete() {
		await deleteData("bookinginfo", selectId)
		setOpen(false)
		alert('予約を削除しました')
		let bookingInfo = await getDb('bookinginfo','startDate')
		setBookingInfo(bookingInfo?.filter((item) => item.memberId === member.id))		
	}
	async function send(i) {
		await upDate("bookinginfo",bookingInfo[i].id,'send',!bookingInfo[i].send)
		async function init() {
			let bookingInfo = await getDb('bookinginfo','startDate')
			setBookingInfo(bookingInfo?.filter((item) => item.memberId === member.id))
		}
		init()
	}
	return (
		<Box className={styles.mypage }>
			<Box className={styles.container}>
				<h1>マイページ</h1>
				<h2>予約履歴</h2>
				<Box>
					{bookingInfo?.map((item,i) => {
						return(
							<Box key={i} className={styles.table}>
								<Box className={styles.tr}>
									<Box className={styles.th}>クラス</Box>
									<Box className={styles.class}>
										<img src={classList?.filter((item2) => item2.id === item.classId)[0]?.image}/>
										{classList?.filter((item2) => item2.id === item.classId)[0]?.name}
									</Box>
								</Box>
								<Box className={styles.tr}>
									<Box className={styles.th}>貸出日時</Box>
									{transDate(item.startDate)} {item.startTime}
								</Box>
								<Box className={styles.tr}>
									<Box className={styles.th}>返却日時</Box>
									{transDate(item.endDate)} {item.endTime}
								</Box>
								<Box className={styles.tr}>
									<Box className={styles.th}>お名前</Box>
									{item.nameA} {item.nameB}
								</Box>
								<Box className={styles.tr}>
									<Box className={styles.th}>ご利用人数</Box>
									{item.people}
								</Box>
								<Box className={styles.tr}>
									<Box className={styles.th}>送迎</Box>
										{item.send ? (
											"要"
										): (
												"不要"
										)}
										<Button className={styles.sendBtn} variant="outlined" onClick={() => send(i)}>変更</Button>
								</Box>
								<Box className={styles.tr}>
									<Box className={styles.th}>携帯番号</Box>
									{item.tel}
								</Box>
								<Box className={styles.tr}>
									<Box className={styles.th}>メール</Box>
									{item.email}
								</Box>
								<Box className={styles.tr}>
								<Box className={styles.th}>備考</Box>
									{item.text}
								</Box>
								<Button
									className={styles.btn} 
									variant="contained" 
									onClick={() => {
										setOpen(true)
										setSelectId(bookingInfo[i].id)
									}}>予約取消</Button>
							</Box>
						)
					})}
				</Box>
			</Box>
			<DeleteModal submit={handleDelete} id={selectId} open={open} setOpen={setOpen}/>
		</Box>
	)
}
