const Request = require("../util/request")
const Tag = require("../models/tag")
const _ = require("lodash")

class DefaultTag {
    constructor() {
        this.name = null
    }
}

class TagCtrl {
    constructor(pool) {
        this.request = new Request()
        this.tag = new Tag(pool)
    }

    async getTag(idsUser, site) {
        let tag = new DefaultTag();
        const tags = []
        let hasNext = null;
        let page = 0;

        do {
            page++;
            const url = `${process.env.URL_API}/${idsUser}/tags?page=${page}&key=U4DMV*8nvpm3EOpvf69Rxw((&pagesize=100&site=${site}`;
            const response = await this.request.get(url);

            const data = response.body;
            hasNext = data.has_more;

            for (let i = 0; i < data.items.length; i++) {
                tag.name = data.items[i].name

                tags.push(tag)

                tag = new DefaultTag()
            }
        } while (hasNext);

        return tags;
    }

    async saveTags(tags, idUser) {
        for (let i = 0; i < tags.length; i++) {
            this.tag.insertTag(tags[i], idUser)
        }
    }
}

module.exports = TagCtrl;
