const Request = require("../util/request")
const User = require("../models/user")
const _ = require("lodash")
const Moment = require('moment')
const cheerio = require('cheerio')

class UserCtrl {
    constructor(pool) {
        this.request = new Request()
        this.user = new User(pool)

        this.StackPtSite = "pt.stackoverflow"
        this.StackEngSite = "stackoverflow"
    }

    async getUser(idsUser, site) {
        try {
            const user = {
                idAccountStackOverflow: null,
                idUserStackOverflow: null,
                name: null,
                reputation: null,
                createdAt: null,
                link: null,
                site: null
            };

            let url = `${process.env.URL_API}/${idsUser}?&key=U4DMV*8nvpm3EOpvf69Rxw((&pagesize=100&site=${this.StackEngSite}`;
            let response = await this.request.get(url);
            let data = response.body.items.pop();

            if (!data || _.isEmpty(data)) {
                user.site = this.StackPtSite
                url = `${process.env.URL_API}/${idsUser}?&key=U4DMV*8nvpm3EOpvf69Rxw((&pagesize=100&site=${this.StackPtSite}`;
                response = await this.request.get(url);
                data = response.body.items.pop();
            } else {
                user.site = this.StackEngSite
            }

            if (data && !_.isEmpty(data)) {
                user.idAccountStackOverflow = data.account_id;
                user.idUserStackOverflow = data.user_id;
                user.name = data.display_name;
                user.reputation = data.reputation;
                user.createdAt = data.creation_date
                user.link = data.link
            }

            return user;
        } catch (err) {
            console.log(err);
        }
    }

    async crawlGitHubLink(link) {
        let gitHubLink = null

        let response = await this.request.get(link);

        const $ = cheerio.load(response.body);
        const allAnchors = $('.fl1 > a')

        for (const key in allAnchors) {
            if (allAnchors[key].attribs) {
                const href = allAnchors[key].attribs.href
                if (href.indexOf("github") !== -1) {
                    gitHubLink = href
                    break
                }
            }
        }

        return gitHubLink
    }

    async saveUser(user, githubLink) {
        user.createdAt = Moment(new Date(user.createdAt * 1000)).format("YYYY-MM-DD HH:mm:ss")
        const insertedUser = await this.user.insertUser(user, githubLink)

        return insertedUser.insertId
    }

    async checkHasUserById(idUser) {
        const user = await this.user.checkHasUserById(idUser)
        return user
    }

}

module.exports = UserCtrl;
