import { useEffect, useState } from 'react'
import { getDb ,getBookingDate} from 'src/components/api'
import Link from 'next/link'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import DatePicker_Custom from 'src/components/datepicker-custom'
import TimePicker from 'src/components/timepicker'

import styles from 'src/styles/search.module.scss'

export default function Search() {
	const Today = new Date()
	const [startDate, setStartDate] = useState(Today)
	const [endDate, setEndDate] = useState(Today)
	const [startTime, setStartTime] = useState("08:30")
	const [endTime, setEndTime] = useState("20:30")
	const [scheduleOk, setScheduleOk] = useState(false)
	const [carList, setCarList] = useState([])
	const [optionList,setOptionList] = useState([])
	const [okClass, setOkClass] = useState([])
	const [classList,setClassList] = useState([])
	const [isSearch, setIsSearch] = useState(false)
	const [bookingInfo,setBookingInfo] = useState()
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

	const handleDateCheck = async () => {
		let currentStart = transDate(startDate,-20)
		setBookingInfo(await getBookingDate('bookinginfo', currentStart))
	}
	useEffect(() => {
		let currentStart = transDate(startDate)
		let currentEnd = transDate(endDate)
		let dateNg = bookingInfo?.filter((item) =>
			(item.startDate <= currentStart &&
			item.endDate >= currentStart) ||
			(item.startDate <= currentEnd &&
				item.endDate >= currentEnd) ||
			(item.startDate >= currentStart &&
				item.endDate <= currentEnd) ||
			(item.startDate <= currentStart &&
				item.endDate >= currentEnd))
		const ngCarList = dateNg?.map((item) => {
			return item.carId
		})
		let okClass = carList?.map((item) => {
			const existing = ngCarList.some((v) => v === item.id)
			if(!existing) {
				return item.classId
			}else{
				return ""
			}
		})
		let okClassList = classList?.map((item) => {
			const existing = okClass.some((v) => v === item.id)
			if(existing) {
				return item
			}else{
				return ""
			}
		})
		let okClassList2 = okClassList.filter((item) => item !== "")
		if(okClassList2.length > 0){
			setScheduleOk(true)
		}
		setOkClass(okClassList2)
		// console.log("DATE_NG=",dateNg)
		// console.log("NG_CARLIST=",ngCarList)
		// console.log("OK_CLASS=",okClass)
		// console.log("OK_CLASS_LIST=",okClassList)
	}, [bookingInfo])
	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist'))
			setClassList(await getDb('class'))
			setOptionList(await getDb('option'))
		}
		init();
	}, [])
	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist'))
			handleDateCheck()
		}
		init();
	}, [startDate, endDate])
	return (
		<Box className={styles.container}>
			<Box className={styles.outline}>
				<h2>レンタカー最安検索</h2>
				<Box className={styles.form}>
					<Box className={styles.schedule} >
						<Box className={styles.box}>
							<FormControl className={styles.day}>
								<InputLabel className="input-label" shrink={true} name="startDate">出発日</InputLabel>
								<DatePicker_Custom date={startDate} setDate={setStartDate} checkDate={endDate} setCheckDate={setEndDate} start/>
							</FormControl>
							<FormControl className={styles.time} >
								<InputLabel className="input-label" shrink={true} name="startTime">出発時刻</InputLabel>
								<TimePicker time={startTime} setTime={setStartTime} />
							</FormControl>
						</Box>
						<Box className={styles.box}>
							<FormControl className={styles.day} >
								<InputLabel className="input-label" shrink={true} name="endDate">返却日</InputLabel>
								<DatePicker_Custom date={endDate} setDate={setEndDate} checkDate={startDate} setCheckDate={setStartDate} />
							</FormControl>
							<FormControl className={styles.time}>
								<InputLabel className="input-label" shrink={true} name="endTime">返却時刻</InputLabel>
								<TimePicker time={endTime} setTime={setEndTime} />
							</FormControl>
						</Box>

					</Box>
					<Button
						className={styles.btn}
						variant="contained"
						sx={{ mb: 2 }}
						onClick={() => {
							handleDateCheck()
							setIsSearch(true)
						}}
					>在庫検索</Button>
				</Box>
			</Box>
			<p style={scheduleOk ? { color: "#0000ff" } : { color: "#ff0000" }}>{isSearch && (scheduleOk ? "以下の在庫が在ります" : "条件に一致する在庫がありません")}</p>
				{isSearch && (okClass?.map((item,i) => {

					return (
						<Box key={i} >
								<Box className={styles.cardata}>
									<Box className={styles.left}>
										<Box className={styles.c_name}>
											{item.name}クラス
										</Box>
										<Box className={styles.c_image}>
											<img src={item.image}/>
										</Box>
										<Box className={styles.c_info}>
											<Box className="flex">
												<Box>車型</Box>
												<Box>{item.car}</Box>
											</Box>
											<Box className="flex">
												<Box>定員</Box>
												<Box>{item.capacity} 名</Box>
											</Box>
										</Box>
									</Box>
									<Box className={styles.center}>
										<Box className={styles.option}>
											<Box>標準装備</Box>
											<Box>
												{item.basic_option.map((item2,ii) => {
													return (
														<span key={ ii}>
															{optionList.filter((item3) => item3.id === item2)[0]?.name}
														</span>
													)
												})}
											</Box>
										</Box>
										<Box className={styles.text}>
											{item.text}
										</Box>
									</Box>
									<Box className={styles.right}>
										<Box className={styles.price_title}>当日料金</Box>
										<Box className={styles.price_wrap}><span className={styles.bunner}>WEB価格</span><span className={styles.price}>{Number(item.price).toLocaleString()}</span>円～（税込）</Box>
										<Link href={{
											pathname: '/estimate',
											query: { id: item.id, sd: transDate(startDate), st: startTime, ed: transDate(endDate), et: endTime },
										}}>
											<Button
												variant="contained"
											>
												詳細・お見積りへ
											</Button>
										</Link>
									</Box>
								</Box>
						</Box>
					)
				}
				))}
		</Box>
	)
}
