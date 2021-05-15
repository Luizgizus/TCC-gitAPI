SELECT qtdCommitContributions, qtdIssueContributions, qtdPullRequestContributions, qtdPullRequestReviewContributions, qtdRepositoriesWithContributedCommits, qtdRepositoriesWithContributedIssues, qtdRepositoriesWithContributedPullRequestReviews, qtdRepositoryContributions, qtdRepositoriesWithContributedPullRequests FROM github.contribuition
order by rand();

SELECT userFK, count(*) FROM github.issue
group by userFK
order by rand();

SELECT userFK, count(*) FROM github.issue
where isClosed = 1
group by userFK
order by rand();


SELECT userFK, count(*) FROM github.issue
where isClosed = 0
group by userFK
order by rand();

SELECT userFK, sum(qtdComents) FROM github.issue
group by userFK
order by rand();


SELECT userFK, avg(qtdComents) FROM github.issue
group by userFK
order by rand();


SELECT userFK, count(*) FROM github.issuereaction ir
join github.issue i 
on i.idIssue = ir.issueFK
group by userFK
order by rand();

SELECT userFK, type, count(*) FROM github.issuereaction ir
join github.issue i 
on i.idIssue = ir.issueFK
where type = 'HEART'
group by userFK, type
order by rand();

SELECT userFK, type, count(*) FROM github.issuereaction ir
join github.issue i 
on i.idIssue = ir.issueFK
where type = 'THUMBS_UP'
group by userFK, type
order by rand();


SELECT userFK, type, count(*) FROM github.issuereaction ir
join github.issue i 
on i.idIssue = ir.issueFK
where type = 'HOORAY'
group by userFK, type
order by rand();


SELECT userFK, count(*) FROM github.repository
group by userFK
order by rand();


SELECT userFK, sum(qtdStars) FROM github.repository
group by userFK
order by rand();


SELECT userFK, avg(qtdStars) FROM github.repository
group by userFK
order by rand();


SELECT userFK, sum(qtdWatchers) FROM github.repository
group by userFK
order by rand();


SELECT userFK, avg(qtdWatchers) FROM github.repository
group by userFK
order by rand();


SELECT userFK, count(*) FROM github.repositorylanguages rl
join github.repository r 
on r.idRepository = rl.repositoryFK  
group by userFK
order by rand();



SELECT userFK, count(*) FROM github.repositorypullrequests rpr 
join github.repository r 
on r.idRepository = rpr.repositoryFK  
group by userFK
order by rand();



SELECT userFK, count(*) FROM github.repositorypullrequests rpr 
join github.repository r 
on r.idRepository = rpr.repositoryFK  
where isClosed = '1'
and isMerged = '1'
group by userFK
order by rand();


SELECT userFK, count(*) FROM github.repositorypullrequests rpr 
join github.repository r 
on r.idRepository = rpr.repositoryFK  
where isClosed = '1'
and isMerged = '0'
group by userFK
order by rand();


SELECT userFK, count(*) FROM github.repositorypullrequests rpr 
join github.repository r 
on r.idRepository = rpr.repositoryFK  
where isClosed = '0'
and isMerged = '0'
group by userFK
order by rand();


SELECT userFK, sum(ncloc)  FROM github.sonarqualitymetrics
where ncloc is not null
group by userFK
order by rand();


SELECT userFK, avg(ncloc)  FROM github.sonarqualitymetrics
where ncloc is not null
group by userFK
order by rand();


SELECT userFK, avg(qtdBugs)  FROM github.sonarqualitymetrics
where qtdBugs is not null
group by userFK
order by rand();


SELECT userFK, sum(qtdBugs)  FROM github.sonarqualitymetrics
where qtdBugs is not null
group by userFK
order by rand();

SELECT userFK, sum(qtdCodeSmells)  FROM github.sonarqualitymetrics
where qtdCodeSmells is not null
group by userFK
order by rand();

SELECT userFK, avg(qtdCodeSmells)  FROM github.sonarqualitymetrics
where qtdCodeSmells is not null
group by userFK
order by rand();

SELECT userFK, avg(reliabilityRating)  FROM github.sonarqualitymetrics
where reliabilityRating is not null
group by userFK
order by rand();

SELECT userFK, sum(qtdDuplicatedFiles)  FROM github.sonarqualitymetrics
where qtdDuplicatedFiles is not null
group by userFK
order by rand();

SELECT userFK, avg(qtdDuplicatedFiles)  FROM github.sonarqualitymetrics
where qtdDuplicatedFiles is not null
group by userFK
order by rand();


SELECT userFK, sum(commentLinesDensity)  FROM github.sonarqualitymetrics
where commentLinesDensity is not null
group by userFK
order by rand();


SELECT userFK, avg(commentLinesDensity)  FROM github.sonarqualitymetrics
where commentLinesDensity is not null
group by userFK
order by rand();

SELECT userFK, sum(fileComplexity)  FROM github.sonarqualitymetrics
where qtdViolation is not null
group by userFK
order by rand();

SELECT userFK, avg(fileComplexity)  FROM github.sonarqualitymetrics
where qtdViolation is not null
group by userFK
order by rand();

SELECT userFK, sum(qtdViolation)  FROM github.sonarqualitymetrics
where qtdViolation is not null
group by userFK
order by rand();

SELECT userFK, avg(manutenibilityRating)  FROM github.sonarqualitymetrics
where manutenibilityRating is not null
group by userFK
order by rand();

SELECT userFK, avg(securityRating)  FROM github.sonarqualitymetrics
where manutenibilityRating is not null
group by userFK
order by rand();

SELECT idUser, qtdFollowers FROM github.user
order by rand();

SELECT userFK, type, count(*) FROM stackoverflow.activity
group by userFK
order by rand();

SELECT userFK, type, count(*) FROM stackoverflow.activity
where type = 'answer_posted'
group by userFK, type
order by rand();

SELECT userFK, type, count(*) FROM stackoverflow.activity
where type = 'badge_earned'
group by userFK, type
order by rand();

SELECT userFK, type, count(*) FROM stackoverflow.activity
where type = 'comment_posted'
group by userFK, type
order by rand();

SELECT userFK, type, count(*) FROM stackoverflow.activity
where type = 'question_posted'
group by userFK, type
order by rand();

SELECT userFK, count(*) FROM stackoverflow.answer
group by userFK
order by rand();

SELECT userFK, sum(score) FROM stackoverflow.answer
group by userFK
order by rand();

SELECT userFK, avg(score) FROM stackoverflow.answer
group by userFK
order by rand();

SELECT userFK, sum(count) FROM stackoverflow.badge
group by userFK
order by rand();

SELECT userFK, `rank`, sum(count) FROM stackoverflow.badge
where `rank` = 'bronze'
group by userFK, `rank`
order by rand();

SELECT userFK, count(*) FROM stackoverflow.comment
group by userFK
order by rand();

SELECT userFK, sum(score) FROM stackoverflow.comment
group by userFK
order by rand();

SELECT userFK, avg(score) FROM stackoverflow.comment
group by userFK
order by rand();


SELECT userFK, count(*) FROM stackoverflow.question
group by userFK
order by rand();


SELECT userFK, sum(score) FROM stackoverflow.question
group by userFK
order by rand();


SELECT userFK, avg(score) FROM stackoverflow.question
group by userFK
order by rand();


SELECT userFK, sum(qtdViews) FROM stackoverflow.question
group by userFK
order by rand();


SELECT userFK, avg(qtdViews) FROM stackoverflow.question
group by userFK
order by rand();

SELECT userFK, count(*) FROM stackoverflow.tag
group by userFK
order by rand()