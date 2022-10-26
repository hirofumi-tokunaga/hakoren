import { useEffect, useState } from 'react'
import { getDb, addData } from 'components/api'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Loading from 'components/loading'
import DatePicker_Custom from 'components/datepicker-custom'
import TimePicker from 'components/timepicker'
import styles from 'styles/input.module.scss'
import MainHead from 'components/mainhead'

export default function Input() {
	const Today = new Date()
	const [startDate, setStartDate] = useState(Today)
	const [endDate, setEndDate] = useState(Today)
	const [startTime, setStartTime] = useState("08:30")
	const [endTime, setEndTime] = useState("20:30")
	const [loading,setLoading] = useState(false)
	const [scheduleOk,setScheduleOk] = useState(false)
	const [carList, setCarList] = useState([])
	const [okCar, setOkCar] = useState([])
	const [selectCarId,setSelectCarId] = useState()
	const [isSearch, setIsSearch] = useState(false)

	const handlePersonalData = async (event) => {
		event.preventDefault();
		let data = new FormData(event.currentTarget);
		if (inputCheck(data)) {
			let object = {
				firstName: data.get('firstName'),
				familyName: data.get('familyName'),
				firstNameKana: data.get('firstNameKana'),
				familyNameKana: data.get('familyNameKana'),
				tel: data.get('tel'),
				gender: data.get('gender'),
				startDate: transDate(startDate),
				startTime: startTime,
				endDate: transDate(endDate),
				endTime: endTime,
				carId: selectCarId,
			}
			setLoading(true)
			handleDateCheck()
			if(scheduleOk){
				await addData('bookinginfo', object).then(() => {
					setStartDate(Today)
					setEndDate(Today)
					setStartTime("08:30")
					setEndTime("20:30")
				})
			}else{
				alert("予約が重なってしまい、予約が出来ませんでした")
			}
			setLoading(false)
		} else {
			alert("入力項目に不備があります")
		}
	}
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
						if(!(( endDate < currentStart )
						|| ( currentEnd < startDate ))){
							carOK = false
						}
					}
				})
				if (carOK) {
					okCarList.push(
						car.id
					)
					newItems.push(carList.filter((item) => item.id === car.id)[0])
					setScheduleOk(true)
				}
			})
			setOkCar(newItems)
		})
	}
	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist'))
		}
		init();
	}, [])
	useEffect(() => {
		async function init() {
			setCarList(await getDb('carlist'))
			handleDateCheck()
		}
		init();
	}, [startDate,endDate])
	return (
		<>
			<Loading loading={loading}/>
			<MainHead title="ご予約" />
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
				<Button
					className={styles.btn}
					variant="contained"
					sx={{ mb: 2 }}
					onClick={() => {
						handleDateCheck()
						setIsSearch(true)
					}}
				>在庫検索</Button>
				<p style={scheduleOk ? { color: "#0000ff" } : { color: "#ff0000" }}>{isSearch &&(scheduleOk ? "以下の在庫が在ります" : "在庫がありません")}</p>
				<RadioGroup>
					<ul className={styles.cardata}>
						{isSearch && (okCar.map((item) => {
							return (
								<li key={item.id}>
									<FormControlLabel value={item.id} control={<Radio />} label={
										<>
											<label  className={styles.td}>
												{item.name}
											</label>
											<label className={styles.td}>
												{item.number_a}
											</label>
											<label className={styles.td}>
												{item.number_b}
											</label>
										</>
									}
										onChange={() => setSelectCarId(item.id)}
									/>
								</li>
							)}
						))}
					</ul>
				</RadioGroup>
			</Box>

			<Box className={styles.personalData} component="form" noValidate onSubmit={handlePersonalData} >
				<Box className={`${styles.box} ${styles.name}`}>
					<label>お名前</label>
					<TextField label="性" InputLabelProps={{ shrink: true }} name="familyName" />
					<TextField label="名" InputLabelProps={{ shrink: true }} name="firstName" />
				</Box>
				<Box className={`${styles.box} ${styles.kana}`}>
					<label>お名前（カナ）</label>
					<TextField label="セイ" InputLabelProps={{ shrink: true }} name="familyNameKana" />
					<TextField label="メイ" InputLabelProps={{ shrink: true }} name="firstNameKana" />
				</Box>
				<Box className={`${styles.box} ${styles.tel}`}>
					<label>ご連絡先</label>
					<TextField label="電話番号" InputLabelProps={{ shrink: true }} name="tel" />
				</Box>
				<Box className={`${styles.box} ${styles.gender}`}>
					<label>性別</label>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="男性"
						name="gender"
						style={{display:"inline-block"}}
					>
						<FormControlLabel value="男性" control={<Radio />} label="男性" />
						<FormControlLabel value="女性" control={<Radio />} label="女性" />
						<FormControlLabel value="その他" control={<Radio />} label="その他" />
					</RadioGroup>
				</Box>
				<Button
					className={styles.btn}
					type="submit"
					variant="contained"
					sx={{ mb: 2 }}
				>予約する</Button>
			</Box>
		</>
	)
}
