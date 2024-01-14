from random import randint, randrange


class Exercise:
    def __init__(self, name: str, difficulty: int, calories: int, time_seconds: int, equipment_id: int, body_part_id: int, instructions: list,  id=None) -> None:
        self.name = name
        self.difficulty = difficulty
        self.calories = calories
        self.time_seconds = time_seconds
        self.equipment_id = equipment_id
        self.body_part_id = body_part_id
        self.instructions = instructions
        self.id = id

    def create_from_query_row(row):
        name = row[1]
        difficulty = row[2]
        calories = row[3]
        time_seconds = row[4]
        equipment_id = row[5]
        body_part_id = row[6]
        instructions = row[7].split("###")
        id = row[0]
        return Exercise(name, difficulty, calories, time_seconds, equipment_id, body_part_id, instructions, id=id)

    def get(query_func: callable, id=None):
        query = "SELECT * FROM Exercises"
        if id != None:
            query += f" WHERE Id={id}"
        resp = query_func(query)
        return [Exercise.create_from_query_row(row) for row in resp]

    def set_query_func(self, query_func: callable):
        self._query_func = query_func

    def is_exist(name, query_func: callable):
        return query_func(
            f"SELECT Id FROM Exercises WHERE Name = %s", [name])

    def insert(self):
        instructions_text = "###".join(self.instructions)
        resp = Exercise.is_exist(self.name, self._query_func)
        if len(resp) == 0:
            return self._query_func("""INSERT INTO 
                Exercises 
                    (Name,
                    Difficulty,
                    Calories,
                    TimeSeconds,
                    EquipmentId,
                    BodyPartId,
                    Instructions
                    ) 
                VALUES 
                (%s,%s,%s,%s,%s,%s,%s)""",
                                    [self.name,
                                     self.difficulty,
                                     self.calories,
                                     self.time_seconds,
                                     self.equipment_id,
                                     self.body_part_id,
                                     instructions_text], True)

        else:
            return resp[0][0]

    def generate(name: str, equipment_id: int, body_part_id: int, instructions: list):
        difficulty = randint(1, 6)
        calories = randint(1, 100)
        time_seconds = randrange(20, 40, 5)
        return Exercise(name, difficulty, calories, time_seconds, equipment_id, body_part_id, instructions)
