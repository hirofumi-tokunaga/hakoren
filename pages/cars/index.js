import sqlite3 from 'sqlite3';
import Meta from 'components/meta'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';


const selectAll = (db, query) => {
	return new Promise((resolve, reject) => {
		db.all(query, (err, rows) => {
			if (err) return reject(err)
			return resolve(rows)
		});
	});
};
export async function getStaticProps() {
	const db = new sqlite3.Database('database/cars.db');
	const data = await selectAll(db, "select * from cars;")
	db.close();
	return { props: { data } }
}

export default function cars({ data }) {
	const handleSubmit = (event) => {
		event.preventDefault();
		let data = new FormData(event.currentTarget);
		axios.post("/api/put", {
			number: data.get('numberInput'),
			name: data.get('nameInput'),
		}).then((res) => {
			window.location.reload()
		})
	}

	return (
		<>
			<Meta/>
			<ul>
				{data.map((item, index) => (
					<li key={index} >
						{`${item.id} - ${item.number} - ${item.name}`}
					</li>
				) )}
        {console.log(data)}
			</ul>
			<Box component="form" noValidate onSubmit={handleSubmit} >
				<Grid item xs={12}>
					<TextField
						required
						name="numberInput"
						label="ナンバー"
						type="text"
						id=""
					/>
					<TextField
						required
						name="nameInput"
						label="名称"
						type="text"
						id=""
					/>
				</Grid>
				<Button
					type="submit"
					variant="contained"
					sx={{ mb: 2 }}
				>登録</Button>
			</Box>
		</>
	)
}
