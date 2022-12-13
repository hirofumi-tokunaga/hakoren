import { useEffect, useState } from 'react'
import { getDb } from 'components/api'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import Loading from 'components/loading'
import DatePicker_Custom from 'components/datepicker-custom'
import TimePicker from 'components/timepicker'

import styles from 'styles/estimate.module.scss'

export default function Estimate() {
	const Today = new Date()
	const [startDate, setStartDate] = useState(Today)
	const [endDate, setEndDate] = useState(Today)
	const [startTime, setStartTime] = useState("08:30")
	const [endTime, setEndTime] = useState("20:30")
	const [loading, setLoading] = useState(false)
	const [scheduleOk, setScheduleOk] = useState(false)
	const [carList, setCarList] = useState([])
	const [classList, setClassList] = useState([])
	const [selectCarId, setSelectCarId] = useState()
	const [isSearch, setIsSearch] = useState(false)
	const [classData, setClassData] = useState()
	const [optionList, setOptionList] = useState([{}])
	const [optionNum, setOptionNum] = useState([])

	const router = useRouter()
	const query = router.query;
	useEffect(() => {
		if (router.isReady && query.id) {
			console.log(query.id, query.sd, query.st, query.ed, query.et)
			let sy = query.sd.substr(0, 4)
			let sm = query.sd.substr(4, 2)
			let sd = query.sd.substr(6, 2)
			let sday = sy + '.' + sm + '.' + sd
			let sdate = new Date(sday);
			console.log(sdate.toLocaleString(),query.st);

			let ey = query.ed.substr(0, 4)
			let em = query.ed.substr(4, 2)
			let ed = query.ed.substr(6, 2)
			let eday = ey + '.' + em + '.' + ed
			let edate = new Date(eday);
			console.log(edate.toLocaleString(), query.et);
			setStartDate(sdate)
			setStartTime(query.st)
			setEndDate(edate)
			setEndTime(query.et)
		}
	}, [query, router])



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
		})
	}
	const handleOptionNum = (event,index) => {
		setOptionNum((prevState) => {
				const arr = [...prevState];
				arr.splice(index, 1, event.target.value);
				return arr;
			}
		)
	}
	useEffect(() => {
		async function init() {
			setClassList(await getDb('class'))
			setOptionList(await getDb('option', 'name', true))
		}
		init();
	}, [])
	useEffect(() => {
		setClassData(classList?.filter((data) => data.id === query.id)[0])

	}, [classList])
	useEffect(() => {
		const def = classData?.add_option.map(() => 0)
		setOptionNum(def)
		console.log(def)
	}, [classData])
	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist'))
			handleDateCheck()
		}
		init();
	}, [startDate, endDate])
	console.log(optionNum)
	return (
		<>
			<Loading loading={loading} />
			<Box className={styles.container}>
				{classData && (
					<>
						<Box className={styles.cardata}>
							<Box className={styles.left}>
								<Box className={styles.c_name}>
									{classData.name}クラス
								</Box>
								<Box className={styles.c_image}>
									<img src={classData.image} />
								</Box>
								<Box className={styles.c_info}>
									<Box className="flex">
										<Box>車型</Box>
										<Box>{classData.car}</Box>
									</Box>
									<Box className="flex">
										<Box>定員</Box>
										<Box>{classData.capacity} 名</Box>
									</Box>
								</Box>
							</Box>
							<Box className={styles.center}>
								<Box className={styles.option}>
									<Box>標準装備</Box>
									<Box>
										{classData.basic_option.map((item, i2) => {
											return (
												<span key={i2}>
													{optionList.filter((item2) => item2.id === item)[0]?.name}
												</span>
											)
										})}
									</Box>
								</Box>
								<Box className={styles.text}>
									{classData.text}
								</Box>
							</Box>
						</Box>
					</>
				)}
				<Box className={styles.estimate}>
					<h2>
						ご利用条件・オプションを選択してお見積り
					</h2>
					<Box className={styles.inner}>
						<h3>レンタカーご利用基本条件</h3>
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
						<h3>オプション選択</h3>
							{classData?.add_option.map((item, i) => {
								let currentOpt = optionList?.filter((opt) => item === opt.id)[0]
								return (
									<Box className={styles.optSelect} key={i}>
										{currentOpt?.name}
										<Select
											value={optionNum && (optionNum[i]) || 0}
											onChange={(event) => handleOptionNum(event, i)}

										>
											<MenuItem value={0}>0</MenuItem>
											<MenuItem value={1}>1</MenuItem>
											<MenuItem value={2}>2</MenuItem>
										</Select>
									</Box>
								)
							})}
					</Box>
				</Box>
			</Box>
		</>
	)
}
