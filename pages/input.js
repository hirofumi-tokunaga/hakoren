import { useEffect, useState } from 'react'

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
import FormLabel from '@mui/material/FormLabel';


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


	const handleSchedule = async (event) => {
		event.preventDefault();
		let data = new FormData(event.currentTarget);
		let name = data.get('nameInput')
		let number = data.get('numberInput')
		let cl = data.get('classInput')
		let object = {
			name: name,
			number: number,
			class: cl
		}
		setLoading(true)
		await addData('carlist', object)
		setNewPost(false)
		setCarList(await getDb('carlist'))
		setCarId(await getId('carlist'))
		sort()
		setLoading(false)
	}
	const handlePersonalData = async (event) => {
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
						<InputLabel className="input-label" shrink={true} >出発日</InputLabel>
						<DatePicker_Custom date={startDate} setDate={setStartDate} />
					</FormControl>
					<FormControl className={styles.time} >
						<InputLabel className="input-label" shrink={true} >出発時刻</InputLabel>
						<TimePicker time={startTime} setTime={setStartTime} />
					</FormControl>
				</Box>
				<Box className={styles.box}>
					<FormControl className={styles.day} >
						<InputLabel className="input-label" shrink={true} >返却日</InputLabel>
						<DatePicker_Custom date={endDate} setDate={setEndDate} />
					</FormControl>
					<FormControl className={styles.time}>
						<InputLabel className="input-label" shrink={true} >返却時刻</InputLabel>
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
					<TextField label="性" InputLabelProps={{ shrink: true }} />
					<TextField label="名" InputLabelProps={{ shrink: true }} />
				</Box>
				<Box className={`${styles.box} ${styles.kana}`}>
					<label>お名前（カナ）</label>
					<TextField label="セイ" InputLabelProps={{ shrink: true }} />
					<TextField label="メイ" InputLabelProps={{ shrink: true }} />
				</Box>
				<Box className={`${styles.box} ${styles.tel}`}>
					<label>ご連絡先</label>
					<TextField label="電話番号" InputLabelProps={{ shrink: true }} />
				</Box>
				<Box className={`${styles.box} ${styles.sex}`}>
					<label>性別</label>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="female"
						name="radio-buttons-group"
						style={{display:"inline-block"}}
					>
						<FormControlLabel value="男性" control={<Radio />} label="男性" />
						<FormControlLabel value="女性" control={<Radio />} label="女性" />
						<FormControlLabel value="その他" control={<Radio />} label="その他" />
					</RadioGroup>
				</Box>
			</Box>
			<Button
				className={styles.btn}
				type="submit"
				variant="contained"
				sx={{ mb: 2 }}
			>予約する</Button>
		</>
	)
}
