from models.Users import User
from models.Exercises import Exercise
from random import randrange
from datetime import datetime, timedelta


class UsersHistory:
    def __init__(self, user_id: int, exercise_id: int) -> None:
        self.user_id = user_id
        self.exercise_id = exercise_id
        self._query_func = None

    def set_query_func(self, query_func: callable):
        self._query_func = query_func

    def insert(self, date_sub=0, hours_sub=0):
        now = datetime.now() - timedelta(days=date_sub, hours=hours_sub)
        formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')
        self._query_func("""
            INSERT INTO Users_History 
            (UserId,ExerciseId,Time) 
            VALUES (%s,%s,%s)""", [self.user_id, self.exercise_id, formatted_date], True)

    def generate_and_insert(query_func: callable):
        users = User.get(query_func)
        exercises = Exercise.get(query_func)
        for i in range(3000):
            user = users[randrange(len(users))]
            exercise = exercises[randrange(len(exercises))]
            uh = UsersHistory(user.id, exercise.id)
            uh.set_query_func(query_func)
            uh.insert(date_sub=randrange(0, 30), hours_sub=randrange(0, 24))
