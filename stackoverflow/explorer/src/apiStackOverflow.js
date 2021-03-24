const _ = require("lodash");

const ActivityCtrl = require("./controllers/activityCtrl");
const AnswerCtrl = require("./controllers/answerCtrl");
const BadgeCtrl = require("./controllers/badgeCtrl");
const CommentCtrl = require("./controllers/commentCtrl");
const QuestionCtrl = require("./controllers/questionCtrl");
const TagCtrl = require("./controllers/tagCtrl");
const UserCtrl = require("./controllers/userCtrl");

const MysqlService = require("../dataBase/MySQLService");


class ApiStackOverflow {
    constructor() {
        this.pool = MysqlService.getPool()
        this.activityCtrl = new ActivityCtrl(this.pool)
        this.answerCtrl = new AnswerCtrl(this.pool)
        this.badgeCtrl = new BadgeCtrl(this.pool)
        this.commentCtrl = new CommentCtrl(this.pool)
        this.questionCtrl = new QuestionCtrl(this.pool)
        this.tagCtrl = new TagCtrl(this.pool)
        this.userCtrl = new UserCtrl(this.pool)

    }

    async getFeatures(id) {
        const hasUserInDB = await this.userCtrl.checkHasUserById(id);
        if (!hasUserInDB) {
            const user = await this.userCtrl.getUser(id);

            if (user.idUserStackOverflow !== null) {
                const checkHasGithubLink = await this.userCtrl.crawlGitHubLink(user.link);

                const idUserInserted = await this.userCtrl.saveUser(user, checkHasGithubLink);

                const activities = await this.activityCtrl.getActivity(id);
                this.activityCtrl.saveActivities(activities, idUserInserted);

                const answers = await this.answerCtrl.getAnswer(id, user.site);
                this.answerCtrl.saveAnswers(answers, idUserInserted);

                const badges = await this.badgeCtrl.getBadge(id, user.site);
                this.badgeCtrl.saveBadges(badges, idUserInserted);

                const comments = await this.commentCtrl.getComment(id, user.site);
                this.commentCtrl.saveComments(comments, idUserInserted);

                const questions = await this.questionCtrl.getQuestion(id, user.site);
                this.questionCtrl.saveQuestions(questions, idUserInserted);

                const tags = await this.tagCtrl.getTag(id, user.site);
                this.tagCtrl.saveTags(tags, idUserInserted);

                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
}

module.exports = ApiStackOverflow;
