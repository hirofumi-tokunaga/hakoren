import { useEffect, useState } from 'react'
import { getDb, addData } from 'components/api'
import Draggable from 'react-draggable'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import Loading from 'components/loading'
import DatePicker_Custom from 'components/datepicker-custom'
import TimePicker from 'components/timepicker'
import MainHead from 'components/mainhead'
import styles from 'styles/view.module.scss'

const putDate = (dateStr, i = 0) => {
	let yy = dateStr.slice(0, 4)
	let mm = dateStr.slice(4, 6)
	let dd = dateStr.slice(6, 8)
	let newDate = new Date(yy, mm - 1 ,Number(dd) + i, 1, 0, 0)
	let y = newDate.getFullYear();
	let m = ("00" + (newDate.getMonth() + 1) ).slice(-2);
	let d = ("00" + newDate.getDate()).slice(-2);
	return `${m} / ${d}`
}
const getDateString = (date) => {
	let y = date.getFullYear();
	let m = ("00" + (date.getMonth() + 1)).slice(-2);
	let d = ("00" + date.getDate()).slice(-2);
	let result = y + m + d;
	return result;
}
const calcDate = (dateStr1, dateStr2) => {
	let yy1 = dateStr1.slice(0, 4)
	let mm1 = dateStr1.slice(4, 6)
	let dd1 = dateStr1.slice(6, 8)
	let dt1 = new Date(yy1, mm1 - 1, dd1, 1, 0, 0)
	let yy2 = dateStr2.slice(0, 4)
	let mm2 = dateStr2.slice(4, 6)
	let dd2 = dateStr2.slice(6, 8)
	let dt2 = new Date(yy2, mm2 - 1, dd2, 1, 0, 0)
	let sa = (dt1 - dt2) / 86400000
	return sa
}
const calcDateToNum = (dateStr, calcNum) => {
	let yy = dateStr.slice(0, 4)
	let mm = dateStr.slice(4, 6)
	let dd = dateStr.slice(6, 8)
	let dt = new Date(yy, mm - 1, Number(dd) + calcNum, 1, 0, 0)
	return getDateString(dt)
}

export default function View() {
	const Today = getDateString(new Date())
	const daySpan = 10
	const [loading, setLoading] = useState(false)
	const [carList, setCarList] = useState([])
	const [scheduleList,setScheduleList] = useState([])
	const [bookingInfo, setBookingInfo] = useState([])
	const [baseDate, setBaseDate] = useState(getDateString(new Date()))
	const [posData, setPosData] = useState([])
	// handleDrag = (e, ui) => {
	// 	const { x, y } = this.state.deltaPosition;
	// 	this.setState({
	// 		deltaPosition: {
	// 			x: x + ui.deltaX,
	// 			y: y + ui.deltaY,
	// 		}
	// 	});
	// };


	// const dragHandlers = { onStart: this.onStart, onStop: this.onStop }


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
			initPos()
		}
		init();
	}, [])
	const onControlledDrag = (e, position, itemId) => {
		const { x, y } = position;
		console.log("onDrag", x, y, itemId)
		// setDragState({ controlledPosition: { x, y } });
		// const data = [
		// 	[{ x: "10", y: "20" }, { x: "100", y: "200" }],
		// 	[{ x: "30", y: "60" }, { x: "150", y: "300" }],
		// ]
		setPosData((prevState) =>
			prevState.map(
				(obj) => (
					obj.id === itemId ? { id: obj.id, x: position.x, y: position.y } : obj
				))
		)
	}
	const initPos = () => {
		if (carList && scheduleList) {
			carList.map((car,index) => (
					scheduleList[index].map((sche,index2) => {
						setPosData((prevState) => [...prevState, { id: sche.id, x: 0, y: index * 63 }])
						console.log("posData",posData)
					})
				)
			)
		}
	}
	return (
		<>
			<Loading loading={loading} />
			<MainHead title="稼働表" />
			<Box className={styles.buttons}>
				<Button onClick={() => setBaseDate(calcDateToNum(baseDate, -10))} >
					<KeyboardDoubleArrowLeftIcon/>
					10日
				</Button>
				<Button onClick={() => setBaseDate(calcDateToNum(baseDate, -1))}>
					<ArrowBackIosIcon style={{ fontSize: "medium" }} />
					1日
				</Button>
				<Button onClick={() => setBaseDate(calcDateToNum(baseDate, 1))}>
					1日
					<ArrowForwardIosIcon style={{ fontSize: "medium" }} />
				</Button>
				<Button onClick={() => setBaseDate(calcDateToNum(baseDate, 10))} >
					10日
					<KeyboardDoubleArrowRightIcon />
				</Button>
			</Box>
			<Box className={styles.table} style={{ width: `${daySpan * 100 + 180}px ` }}>
				<Box className={styles.thead}>
					<Box className={styles.tr}>
						<Box className={styles.th}>
							{}
						</Box>
						{[...Array(daySpan)].map((_, i) => {
							return(
								<Box className={styles.th} key={i}>
									{putDate(baseDate,i)}
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

							</Box>
						)
					})}
					<Box className={styles.scheduleBox}>

						{carList.map((car, index) => {
							return (
								<>
									{scheduleList[index]?.map((item, index2) => {

										return (
											<>
												<Draggable
													position={
														{
															x: posData?.filter((item2) => item2.id === item.id)[0].x,
															y: posData?.filter((item2) => item2.id === item.id)[0].y
														}
													}
													onDrag={(e, position) => {
														onControlledDrag(e, position, item.id)
													}}
													axis="y"
													grid={[63, 63]}
													// defaultPosition={{ x: 0, y: index * 63 }}
													key={"3333333333333333333333333333"}

													>
													<Box className={styles.schedule}
														style={{
															left: `${Number(calcDate(item.startDate, baseDate)) * 100}px`,
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
												</Draggable>
											</>
										)
									})}
								</>
							)
						})}
					</Box>
				</Box>
			</Box>
		</>
	)
}
