from users.models import User
from exercises.models import Exercise
from random import randrange
from datetime import datetime, timedelta
from db.Db_Manager import DbManager


class UsersHistory:
    def __init__(self, user_id: int, time: datetime = None, exercise: Exercise = None) -> None:
        self.time = time
        self.exercise = exercise
        self.user_id = user_id

    def get(id):
        query = """
        SELECT
            *
        FROM
            User_History_View
        WHERE
            UserId = %s
        ORDER BY
            Time DESC
        """
        res = DbManager.query(query, [id])
        return [UsersHistory.create_from_query_row(row) for row in res]

    def create_from_query_row(row):
        time = row[0]
        user_id = row[1]
        exercise_id = row[2]
        exercise_name = row[3]
        exercise_difficulty = row[4]
        exercise_calories = row[5]
        exercise_time_seconds = row[6]
        exercise_equipment_id = row[7]
        exercise_body_part_id = row[8]
        exercise_instructions = row[9].split("###")
        e = Exercise(exercise_name, exercise_difficulty, exercise_calories, exercise_time_seconds,
                     exercise_equipment_id, exercise_body_part_id, exercise_instructions, id=exercise_id)
        return UsersHistory(user_id, time, e)

    def to_json(self):
        return {
            "time": self.time,
            "user_id": self.user_id,
            "exercise": self.exercise.to_json()
        }

    def insert(self, date_sub=0, hours_sub=0):
        now = datetime.now() - timedelta(days=date_sub, hours=hours_sub)
        formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')
        self._query_func("""
            INSERT INTO Users_History 
            (UserId,ExerciseId,Time) 
            VALUES (%s,%s,%s)""", [self.user_id, self.exercise_id, formatted_date], True)

    def delete(user_id, exercise_id):
        DbManager.query(
            "DELETE FROM Users_History WHERE UserId=%s AND ExerciseId=%s", [user_id, exercise_id])
