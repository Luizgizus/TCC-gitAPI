require("dotenv").config();


const ApiStackOverflow = require("./src/apiStackOverflow")

class Application {
	constructor() {
		this.apiStackOverflow = new ApiStackOverflow();
		this.start()
	}

	async start() {
		const idsTryed = {};

		for (let i = 0; i < process.env.QTD_USERS; i++) {
			try {
				let id = null
				while (true) {
					id = parseInt(Math.random() * 15442026);
					if (!idsTryed[id]) {
						idsTryed[id] = true;
						break;
					}
				}
				console.log(`${i}° tring id ${id}`);
				const isAllRigth = await this.apiStackOverflow.getFeatures(id);

				if (!isAllRigth) {
					i--
				}
				console.log(`cabo`);
			} catch (err) {
				console.log(err)
			}
		}
	}
}

new Application()
