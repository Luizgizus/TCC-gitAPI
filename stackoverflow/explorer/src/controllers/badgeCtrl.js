const Request = require("../util/request")
const Badge = require("../models/badge")
const _ = require("lodash")

class DefaultBadge {
    constructor() {
        this.badgeType = null
        this.awardCount = null
        this.rank = null
        this.name = null
    }
}

class BadgeCtrl {
    constructor(pool) {
        this.request = new Request()
        this.badge = new Badge(pool)
    }

    async getBadge(idsUser, site) {
        let badge = new DefaultBadge();
        const badges = []
        let hasNext = null;
        let page = 0;

        do {
            page++;
            const url = `${process.env.URL_API}/${idsUser}/badges?page=${page}&key=U4DMV*8nvpm3EOpvf69Rxw((&pagesize=100&order=desc&sort=rank&site=${site}`;
            const response = await this.request.get(url);

            const data = response.body;
            hasNext = data.has_more;

            for (let i = 0; i < data.items.length; i++) {
                badge.isAccepted = data.items[i].is_accepted

                badge.badgeType = data.items[i].badge_type
                badge.awardCount = data.items[i].award_count
                badge.rank = data.items[i].rank
                badge.name = data.items[i].name

                badges.push(badge)

                badge = new DefaultBadge()
            }
        } while (hasNext);

        return badges;
    }

    async saveBadges(badges, idUser) {
        for (let i = 0; i < badges.length; i++) {
            this.badge.insertBadge(badges[i], idUser)
        }

    }

}

module.exports = BadgeCtrl;
