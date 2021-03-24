const Request = require("../util/request")
const Comment = require("../models/comment")
const _ = require("lodash")
const Moment = require('moment')

class DefaultComment {
    constructor() {
        this.score = null
        this.createdAt = null
    }
}

class CommentCtrl {
    constructor(pool) {
        this.request = new Request()
        this.comment = new Comment(pool)
    }

    async getComment(idsUser, site) {
        let comment = new DefaultComment();
        const comments = []
        let hasNext = null;
        let page = 0;

        do {
            page++;
            const url = `${process.env.URL_API}/${idsUser}/comments?page=${page}&key=U4DMV*8nvpm3EOpvf69Rxw((&pagesize=100&order=desc&sort=creation&site=${site}`;
            const response = await this.request.get(url);

            const data = response.body;
            hasNext = data.has_more;

            for (let i = 0; i < data.items.length; i++) {
                comment.score = data.items[i].score
                comment.createdAt = data.items[i].creation_date

                comments.push(comment)

                comment = new DefaultComment()
            }
        } while (hasNext);

        return comments;
    }

    async saveComments(comments, idUser) {
        for (let i = 0; i < comments.length; i++) {
            comments[i].createdAt = Moment(new Date(comments[i].createdAt * 1000)).format("YYYY-MM-DD HH:mm:ss")
            this.comment.insertComment(comments[i], idUser)
        }
    }

}

module.exports = CommentCtrl;
