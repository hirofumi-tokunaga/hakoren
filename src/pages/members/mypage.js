import { useEffect, useState, useContext } from 'react'
import { getDb,deleteData,upDate} from 'src/components/api'
import { LoginMemberContext } from "src/components/loginMember"

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import styles from 'src/styles/mypage.module.scss'

import DeleteModal from 'src/pages/modal/booking_delete'


export default function Mypage() {
	const { member } = useContext(LoginMemberContext)
	const [bookingInfo, setBookingInfo] = useState([])
	const [classList, setClassList] = useState([])
	const [selectId, setSelectId] = useState()
	const [open, setOpen] = useState(false)

	useEffect(() => {
		init()
	},[])
	useEffect(() => {
		if(member.id){
			init()
		}
	},[member])
	const transDate = (date) => {
		let y = date.substr(0, 4)
		let m = date.substr(4, 2)
		let d = date.substr(6, 2)
		const day = y + '年' + m + '月' + d + '日'
		return day
	}
	async function handleDelete() {
		await deleteData("bookinginfo", selectId)
		setOpen(false)
		alert('予約を削除しました')
		init()
	}

	async function send(i) {
		await upDate("bookinginfo",bookingInfo[i].id,'send',!bookingInfo[i].send)
		init()
	}
	async function init(){
		let bookingInfo = await getDb('bookinginfo','bookingDateTime')
		setBookingInfo(bookingInfo?.filter((item) => item.memberId === member.id))
		setClassList(await getDb('class')) 
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
									<Box className={styles.th}>予約ID</Box>
									<Box className={styles.class}>
										{item.id}
									</Box>
								</Box>
								<Box className={styles.tr}>
									<Box className={styles.th}>予約日時</Box>
									<Box className={styles.bookingDateTime}>
										{item.bookingDateTime}
									</Box>
								</Box>
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
