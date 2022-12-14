import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import _ from 'lodash'
import "react-datepicker/dist/react-datepicker.css"

const years = _.range(getYear(new Date()), getYear(new Date()) + 2, 1)
const months = Array.from(Array(12).keys())

export default function DatePicker_Custom({ date,setDate}) {
	registerLocale('ja', ja);
	return (
		<DatePicker
			dateFormat="yyyy年MM月dd日"
			locale="ja"
			selected={ date}
			onChange={selectedDate => { setDate(selectedDate || Today) }}
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
						onClose={false}
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
						onClose={false}
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
