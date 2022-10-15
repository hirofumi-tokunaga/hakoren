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
export async function postCars(){
	// const db = new sqlite3.Database("database/cars.db");
	// const number = data.get('numberInput')
	// const name = data.get('nameInput')
	// db.run(
	// 	"insert into cars(number,name) values(?,?);",
	// 	number,
	// 	name,
	// );
	// db.close();
	
}
export default function cars({ data }) {
	const handleSubmit = async (event) => {
		event.preventDefault();
		let data = new FormData(event.currentTarget);
		let number = data.get('numberInput')
		let name = data.get('nameInput')

		// var params = new URLSearchParams()
		// params.append('number', number)
		// params.append('name', name)
		// const res = await axios.post('/api/postcars', params)
		// 	.then((res) => {
		// 		window.location.reload()
		// 	})
		let postingData = JSON.stringify({
			number: data.get('numberInput'),
			name: data.get('nameInput')
		})
	
		const respons = await axios.post("/api/postcars",postingData,
		{headers:{"Content-Type" : "application/json"}}
		)
		.then((respons) => {
			window.location.reload()
		})
		.catch((err) => {
			if (err.response){
				console.log(err.response.data)
				console.log(err.response.status)
				console.log(err.response.statusText)
				console.log(err.response.headers)

			}else if(err.request){
				console.log(err.request)

			}else{
				console.log('error',error.message)
			}
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
