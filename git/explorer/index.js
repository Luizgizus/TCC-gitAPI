require("dotenv").config();

const ApiGitHub = require("./src/apiGitHub")

const UserCtrl = require("./src/controllers/userCtrl")

const logins = ["Hispo", "AlexandruDudescu", "premisse", "naums", "Bishwajeet-IAM", "alexm92", "baig0", "ShadowMinhja", "rvetere", "ms-choudhary", "franverona", "rloman", "pvarentsov", "Danieth", "Derry-ukere", "streetweb", "Zarosch", "brianschroer", "Dm1Korneev", "jmoukel", "martincarlin87", "vipinbatchu", "minhnguyen0712", "ricardochl", "toxdes", "jdsz777", "johnbarhorst", "artzub", "egorsmth", "bolasukses", "cypressf", "lexxl", "FollyHermann", "shawntay97", "stavako", "bricka", "stygiansabyss", "alaattinyilmaz", "linxiangjun", "mildsunrise", "tefferson", "icandroid", "panicz", "robotdilife", "moisesjsalmeida", "fretwellian", "alexwaibel", "LucidNinja", "ShreyasZare", "artursmirnov", "Matus-Dubrava", "caldvs", "giri-nitesh", "z-tc", "karan", "mattkingit", "arvilmena", "avinash625", "Ashutosh1292", "Tanktiger", "khaneliman", "ludik0", "gauthemen", "disconcision", "derhass", "parthdesai", "calmjohnson", "sagnibak", "chrisvanopstal", "stephencarr", "Nehasoni988", "shayas", "nathaliaspinula", "lslopes", "luizwbr", "Rangoo94", "Ragadeepthi", "CameronCairns", "dianajoan", "jonbarlo", "morteza-rastgoo", "DevChaudahry78", "HudsonDevBr", "icarumbas", "jasonmcboyd", "sanya-kenneth", "jujogoru", "mribichich", "adiputra22", "bishwanathjha", "rjatguptarg", "Robson16", "alexheslop1", "m0zgen", "bradh43", "akash-goswami", "pulasthi7", "KyleOng", "callicles", "kathiravan07", "liang0204", "amantheshooter", "blaugranaa", "bryceremick", "ahmadjaved97", "akshayagrawal87", "akkis", "fanqisoft", "sarangCV", "heniotierra", "topalavlad", "rjacobskind", "idapgroup", "SpicyPaper", "epsilons", "erdalguzel", "Jamishon", "ghilteras", "vecilije", "justintsui", "MedAmineFouzai", "atirit", "prateekkdev", "Rogue-Knight", "jackrk", "wuelnermartinez", "maxiwoj", "jruz", "ShahKrish", "PiotrIT2015", "pme123", "AbhishekDere", "framalho", "dinamansour83", "deseloper", "bczarny", "rafascripts", "moepman", "dweaver", "v3rm1", "BasWag", "Melvynx", "hajiyevelnur92", "penguindan", "starcoat", "M4xW4n9", "lyndseybrowning", "Knixd", "jenetics", "yucef-ca", "luccab03", "briguyjm", "lindsaycarr", "calren", "igormartins4", "MGYOSBEL", "rrajesh011", "1tbsCyanide", "GeraldWakolbinger", "rizalsidikp", "geobrad", "jpvelez", "kuthedk", "andrew-pelykh", "auralshin", "kikefdez", "doganugur", "Tremus", "coliveiraeti", "karthikcherala", "phellipeandrade", "dimitrinicolas", "lankovova", "leomonsalv", "vineeth-krish", "sanjeeb9853", "ritupal", "shinigamiCZ", "zetagraph", "carlosjs23", "cschreib", "anwaro", "darkfusion90", "akadata", "Diyorbek", "prashanttholia", "sahinmaral", "hermannleboss", "LeManock", "matthewfortier", "HoodDigital", "ritvik7", "etlapale", "stevenmcd", "chetan-jadhav", "LeVraiBartimeus", "phardiiin", "kbefff", "jgevans", "b-rac-c", "zxul767", "heltonitba", "Twiistrz", "miterran", "bordaigorl", "EbubekirPamuk", "piyush9620", "mmartha", "hirenkv", "junkes", "MFukazawa", "Dallas187", "monacoproperty", "apoid", "matbad", "ernsashelly", "mjsamberg", "kasimoz", "nextjedi", "rahnema", "rodrigo-sp17", "bbeamer", "drpain", "choes", "shahank101", "pranshudobhal", "felixbade", "lovepreetkaul", "jekyll2014", "shykln", "ricardo-dlc", "GetRhymes", "nathanstaines", "kumar-devender", "andygjp", "ciaranashton", "borjahen", "nirav90", "cosysuman", "haldron", "UndyingSoul", "tuanva", "thiagoads", "Dagefoerde", "jabr", "selva-krishnan", "tauseefsshah", "cweijan", "ybodson", "skaldesh", "iYonatan", "sandeepparekh", "ahmeddeveloper55", "1806exe", "athiercelin", "gulshannadaph", "rizidoro", "armelk0", "hobbes7878", "ittaMeSem", "konradgnat", "farisfreak", "Dpk45", "vegz78", "AnthonyDS", "jendelel", "umeshmk", "sss-xt1068", "dongjoon-hyun"]

class DeaultUser {
	constructor() {
		this.name = null
		this.login = null
		this.id = "DefaulT ID"
		this.email = "default Email"
		this.createdAt = "2012-12-19T06:03:31Z"
		this.followers = {
			"totalCount": 0
		}
	}
}

class Application {
	constructor() {
		this.apiGitHub = new ApiGitHub();
		this.userCtrl = new UserCtrl()

		// this.start()
		this.manualTest()
	}

	async start() {
		console.log("getting user names")
		// const usersNames = await this.userCtrl.getUserNamesAleatory();

		for (let i = 0; i < logins.length; i++) {
			try {
				const user = new DeaultUser()

				user.login = logins[i]
				user.name = logins[i]

				console.log(`getting ${i}-${user.login} user features`)
				console.log(user)
				await this.apiGitHub.getFeatures(user);
			} catch (err) { console.log(err) }
		}

		console.log("cabo")
	}

	async manualTest() {
		console.log(`getting ${1}-${'dj'} user features`)
		await this.apiGitHub.getFeatures(
			{
				"name": "Dirk Bäumer",
				"login": "dbaeumer",
				"id": "MDQ6VXNlcjE5MzE1OTA=",
				"email": "",
				"url": "https://github.com/dbaeumer",
				"createdAt": "2012-07-06T09:09:15Z",
				"followers": {
					"totalCount": 191
				}
			}
		)

		console.log("cabo")
	}
}

new Application()