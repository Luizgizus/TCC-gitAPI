class Tag {
    constructor(pool) {
        this.pool = pool
    }

    async insertTag(tag, idUser) {
        const queryInsertTag = `` +
            `INSERT ` +
            `INTO stackoverflow.tag ` +
            `(userFK, name) VALUES ` +
            `(?, ?)`

        return await this.pool.query(queryInsertTag, [idUser, tag.name])
    }
}

module.exports = Tag;
