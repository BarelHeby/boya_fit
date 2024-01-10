use boya_fit_1;
SELECT
	Users.Name User,
    count(*)
FROM
	Users_History,
    Exercises,
    Users
WHERE
	Users_History.ExerciseId = Exercises.Id
AND
	Users.Id = Users_History.UserId
AND
	Users_History.Time > date_sub(current_date(),INTERVAL 7 DAY)
group by
	Users.Id
order by
	2 desc;