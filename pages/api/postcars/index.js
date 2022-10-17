export default async function handler(req, res) {
	console.log(req.body);
	// res.status(200).json({ name: 'John Doe' });
	const method = req.method;
	switch (method) {
		case "POST": {
			const { number, name } = req.body;
			const sqlite3 = require("sqlite3");
			const db = new sqlite3.Database("database/cars.db");
			const result = db.run(
				"insert into cars(number,name) values(?,?)",
				number,
				name,
			);
			res.status(200).json({ result });
			console.log(res.statusMessage);
			break;
		}
		default: {
			res.status(403).end();
		}
	}
	return <p>aaaaaaaaaaaa</p>
}
