class UsersHistory:
    def __init__(self, user_id: int, exercise_id: int) -> None:
        self.user_id = user_id
        self.exercise_id = exercise_id
        self._query_func = None

    def set_query_func(self, query_func: callable):
        self._query_func = query_func

    def insert(self):
        self._query_func(
            f"INSERT INTO Users_History (UserId,ExerciseId,Time) VALUES (%s,%s,CURRENT_TIME())", [self.user_id, self.exercise_id], True)
    