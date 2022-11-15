import { useEffect, useState } from 'react'
import { getDb, addData } from 'components/api'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup';

import Loading from 'components/loading'
import DatePicker_Custom from 'components/datepicker-custom'
import TimePicker from 'components/timepicker'
// import styles from 'styles/input.module.scss'

import styles from 'styles/reservation.module.scss'

export default function Input() {
	const Today = new Date()
	const [startDate, setStartDate] = useState(Today)
	const [endDate, setEndDate] = useState(Today)
	const [startTime, setStartTime] = useState("08:30")
	const [endTime, setEndTime] = useState("20:30")
	const [loading, setLoading] = useState(false)
	const [scheduleOk, setScheduleOk] = useState(false)
	const [carList, setCarList] = useState([])
	const [okClass, setOkClass] = useState([])
	const [classList,setClassList] = useState([])
	const [selectCarId, setSelectCarId] = useState()
	const [isSearch, setIsSearch] = useState(false)

	const inputCheck = (data) => {
		if (
			data.get('firstName') &&
			data.get('familyName') &&
			data.get('firstNameKana') &&
			data.get('familyNameKana') &&
			data.get('tel') &&
			data.get('gender') &&
			transDate(startDate) &&
			startTime &&
			transDate(endDate) &&
			endTime &&
			selectCarId
		) {
			return true
		} else {
			return false
		}
	}
	const transDate = (date) => {
		var dd = String(date.getDate()).padStart(2, "0")
		var mm = String(date.getMonth() + 1).padStart(2, "0")
		var yyyy = date.getFullYear()
		return yyyy + mm + dd
	}

	const handleDateCheck = async () => {
		let currentStart = Number(transDate(startDate))
		let currentEnd = Number(transDate(endDate))
		await getDb('bookinginfo').then((bookingInfo) => {
			let okCarList = []
			let newItems = []
			carList.forEach((car) => {
				let carOK = true
				bookingInfo.forEach((info) => {
					if (info.carId === car.id) {
						var startDate = Number(info.startDate)
						var endDate = Number(info.endDate)
						if (!((endDate < currentStart)
							|| (currentEnd < startDate))) {
							carOK = false
						}
					}
				})
				if (carOK) {
					if (okCarList.filter((item) => item === car.class).length < 1) {
						okCarList.push(
							car.class
						)
					}
					setScheduleOk(true)
				}
			})
			setOkClass(okCarList)
		})
	}
	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist'))
			setClassList(await getDb('class'))
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
		<>
			<Loading loading={loading} />
			<Box className={styles.container}>

				<Box className={styles.outline}>
					<h2>レンタカー最安検索</h2>
					<Box className={styles.form}>
						<Box className={styles.schedule} >
							<Box className={styles.box}>
								<FormControl className={styles.day}>
									<InputLabel className="input-label" shrink={true} name="startDate">出発日</InputLabel>
									<DatePicker_Custom date={startDate} setDate={setStartDate} />
								</FormControl>
								<FormControl className={styles.time} >
									<InputLabel className="input-label" shrink={true} name="startTime">出発時刻</InputLabel>
									<TimePicker time={startTime} setTime={setStartTime} />
								</FormControl>
							</Box>
							<Box className={styles.box}>
								<FormControl className={styles.day} >
									<InputLabel className="input-label" shrink={true} name="endDate">返却日</InputLabel>
									<DatePicker_Custom date={endDate} setDate={setEndDate} />
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
				<RadioGroup>
					<ul className={styles.cardata}>
						{isSearch && (okClass?.map((item,i) => {
							const classData = classList?.filter((data) => data.name === item)[0]
							return (
								<li key = { i } className="flex">
									{classData && (
										<>
											<div className={styles.left}>
												<div className={styles.c_name}>
													{classData.name}クラス
												</div>
												<div className={styles.c_image}>
													<img src={classData.image}/>
												</div>
												<div className={styles.c_info}>
													<div className="flex">
														<div>車型</div>
														<div>{classData.car}</div>
													</div>
													<div className="flex">
														<div>定員</div>
														<div>{classData.capacity} 名</div>
													</div>
												</div>
											</div>
											<div className={styles.right}>
												<div className={styles.price_title}>当日料金</div>
												<div className={styles.price_wrap}><span className={styles.bunner}>WEB価格</span><span className={styles.price}>{Number(classData.price).toLocaleString()}</span>円～（税込）</div>
												<Button
													variant="contained"
												>
													詳細・お見積りへ
												</Button>
											</div>
										</>
									)}
								</li>
							)
						}
						))}
					</ul>
				</RadioGroup>
			</Box>
			{/* <Button
				className={styles.btn}
				type="submit"
				variant="contained"
				sx={{ mb: 2 }}
			>予約する</Button> */}
		</>
	)
}
