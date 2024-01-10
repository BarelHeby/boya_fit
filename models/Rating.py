from datetime import datetime, timedelta
from models.Users import User
from models.Exercises import Exercise
from random import randrange
from data.reviews import reviews


class Rating:
    def __init__(self, userid: int, exercise_id: int, rating: int, description: str, time: datetime = None) -> None:
        self.userid = userid
        self.exercise_id = exercise_id
        self.rating = rating
        self.description = description
        self.time = time
        self._query_func = None

    def set_query_func(self, query_func: callable):
        self._query_func = query_func

    def insert(self, date_sub=0, hours_sub=0):
        if self.time == None:
            time = datetime.now() - timedelta(days=date_sub, hours=hours_sub)
        else:
            time = self.time
        formatted_date = time.strftime('%Y-%m-%d %H:%M:%S')
        self._query_func("""
            INSERT INTO Rating 
            (UserId,ExerciseId,Rating,Description,Time) 
            VALUES (%s,%s,%s,%s,%s)""", [self.userid, self.exercise_id, self.rating, self.description, formatted_date], True)

    def generate_and_insert(query_func: callable):
        users = User.get(query_func)
        exercises = Exercise.get(query_func)
        for i in range(3000):
            user = users[randrange(len(users))]
            exercise = exercises[randrange(len(exercises))]
            stars = randrange(1, 6)
            rating = Rating(user.id, exercise.id,
                            stars,
                            reviews[str(stars)][randrange(len(reviews[str(stars)]))])
            rating.set_query_func(query_func)
            rating.insert(date_sub=randrange(0, 30),
                          hours_sub=randrange(0, 24))
