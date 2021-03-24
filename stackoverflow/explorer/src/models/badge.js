class Badge {
    constructor(pool) {
        this.pool = pool
    }

    async insertBadge(badge, idUser) {
        const queryInsertBadge = `` +
            `INSERT ` +
            `INTO stackoverflow.badge ` +
            `(userFK, rank, count, name, type) VALUES ` +
            `(?, ?, ?, ?, ?)`

        return await this.pool.query(queryInsertBadge, [idUser, badge.rank, badge.awardCount, badge.name, badge.badgeType])
    }
}

module.exports = Badge;
