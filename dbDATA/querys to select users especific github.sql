
SELECT user_idUser, qtdCommitContributions, qtdIssueContributions, qtdPullRequestContributions, qtdPullRequestReviewContributions, qtdRepositoriesWithContributedCommits, qtdRepositoriesWithContributedIssues, qtdRepositoriesWithContributedPullRequestReviews, qtdRepositoryContributions, qtdRepositoriesWithContributedPullRequests FROM github.contribuition
where user_idUser in (20955, 20958, 20959)
order by user_idUser;

SELECT userFK, count(*) FROM github.issue
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;

SELECT userFK, count(*) FROM github.issue
where userFK in (20955, 20958, 20959)
AND isClosed = 1
group by userFK
order by userFK;


SELECT userFK, count(*) FROM github.issue
where userFK in (20955, 20958, 20959)
AND isClosed = 0
group by userFK
order by userFK;

SELECT userFK, sum(qtdComents) FROM github.issue
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;


SELECT userFK, avg(qtdComents) FROM github.issue
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;


SELECT userFK, count(*) FROM github.issuereaction ir
join github.issue i 
on i.idIssue = ir.issueFK
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;

SELECT userFK, count(*) FROM github.issuereaction ir
join github.issue i 
on i.idIssue = ir.issueFK
where userFK in (20955, 20958, 20959)
AND type = 'HEART'
group by userFK, type
order by userFK;

SELECT userFK, count(*) FROM github.issuereaction ir
join github.issue i 
on i.idIssue = ir.issueFK
where userFK in (20955, 20958, 20959)
AND type = 'THUMBS_UP'
group by userFK, type
order by userFK;


SELECT userFK, count(*) FROM github.issuereaction ir
join github.issue i 
on i.idIssue = ir.issueFK
where userFK in (20955, 20958, 20959)
AND type = 'HOORAY'
group by userFK, type
order by userFK;


SELECT userFK, count(*) FROM github.repository
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;


SELECT userFK, sum(qtdStars) FROM github.repository
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;


SELECT userFK, avg(qtdStars) FROM github.repository
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;


SELECT userFK, sum(qtdWatchers) FROM github.repository
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;


SELECT userFK, avg(qtdWatchers) FROM github.repository
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;


SELECT userFK, count(*) FROM github.repositorylanguages rl
join github.repository r 
on r.idRepository = rl.repositoryFK  
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;



SELECT userFK, count(*) FROM github.repositorypullrequests rpr 
join github.repository r 
on r.idRepository = rpr.repositoryFK  
where userFK in (20955, 20958, 20959)
group by userFK
order by userFK;



SELECT userFK, count(*) FROM github.repositorypullrequests rpr 
join github.repository r 
on r.idRepository = rpr.repositoryFK  
where userFK in (20955, 20958, 20959)
AND isClosed = '1'
and isMerged = '1'
group by userFK
order by userFK;


SELECT userFK, count(*) FROM github.repositorypullrequests rpr 
join github.repository r 
on r.idRepository = rpr.repositoryFK  
where userFK in (20955, 20958, 20959)
AND isClosed = '1'
and isMerged = '0'
group by userFK
order by userFK;


SELECT userFK, count(*) FROM github.repositorypullrequests rpr 
join github.repository r 
on r.idRepository = rpr.repositoryFK  
where userFK in (20955, 20958, 20959)
AND isClosed = '0'
and isMerged = '0'
group by userFK
order by userFK;


SELECT userFK, sum(ncloc), avg(ncloc), avg(qtdBugs), sum(qtdBugs), sum(qtdCodeSmells), avg(qtdCodeSmells), avg(reliabilityRating), sum(qtdDuplicatedFiles), avg(qtdDuplicatedFiles), sum(commentLinesDensity), avg(commentLinesDensity), sum(fileComplexity), avg(fileComplexity), sum(qtdViolation), avg(manutenibilityRating), avg(securityRating)   FROM github.sonarqualitymetrics
where userFK in (20955, 20958, 20959)
AND ncloc is not null
group by userFK
order by userFK;

SELECT idUser, qtdFollowers FROM github.user
where idUser in (20955, 20958, 20959)
