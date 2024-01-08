class ExerciseMuscle:
    def __init__(self, exercise_id: int, muscle_id: int, priotity: int, query_func: callable = None) -> None:
        self.exercise_id = exercise_id
        self.muscle_id = muscle_id
        self.priotity = priotity
        self._query_func = query_func

    def set_query_func(self, query_func: callable):
        self._query_func = query_func

    def insert(self):
        self._query_func(
            f"INSERT INTO Excercise_Muscles (ExerciseId,MuscleId,Priority) VALUES (%s,%s,%s)", [self.exercise_id, self.muscle_id, self.priotity], True)
