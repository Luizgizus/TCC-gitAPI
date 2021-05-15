SELECT userFK, type, count(*) FROM stackoverflow.activity
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;

SELECT userFK, count(*) FROM stackoverflow.activity
where type = 'badge_earned'
AND userFK in (8873, 8874, 8875)
group by userFK, type
order by userFK
limit 1000;

SELECT userFK, count(*) FROM stackoverflow.activity
where type = 'comment_posted'
AND userFK in (8873, 8874, 8875)
group by userFK, type
order by userFK
limit 1000;

SELECT userFK, count(*) FROM stackoverflow.activity
where type = 'question_posted'
AND userFK in (8873, 8874, 8875)
group by userFK, type
order by userFK
limit 1000;

SELECT userFK, count(*) FROM stackoverflow.activity
where type = 'answer_posted'
AND userFK in (8873, 8874, 8875)
group by userFK, type
order by userFK
limit 1000;

SELECT userFK, count(*) FROM stackoverflow.answer
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;

SELECT userFK, sum(score) FROM stackoverflow.answer
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;

SELECT userFK, avg(score) FROM stackoverflow.answer
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;

SELECT userFK, sum(count) FROM stackoverflow.badge
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;

SELECT userFK, sum(count) FROM stackoverflow.badge
where `rank` = 'bronze'
AND userFK in (8873, 8874, 8875)
group by userFK, `rank`
order by userFK
limit 1000;

SELECT userFK, sum(count) FROM stackoverflow.badge
where `rank` = 'silver'
AND userFK in (8873, 8874, 8875)
group by userFK, `rank`
order by userFK
limit 1000;

SELECT userFK, sum(count) FROM stackoverflow.badge
where `rank` = 'gold'
AND userFK in (8873, 8874, 8875)
group by userFK, `rank`
order by userFK
limit 1000;

SELECT userFK, count(*) FROM stackoverflow.comment
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;

SELECT userFK, sum(score) FROM stackoverflow.comment
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;

SELECT userFK, avg(score) FROM stackoverflow.comment
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;


SELECT userFK, count(*) FROM stackoverflow.question
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;


SELECT userFK, sum(score) FROM stackoverflow.question
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;


SELECT userFK, avg(score) FROM stackoverflow.question
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;


SELECT userFK, sum(qtdViews) FROM stackoverflow.question
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;


SELECT userFK, avg(qtdViews) FROM stackoverflow.question
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000;

SELECT userFK, count(*) FROM stackoverflow.tag
where userFK in (8873, 8874, 8875)
group by userFK
order by userFK
limit 1000