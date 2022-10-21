import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function TimePicker({ time, setTime }) {
	const handleChange = (event) => {
		setTime(event.target.value)
	}
	return (
		<Select
			value={time}
			onChange={handleChange}
		>
			<MenuItem value="08:30">08:30</MenuItem>
			<MenuItem value="09:00">09:00</MenuItem>
			<MenuItem value="09:30">09:30</MenuItem>
			<MenuItem value="10:00">10:00</MenuItem>
			<MenuItem value="10:30">10:30</MenuItem>
			<MenuItem value="11:00">11:00</MenuItem>
			<MenuItem value="11:30">11:30</MenuItem>
			<MenuItem value="12:00">12:00</MenuItem>
			<MenuItem value="12:30">12:30</MenuItem>
			<MenuItem value="13:00">13:00</MenuItem>
			<MenuItem value="13:30">13:30</MenuItem>
			<MenuItem value="14:00">14:00</MenuItem>
			<MenuItem value="14:30">14:30</MenuItem>
			<MenuItem value="15:00">15:00</MenuItem>
			<MenuItem value="15:30">15:30</MenuItem>
			<MenuItem value="16:00">16:00</MenuItem>
			<MenuItem value="16:30">16:30</MenuItem>
			<MenuItem value="17:00">17:00</MenuItem>
			<MenuItem value="17:30">17:30</MenuItem>
			<MenuItem value="18:00">18:00</MenuItem>
			<MenuItem value="18:30">18:30</MenuItem>
			<MenuItem value="19:00">19:00</MenuItem>
			<MenuItem value="19:30">19:30</MenuItem>
			<MenuItem value="20:00">20:00</MenuItem>
			<MenuItem value="20:30">20:30</MenuItem>
		</Select>
	)
}
