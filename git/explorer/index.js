require("dotenv").config();

const ApiGitHub = require("./src/apiGitHub")

const UserCtrl = require("./src/controllers/userCtrl")

class Application {
	constructor() {
		this.apiGitHub = new ApiGitHub();
		this.userCtrl = new UserCtrl()

		this.start()
		//this.manualTest()
	}

	async start() {
		console.log("getting user names")
		const usersNames = await this.userCtrl.getUserNamesAleatory();

		for (let i = 0; i < usersNames.length; i++) {
			try {
				console.log(`getting ${i}-${usersNames[i].login} user features`)
				console.log(usersNames[i])
				await this.apiGitHub.getFeatures(usersNames[i]);
			} catch (err) { console.log(err) }
		}

		console.log("cabo")
	}

	async manualTest() {
		console.log(`getting ${1}-${'alash3al'} user features`)
		await this.apiGitHub.getFeatures(
			{
				"name": "Mohammed Al Ashaal",
				"login": "alash3al",
				"id": "MDQ6VXNlcjMwNzgyOTI=",
				"email": "m7medalash3al@gmail.com",
				"createdAt": "2012-12-19T06:03:31Z",
				"followers": {
					"totalCount": 431
				}
			}
		)

		console.log("cabo")
	}
}

new Application()