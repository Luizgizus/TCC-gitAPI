require("dotenv").config();
const cluster = require('cluster');

const ApiSonaQualityGate = require("./src/apiSonaQualityGate")

class Application {
	constructor() {
		this.apiSonaQualityGate = new ApiSonaQualityGate();

		this.start()
	}


	async start() {
		global.queueToGetMetrics = []

		if (cluster.isMaster) {
			const worker = cluster.fork()

			await this.apiSonaQualityGate.getFeatures(worker);
		} else {
			process.on("message", this.apiSonaQualityGate.getMetricsAndSave.bind(this.apiSonaQualityGate))
		}
	}
}

new Application()