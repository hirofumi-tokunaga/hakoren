import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function TimePicker({ time, setTime }) {
	return (
		<Select
			value={time}
			onChange={(time) => setTime(time)}
		>
			<MenuItem value="0:00">0:00</MenuItem>
			<MenuItem value="0:30">0:30</MenuItem>
			<MenuItem value="1:00">1:00</MenuItem>
		</Select>
	)
}
