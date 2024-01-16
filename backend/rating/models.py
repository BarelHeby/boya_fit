from db.Db_Manager import DbManager

from datetime import datetime


class Rating:
    def __init__(self, user_id: int, exercise_id: int, exercise_name: str, rating: int, description: str, time: datetime):
        self.user_id = user_id
        self.exercise_id = exercise_id
        self.exercise_name = exercise_name
        self.rating = rating
        self.description = description
        self.time = time

    def fromJson(json):
        return Rating(json["user_id"], json["exercise_id"], json["exercise_name"], json["rating"], json["description"])

    def to_json(self):
        return {
            "user_id": self.user_id,
            "exercise_id": self.exercise_id,
            "exercise_name": self.exercise_name,
            "rating": self.rating,
            "description": self.description,
            "time": self.time
        }

    def create_from_query_row(row):
        user_id = row[0]
        exercise_id = row[1]
        exercise_name = row[2]
        rating = row[3]
        description = row[4]
        time = row[5]
        return Rating(user_id, exercise_id, exercise_name, rating, description, time)

    def get(user_id: int):
        args = []
        query = """
        SELECT 
            UserId,
            ExerciseId,
            Exercises.Name,
            Rating,
            Description,
            Time 
        FROM 
            Rating,
            Exercises
        WHERE
            Exercises.Id = Rating.ExerciseId
        """
        if user_id is not None:
            query += "AND  UserId = %s "
            args.append(user_id)

        query += """
        
        ORDER BY
            Time DESC
        """
        res = DbManager.query(query, args)
        return [Rating.create_from_query_row(row) for row in res]
