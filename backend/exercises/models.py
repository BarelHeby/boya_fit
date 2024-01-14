from django.db import models

# Create your models here.
from random import randint, randrange
from db.Db_Manager import DbManager


class Exercise:
    def __init__(self, name: str, difficulty: int, calories: int, time_seconds: int, equipment_id: int, body_part_id: int, instructions: list, query_func: callable = None, id=None) -> None:
        self.name = name
        self.difficulty = difficulty
        self.calories = calories
        self.time_seconds = time_seconds
        self.equipment_id = equipment_id
        self.body_part_id = body_part_id
        self.instructions = instructions
        self._query_func = query_func
        self.id = id

    def create_from_query_row(row):
        id = row[0]
        name = row[1]
        difficulty = row[2]
        calories = row[3]
        time_seconds = row[4]
        equipment_id = row[5]
        body_part_id = row[6]
        instructions = row[7].split("###")
        return Exercise(name, difficulty, calories, time_seconds, equipment_id, body_part_id, instructions, id=id)

    def from_json(json, id=None):
        name = json["name"]
        difficulty = json["difficulty"]
        calories = json["calories"]
        time_seconds = json["time_seconds"]
        equipment_id = json["equipment_id"]
        body_part_id = json["body_part_id"]
        instructions = json["instructions"]
        return Exercise(name, difficulty, calories, time_seconds, equipment_id, body_part_id, instructions, id=id)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "difficulty": self.difficulty,
            "calories": self.calories,
            "time_seconds": self.time_seconds,
            "equipment_id": self.equipment_id,
            "body_part_id": self.body_part_id,
            "instructions": self.instructions
        }

    def get(id=None):
        query = """
        SELECT 
            Id,
            Name,
            Difficulty,
            Calories,
            TimeSeconds,
            EquipmentId,
            BodyPartId,
            Instructions
        FROM 
            Exercises
        """
        variables = []
        if id != None:
            query += f" WHERE Id= %s "
            variables.append(id)
        resp = DbManager.query(query, variables)
        return [Exercise.create_from_query_row(row) for row in resp]

    def is_exist(name):
        return DbManager.query(
            f"SELECT Id FROM Exercises WHERE Name = %s", [name])

    def insert(self):
        instructions_text = "###".join(self.instructions)
        resp = Exercise.is_exist(self.name)
        if len(resp) == 0:
            return DbManager.query("""INSERT INTO 
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
            raise Exception("Exercise already exists")

    def update(self):
        if len(Exercise.is_exist(self.name)) > 0:
            raise Exception("Exercise name already exists")
        instructions_text = "###".join(self.instructions)
        return DbManager.query("""UPDATE 
            Exercises 
        SET 
            Name = %s,
            Difficulty = %s,
            Calories = %s,
            TimeSeconds = %s,
            EquipmentId = %s,
            BodyPartId = %s,
            Instructions = %s
        WHERE 
            Id = %s
        """, [self.name,
              self.difficulty,
              self.calories,
              self.time_seconds,
              self.equipment_id,
              self.body_part_id,
              instructions_text,
              self.id])
