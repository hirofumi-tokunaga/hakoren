
import { NextApiRequest, NextApiResponse } from "next"
import { open } from "sqlite"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const method = req.method;
	console.log(method)
	switch (method) {
		case "POST": {
			const {number, name } = req.body;
			const sqlite3 = require("sqlite3");

			// const db = new sqlite3.Database("database/cars.db");
			const db = await open(
				{filename:'database/cars.db',driver:sqlite3.Database}
			)
			const result = await db.run(
				"insert into cars(number,name) values(?,?)",
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
};
