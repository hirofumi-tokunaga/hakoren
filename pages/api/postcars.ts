
import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
	const method = req.method;

	switch (method) {
		case "POST": {
			const {id, number, name } = req.body;
			const sqlite3 = require("sqlite3");
			const db = new sqlite3.Database("database/cars.db");
			const result = db.run(
				"insert into cars(number,name) values(?,?,?)",
				id,
				number,
				name,
			);
			res.status(200).json({ result });
			break;
		}
		default: {
			res.status(403).end();
		}
	}
	console.log("kitakita")
};
