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
        limit
            100
        """
        res = DbManager.query(query, args)
        return [Rating.create_from_query_row(row) for row in res]

    def get_best_exercises_for_each_body_part():
        query = """
        WITH rated_exercises AS (
        SELECT
            Body_Parts.Id AS bodyPartId,
            Exercises.Id AS ExerciseId,
            ROW_NUMBER() OVER (PARTITION BY Body_Parts.Id ORDER BY AVG(Rating.Rating) DESC) AS row_number_
        FROM
            Rating
        INNER JOIN Exercises ON Rating.ExerciseId = Exercises.Id
        INNER JOIN Body_Parts ON Exercises.BodyPartId = Body_Parts.Id
        GROUP BY
            Body_Parts.Id, Exercises.Id
        ),
        lastest_rating as(
            select
                Rating.ExerciseId ExerciseId,
                MAX(Time) max_time
            from
                Rating
            group by 1
        )
        SELECT
            Body_Parts.Name,
            Exercises.Name,
            Rating.Description
        FROM
            rated_exercises
        INNER JOIN Body_Parts ON Body_Parts.id = rated_exercises.bodyPartId
        INNER JOIN Exercises ON Exercises.Id = rated_exercises.ExerciseId
        INNER JOIN lastest_rating ON lastest_rating.ExerciseId = Exercises.Id
        INNER JOIN Rating on lastest_rating.ExerciseId = Rating.ExerciseId and lastest_rating.max_time = Rating.Time
        WHERE
            row_number_ = 1;
        """
        res = DbManager.query(query)
        return [{"bodyPart": row[0], "exercise": row[1], "description": row[2]} for row in res]
