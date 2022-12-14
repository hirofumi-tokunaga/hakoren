import { useEffect, useState } from 'react'
import { getDb, upDate } from 'src/components/api'
import Draggable from 'react-draggable'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import Loading from 'src/components/loading'
import MainHead from 'src/components/mainhead'
import styles from 'src/styles/view.module.scss'

const putDate = (dateStr, i = 0) => {
	let yy = dateStr.slice(0, 4)
	let mm = dateStr.slice(4, 6)
	let dd = dateStr.slice(6, 8)
	let newDate = new Date(yy, mm - 1 ,Number(dd) + i, 1, 0, 0)
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
	const daySpan = 10
	const baseHeight = 62
	const [loading, setLoading] = useState(false)
	const [carList, setCarList] = useState([])
	const [scheduleList,setScheduleList] = useState([])
	const [bookingInfo, setBookingInfo] = useState([])
	const [baseDate, setBaseDate] = useState(getDateString(new Date()))
	const [posData, setPosData] = useState([])

	const setCarSchedule = () => {
		let carToSchedule = []
		carList?.map((car) => (
			carToSchedule.push(bookingInfo.filter((item) => item.carId === car.id))
		))
		setScheduleList(carToSchedule)
	}
	const initPos = () => {
		if (carList && scheduleList) {
			carList?.map((car,index) => (
					scheduleList[index]?.map((sche,index2) => {
						setPosData((prevState) => [...prevState, { id: sche.id, x: 0, y: index * baseHeight }])
					})
				)
			)
		}
	}
	const onControlledDrag = (e, position, itemId) => {
		const hit1 = posData.filter((item) => item.y === position.y )
		const hit2 = hit1.filter((item) => item.id !== itemId)
		const hit3 = hit2.map((item) => {
			return(item.id)
		})
		const myInfo = bookingInfo.filter((item) => item.id === itemId)[0]
		let flag = true
		hit3?.map((target) => {
			const tgtInfo = bookingInfo.filter((item) => item.id === target)[0]
			if(!(( tgtInfo.endDate < myInfo.startDate )
				|| ( myInfo.endDate < tgtInfo.startDate ))){
				flag = false
			}
		})
		if(flag){
			setPosData((prevState) =>
				prevState.map(
					(obj) => (
						obj.id === itemId ? { id: obj.id, x:0, y: position.y } : obj
					))
			)

		}
	}
	async function onDrop(e,id){
		alert("?????????????????????");
		const carIndex = posData?.filter((item) => item.id === id)[0]?.y / baseHeight 

		console.log(carIndex)
		await upDate("bookinginfo",id,"carId",carList[carIndex].id)
	}
	const scheduleCheck = (itemA,itemB) => {
		const myInfo = bookingInfo.filter((item) => item.id === itemA)
		itemB.map((target) => {
			const tgtInfo = bookingInfo.filter((item) => item.id === target)
			if(!(( tgtInfo.endDate < myInfo.startDate )
				|| ( myInfo.endDate < tgtInfo.startDate ))){
				return false
			} else {
				return true
			}
		})
	}
	useEffect(() => {
		setCarSchedule()
	}, [bookingInfo])
	useEffect(() => {
		initPos()
	}, [scheduleList])

	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist', 'number_b', true))
			setBookingInfo(await getDb('bookinginfo'))
			setCarSchedule()
		}
		init()
	}, [])
	return (
		<>
			<Loading loading={loading} />
			<MainHead title="?????????" />
			<Box className={styles.buttons}>
				<Button onClick={() => setBaseDate(calcDateToNum(baseDate, -10))} >
					<KeyboardDoubleArrowLeftIcon/>
					10???
				</Button>
				<Button onClick={() => setBaseDate(calcDateToNum(baseDate, -1))}>
					<ArrowBackIosIcon style={{ fontSize: "medium" }} />
					1???
				</Button>
				<Button onClick={() => setBaseDate(calcDateToNum(baseDate, 1))}>
					1???
					<ArrowForwardIosIcon style={{ fontSize: "medium" }} />
				</Button>
				<Button onClick={() => setBaseDate(calcDateToNum(baseDate, 10))} >
					10???
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
							<Box className={styles.tr} key={index}  >
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
								<Box key={index}>
									{scheduleList[index]?.map((item, index2) => {

										return (
											<Draggable
												key={index2}
												position={
													{
														x: 0 ,
														y: posData?.filter((item2) => item2.id === item.id)[0]?.y 
													}
												}
												onDrag={(e, position) => {
													onControlledDrag(e, position, item.id )
												}}
												onStop={(e) => {
													onDrop(e, item.id)
												}}
												axis="y"
												grid={[baseHeight, baseHeight]}
												>
												<Box className={styles.schedule}
													style={{
														left: `${Number(calcDate(item.startDate, baseDate)) * 100}px`,
														width: `${Number(calcDate(item.endDate, item.startDate) + 1) * 100}px`
													}}
													key={item.id}

												>
													<Box className={styles.scheduleInfo} key={item.id}>
														<p className={styles.name}>{item.familyNameKana} {item.firstNameKana}</p>
														<Box className={styles.time}>
															<div className={styles.start}>
																<p>??????</p>
																<p>{putDate(item.startDate)}</p>
																{item.startTime}
															</div>
															<div className={styles.end}>
																<p>??????</p>
																<p>{putDate(item.endDate)}</p>
																{item.endTime}
															</div>
														</Box>
													</Box>
												</Box>
											</Draggable>
										)
									})}
								</Box>
							)
						})}
					</Box>
				</Box>
			</Box>
		</>
	)
}
