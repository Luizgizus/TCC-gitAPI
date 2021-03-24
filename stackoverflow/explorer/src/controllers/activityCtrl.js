const Request = require("../util/request")
const Activity = require("../models/activity")
const _ = require("lodash")
const Moment = require('moment')

class DefaultActivity {
    constructor() {
        this.activityType = null
        this.title = null
        this.description = null
        this.createdAt = null
    }
}

class ActivityCtrl {
    constructor(pool) {
        this.request = new Request()
        this.activity = new Activity(pool)
    }

    async getActivity(idsUser) {
        let activity = new DefaultActivity();
        const activities = []
        let hasNext = null;
        let page = 0;

        do {
            page++;
            const url = `${process.env.URL_API}/${idsUser}/network-activity?page=${page}&key=U4DMV*8nvpm3EOpvf69Rxw((&pagesize=100&pagesize=100`;
            const response = await this.request.get(url);

            const data = response.body;
            hasNext = data.has_more;

            for (let i = 0; i < data.items.length; i++) {
                activity.activityType = data.items[i].activity_type
                activity.title = data.items[i].title
                activity.description = data.items[i].description
                activity.createdAt = data.items[i].creation_date

                activities.push(activity)

                activity = new DefaultActivity()
            }
        } while (hasNext);

        return activities;
    }

    async saveActivities(activities, idUser) {
        for (let i = 0; i < activities.length; i++) {
            activities[i].createdAt = Moment(new Date(activities[i].createdAt * 1000)).format("YYYY-MM-DD HH:mm:ss")
            this.activity.insertActivity(activities[i], idUser)
        }
    }

}

module.exports = ActivityCtrl;
