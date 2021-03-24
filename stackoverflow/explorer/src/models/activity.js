class Activity {
    constructor(pool) {
        this.pool = pool
    }

    async insertActivity(activity, idUser) {
        const queryInsertActivity = `` +
            `INSERT ` +
            `INTO stackoverflow.activity ` +
            `(userFK, type, title, description, createdAt) VALUES ` +
            `(?, ?, ?, ?, ?)`

        return await this.pool.query(queryInsertActivity, [idUser, activity.activityType, activity.title, activity.description, activity.createdAt])
    }
}

module.exports = Activity;
