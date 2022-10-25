import { useEffect, useState } from 'react'
import { getDb, addData, getSortData } from 'components/api'

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
import styles from 'styles/view.module.scss'


export default function View() {
	const Today = new Date()
	const [loading, setLoading] = useState(false)
	const [carList, setCarList] = useState([])

	const transDate = (dt, i = 0) => {
		dt.setDate(dt.getDate() + (i) )
		var dd = dt.getDate()
		var mm = dt.getMonth() + 1
		// var yyyy = date.getFullYear()
		return `${mm} / ${dd}`
	}
	useEffect(() => {
		async function init() {
			setCarList(await getSortData('carlist','number_b',true))
		}
		init();
	}, [])
	return (
		<>
			<Loading loading={loading} />
			<h2>稼働表</h2>
			<Box className={styles.table} >
				<Box className={styles.thead}>
					<Box className={styles.tr}>
						<Box className={styles.th}>
							{}
						</Box>
						<Box className={styles.th}>
							{transDate(Today)}
						</Box>
						{[...Array(9)].map((_, i) => {
							return(
								<Box className={styles.th} key={i}>
									{transDate(Today,1)}
								</Box>
							)
						})}
					</Box>
				</Box>
				<Box className={styles.body}>
					{carList.map((car) => {
						return (
							<Box className={styles.tr}>
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
								{[...Array(20)].map((_, i) => {
									return (
										<Box className={styles.td} key={i}>
											{ }
										</Box>
									)
								})}
							</Box>
						)
					})}

				</Box>
			</Box>
		</>
	)
}
