import React,{ useEffect, useState ,useContext} from 'react'
import { getDb } from 'src/components/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LoginMemberContext } from "src/components/loginMember"

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import Loading from 'src/components/loading'
import DatePicker_Custom from 'src/components/datepicker-custom'
import TimePicker from 'src/components/timepicker'

import styles from 'src/styles/estimate.module.scss'

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
	const [daysNum, setDaysNum] = useState()
	const [basicCalc,setBasicCalc] = useState(0)
	const [optCalc, setOptCalc] = useState(0)
	const [totalCalc, setTotalCalc] = useState(0)

	const { member } = useContext(LoginMemberContext)
	const router = useRouter()
	const query = router.query;
	useEffect(() => {
		if (router.isReady && query.id) {
			let sy = query.sd.substr(0, 4)
			let sm = query.sd.substr(4, 2)
			let sd = query.sd.substr(6, 2)
			let sday = sy + '.' + sm + '.' + sd
			let sdate = new Date(sday);

			let ey = query.ed.substr(0, 4)
			let em = query.ed.substr(4, 2)
			let ed = query.ed.substr(6, 2)
			let eday = ey + '.' + em + '.' + ed
			let edate = new Date(eday);

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
	const transDate = (date,str = "") => {
		var dd = String(date.getDate()).padStart(2, "0")
		var mm = String(date.getMonth() + 1).padStart(2, "0")
		var yyyy = date.getFullYear()
		return yyyy + str + mm + str + dd
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
	const handleOptionNum = (event, index) => {
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
	}, [classData])
	useEffect(() => {
		if (optionNum && classData && optionList) {
			const list = classData.add_option.map((id,i) => {
				return (
					Number(optionList.filter((item) => item.id === id)[0]?.price) * optionNum[i]
				)
			})
			const sum = list.reduce((prev, current) => {
				return prev += current;
			})
			setOptCalc(sum || 0)
		}
	}, [optionNum])

	useEffect(() => {
		setTotalCalc(optCalc + basicCalc)
	}, [optCalc, basicCalc])

	useEffect(() => {
		if (daysNum > 0) {
			setBasicCalc(Number(classData?.price * daysNum))
		}
	}, [daysNum,classData])

	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist'))
			handleDateCheck()
			let diff = endDate?.getTime() - startDate?.getTime()
			setDaysNum((diff / (1000 * 60 * 60 * 24)) + 1)
		}
		init()
	}, [startDate, endDate])
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
								<React.Fragment key={ i }>
									{Number(currentOpt?.max) > 0 && (
										<Box className={styles.optSelect}>
											{currentOpt?.name}
											<Select
												value={optionNum && (optionNum[i]) || 0}
												onChange={(event) => handleOptionNum(event, i)}
												className={styles.selectBox }
											>
												<MenuItem key={0} value={0} role="menuitem">{0} {currentOpt?.unit}</MenuItem>
													{[...Array(Number(currentOpt?.max))].map((_, ii) => {
														return (
															<MenuItem key={ii + 1} value={ii + 1}>{ii + 1} {currentOpt?.unit }</MenuItem>
														)
													})}
											</Select>
										</Box>
									)}
								</React.Fragment>
							)
						})}
						<Box className={styles.calc}>
							<Box className={styles.flexBox}>
								<Box className={styles.basic}>
									<h4>基本利用料金</h4>
									<Box className={styles.flexBox }>
										<Box>
											出発日時<br />
											返却日時<br />
											利用日数<br />
										</Box>
										<Box>
											{transDate(startDate, '-')} {startTime}<br/>
											{transDate(endDate, '-')} {endTime}<br />
											{daysNum}<br />
										</Box>
									</Box>
									<Box className={styles.basicCalc} >{basicCalc.toLocaleString()} 円</Box>
								</Box>
								<Box className={styles.option}>
									<h4>オプション料金</h4>
									{optionNum && (
										<>
										{classData?.add_option.map((item, i) => {
											if (optionNum[i] < 1) {
												return
											}
											return (
												<Box className={styles.flexBox} key={i}>
													<Box>
														{optionList.filter((item2) => item2.id === item)[0]?.name}
													</Box>
													<Box>
														{Number(optionList.filter((item2) => item2.id === item)[0]?.price * optionNum[i]).toLocaleString()} {"円" }
													</Box>
												</Box>
											)
										})}
										</>
									)}
									<Box className={styles.optCalc} >{optCalc.toLocaleString()} 円</Box>
								</Box>
							</Box>
							<Box className={styles.totalCalc} ><span className={styles.text}>合計料金</span><span className={styles.price}>{totalCalc.toLocaleString()}</span><span className={styles.yen}>円</span></Box>
						</Box>
						{member.email ? (
							<Link href="/members/booking">
								<Button variant="contained" className={styles.bookingBtn }>予約へ進む</Button>
							</Link>
						) : (
							<Box className={styles.btns}>
								<Box className={styles.wrap}>
									初めてご利用の方
									<Link href="/members/registry">
										<Button variant="contained">
											会員登録して予約へ進む
										</Button>
									</Link>
								</Box>
								<Box className={styles.wrap}>
									会員登録済みの方
									<Link href="/members/login">
										<Button variant="contained">
											ログインして予約へ進む
										</Button>
									</Link>
								</Box>
							</Box>
						)}
					</Box>
				</Box>
			</Box>
		</>
	)
}
