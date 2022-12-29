import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import _ from 'lodash'
import "react-datepicker/dist/react-datepicker.css"

const years = _.range(getYear(new Date()), getYear(new Date()) + 2, 1)
const months = Array.from(Array(12).keys())

export default function DatePicker_Custom({ date,setDate,checkDate,setCheckDate,start}) {
	registerLocale('ja', ja);
	const inputDateCheck = () => {

	}
	return (
		<DatePicker
			dateFormat="yyyy年MM月dd日"
			locale="ja"
			selected={ date}
			onChange={selectedDate => {
				if (start) {
					if (selectedDate > checkDate) {
						setCheckDate(selectedDate)
					}
				} else {
					if (selectedDate < checkDate) {
						setCheckDate(selectedDate)
					}
				}
				setDate(selectedDate || Today)
			}}
			renderCustomHeader={({
				date,
				changeYear,
				changeMonth,
				decreaseMonth,
				increaseMonth,
				prevMonthButtonDisabled,
				nextMonthButtonDisabled
			}) => (
				<div>
					<button
						onClick={decreaseMonth}
						disabled={prevMonthButtonDisabled}
					>
						{`<`}
					</button>
					<select
						value={getYear(date)}
						onChange={({ target: { value } }) => changeYear(value)}
					>
						{years.map((option) => (
							<option key={option} value={option}>
								{option}年
							</option>
						))}
					</select>
					<select
						value={getMonth(date)}
						onChange={({ target: { value } }) => changeMonth(value)}
					>
						{months.map((option) => (
							<option key={option} value={option}>
								{option + 1}月
							</option>
						))}
					</select>
					<button
						onClick={increaseMonth}
						disabled={nextMonthButtonDisabled}
					>
						{`>`}
					</button>
				</div>
			)}
		/>
	)
}
