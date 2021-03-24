const Request = require("../util/request")
const User = require("../models/user")
const _ = require("lodash")

class UserCtrl {
    constructor(pool) {
        this.request = new Request()
        this.user = new User(pool)
    }

    async getUserNamesAleatory() {
        try {
            const url = process.env.URL_GIT_API_GRAFQL;

            let stringQuery = this.user.getStringAleatoryUsers();

            let body = {
                query: stringQuery,
                variables: {},
            };

            let users = []

            while (users.length <= process.env.QTD_USERS) {
                const response = await this.request.post(url, body);
                body.query = this.user.getStringAleatoryUsers();
                if (response.statusCode === 200) {
                    const respUsers = response.body.data.search.nodes;
                    for (let i = 0; i < respUsers.length; i++) {
                        if (!_.isEmpty(respUsers[i].owner)) {
                            users.push(respUsers[i].owner)
                        }
                    }
                } else {
                    console.log(response);
                    console.log(response.statusCode);
                    console.log("SOME ERROR APPEARED");
                }
            }

            return users;
        } catch (err) {
            console.log(err);
        }
    }

    async saveUser(user) {
        if (!_.isEmpty(user)) {
            if (user.name === null) {
                user.name = user.login
            }
        }
        const insertedUser = await this.user.insertUser(user)

        return insertedUser.insertId
    }


    async checkHasUser(userLogin) {
        const user = await this.user.checkHasUser(userLogin)

        return user
    }

}

module.exports = UserCtrl;
