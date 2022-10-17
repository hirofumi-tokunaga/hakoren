const selectAll = (db, query) => {
	return new Promise((resolve, reject) => {
		db.all(query, (err, rows) => {
			if (err) return reject(err)
			return resolve(rows)
		});
	});
};
export default async function getCars() {
	console.log(req.body);
	// res.status(200).json({ name: 'John Doe' });
	const method = req.method;
	switch (method) {
		case "POST": {
			const db = new sqlite3.Database('database/cars.db');
			const data = await selectAll(db, "select * from cars;")
			db.close();
			return { props: { data } }
		}
		default: {
			res.status(403).end();
		}
	}
}
