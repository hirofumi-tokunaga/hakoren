import { useEffect, useState } from 'react'
import { getDb, addData } from 'components/api'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import Loading from 'components/loading'
import DatePicker_Custom from 'components/datepicker-custom'
import TimePicker from 'components/timepicker'
import styles from 'styles/view.module.scss'

const putDate = (dateStr, i = 0) => {
	let yy = dateStr.slice(0, 4)
	let mm = dateStr.slice(4, 6)
	let dd = dateStr.slice(6, 8)
	let newDate = new Date(yy, mm - 1  , Number(dd) + i, 1, 0, 0)
	var y = newDate.getFullYear();
	var m = ("00" + (newDate.getMonth() + 1) ).slice(-2);
	var d = ("00" + newDate.getDate()).slice(-2);
	return `${m} / ${d}`
}
const getDateString = (date) => {
	var y = date.getFullYear();
	var m = ("00" + (date.getMonth() + 1)).slice(-2);
	var d = ("00" + date.getDate()).slice(-2);
	var result = y + m + d;
	return result;
}
export default function View() {
	const Today = getDateString(new Date())
	const daySpan = 10
	const [loading, setLoading] = useState(false)
	const [carList, setCarList] = useState([])
	const [scheduleList,setScheduleList] = useState([])
	const [bookingInfo, setBookingInfo] = useState([])
	const [baseDate,setBaseDate] = useState(new Date())

	const calcDate = (dateStr1,dateStr2) => {
		let yy1 = dateStr1.slice(0, 4)
		let mm1 = dateStr1.slice(4, 6)
		let dd1 = dateStr1.slice(6, 8)
		let dt1 = new Date(yy1 , mm1 - 1 , dd1, 1, 0, 0)
		let yy2 = dateStr2.slice(0, 4)
		let mm2 = dateStr2.slice(4, 6)
		let dd2 = dateStr2.slice(6, 8)
		let dt2 = new Date(yy2 , mm2 - 1, dd2, 1, 0, 0)
		var sa = (dt1 - dt2) / 86400000
		return sa
	}



	const setCarSchedule = () => {
		let carToSchedule = []
		carList.map((car) => (
			carToSchedule.push(bookingInfo.filter((item) => item.carId === car.id))
		))
		console.log("carTo", carToSchedule)
		setScheduleList(carToSchedule)
	}
	useEffect(() => {
		setCarSchedule()
	}, [bookingInfo])
	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist', 'number_b', true))
			setBookingInfo(await getDb('bookinginfo'))
			await setCarSchedule()
			calcDate('20221023', '20221020')
			setBaseDate(Today)
		}
		init();
	}, [])
	return (
		<>
			<Loading loading={loading} />
			<h2>稼働表</h2>
			<Box className={styles.buttons}>
				<Button>
					<KeyboardDoubleArrowLeftIcon/>
					10日
				</Button>
				<Button>
					<ArrowBackIosIcon style={{fontSize:"medium"}}/>
					1日
				</Button>
				<Button>
					1日
					<ArrowForwardIosIcon style={{fontSize:"medium"}}/>
				</Button>
				<Button>
					10日
					<KeyboardDoubleArrowRightIcon/>
				</Button>
			</Box>
			<Box className={styles.table} >
				<Box className={styles.thead}>
					<Box className={styles.tr}>
						<Box className={styles.th}>
							{}
						</Box>
						{[...Array(daySpan - 1)].map((_, i) => {
							return(
								<Box className={styles.th} key={i}>
									{putDate(Today,i)}
								</Box>
							)
						})}
					</Box>
				</Box>
				<Box className={styles.body}>
					{carList.map((car,index) => {
						return (
							<Box className={styles.tr} key={car.id}  >
								<Box className={styles.td}>
									<span>
										{car.number_a}
									</span>
									<span className={styles.number_b}>
										{car.number_b}
									</span>
									<span className={styles.name}>
										({car.name})
									</span>
								</Box>
								{[...Array(daySpan * 2)].map((_, i) => {
									return (
										<Box className={styles.td} key={i}>
											{ }
										</Box>
									)
								})}
								<Box className={styles.scheduleBox}>
									{scheduleList[index]?.map((item) => {
										return (
											<Box className={styles.schedule} key={item.id}
												style={{
													left: `${Number(calcDate(item.startDate,baseDate )) * 100}px`,
													width: `${Number(calcDate(item.endDate, item.startDate) + 1) * 100}px`
												}}
												>
												
												<Box className={styles.scheduleInfo}>
													<p className={styles.name}>{item.familyNameKana} {item.firstNameKana}</p>
													<Box className={styles.time}>
														<div className={styles.start}>
															<p>出発</p>
															<p>{putDate(item.startDate)}</p>
															{item.startTime}
														</div>
														<div className={styles.end}>
															<p>返却</p>
															<p>{putDate(item.endDate)}</p>
															{item.endTime}
														</div>
													</Box>
												</Box>
											</Box>
										)
									})}
								</Box>
							</Box>
						)
					})}

				</Box>
			</Box>
		</>
	)
}
