import { useEffect, useState } from 'react'
import { getDb, getId, deleteData, setData, addData, getSortData } from 'components/api'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


import Loading from 'components/loading'
import DatePicker_Custom from 'components/datepicker-custom'
import TimePicker from 'components/timepicker'
import styles from 'styles/input.module.scss'


export default function Input() {
	const Today = new Date()
	const [startDate, setStartDate] = useState(Today)
	const [endDate, setEndDate] = useState(Today)
	const [startTime, setStartTime] = useState()
	const [endTime, setEndTime] = useState()
	const [loading,setLoading] = useState(false)

	const handleSchedule = async (event) => {

	}
	const handlePersonalData = async (event) => {
		event.preventDefault();
		let data = new FormData(event.currentTarget);
		let id = "testCarId"
		let object = {
			firstName: data.get('firstName'),
			familyName: data.get('familyName'),
			firstNameKana: data.get('firstNameKana'),
			familyNameKana: data.get('familyNameKana'),
			tel: data.get('tel'),
			gender: data.get('gender'),
			startDate: data.get('startDate'),
			startTime: data.get('startTime'),
			endDate: data.get('endDate'),
			endTime: data.get('endTime'),
			carId: id,
		}
		setLoading(true)
		await addData('bookinginfo', object)
		setLoading(false)
	}
	const handleChange = (event) => {
		setSelectClass(event.target.value)
	}
	return (
		<>
			<h2>ご予約</h2>
			<Box className={styles.schedule} component="" noValidate onSubmit={handleSchedule} >
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
					type="submit"
					variant="contained"
					sx={{ mb: 2 }}
				>在庫検索</Button>
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
