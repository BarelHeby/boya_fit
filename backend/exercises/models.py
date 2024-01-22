

# Create your models here.
from random import randint, randrange
from db.Db_Manager import DbManager
from muscles.models import Muscle


class Exercise:
    def __init__(self, name: str, difficulty: int, calories: int, time_seconds: int, equipment_id: int, body_part_id: int, instructions: list, body_part_name: str = None, equipment_name: str = None, rating=None, id=None, muscles: list[Muscle] = None) -> None:
        self.name = name
        self.difficulty = difficulty
        self.calories = calories
        self.time_seconds = time_seconds
        self.equipment_id = equipment_id
        self.body_part_id = body_part_id
        self.instructions = instructions
        self.id = id
        self.body_part_name = body_part_name
        self.rating = rating
        self.equipment_name = equipment_name
        self.muscles = muscles

    def set_muscles(self, muscles=list[Muscle]):
        self.muscles = muscles

    def create_from_query_row(row):
        id = row[0]
        name = row[1]
        difficulty = row[2]
        calories = row[3]
        time_seconds = row[4]
        equipment_id = row[5]
        body_part_id = row[6]
        instructions = row[7].split("###")
        body_part_name = row[8]
        equipment_name = row[9]
        rating = row[10]
        if len(row) > 11:
            muscleId = row[11]
            muscleName = row[12]
            priority = row[13]
            m = Muscle(muscleName, body_part_id, muscleId, priority=priority)
        return Exercise(name, difficulty, calories, time_seconds, equipment_id, body_part_id, instructions, body_part_name, equipment_name, rating, id=id, muscles=[m] if len(row) > 11 else None)

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
            "instructions": self.instructions,
            "body_part_name": self.body_part_name,
            "equipment_name": self.equipment_name,
            "rating": self.rating,
            "muscles": [m.to_json() for m in self.muscles] if self.muscles != None else []
        }

    def get(id=None):
        print(id)
        if id == None:
            query = f"""
            SELECT 
                Exercises.Id Id,
                Exercises.Name Name,
                Exercises.Difficulty Difficulty,
                Exercises.Calories Calories,
                Exercises.TimeSeconds TimeSeconds,
                Exercises.EquipmentId EquipmentId,
                Exercises.BodyPartId BodyPartId,
                Exercises.Instructions Instructions,
                Body_Parts.Name BodyPartName,
                Equipments.Name EquipmentName,
                avg(Rating.Rating) rating
            FROM 
                Exercises,
                Body_Parts,
                Rating,
                Equipments
            WHERE
                Exercises.BodyPartId = Body_Parts.Id
            {f" AND Exercises.Id = %s " if id != None else ""}
            AND
                Rating.ExerciseId = Exercises.Id
            AND
                Equipments.Id = Exercises.EquipmentId
            GROUP BY
                1,2,3,4,5,6,7,8,9,10
            ORDER BY
                11 DESC
            """
            resp = DbManager.query(query)
            return [Exercise.create_from_query_row(row) for row in resp]
        else:
            query = f"""
            SELECT
                e.*,
                m.Id 	MuscleId ,
                m.Name 	MuscleName,
                em.Priority Priority
            FROM
                Exercises_View e,
                Muscles m ,
                Excercise_Muscles em
            WHERE
                e.Id = em.ExerciseId
            AND
                m.Id = em.MuscleId
            AND
                e.Id = %s
            ORDER BY
                em.Priority"""
            variables = [id]
            resp = DbManager.query(query, variables)
            if len(resp) == 0:
                return []
            muscles = [Muscle(row[12], row[6], row[11], row[13])
                       for row in resp]
            ex = Exercise.create_from_query_row(resp[0])
            ex.set_muscles(muscles)
            return [ex]

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

    def get_by_category(category):
        variables = []
        query = """
        with Ranked_Exercises as (
            SELECT *,
            ROW_NUMBER() OVER (partition by BodyPartId Order By BodyPartId) as RowNum
            FROM Exercises
        )
        select
            ev.*
        from
            Ranked_Exercises re,
            Exercises_View ev
        where
            re.Id = ev.Id
        
        """
        if category != None:
            query += f" AND lower(ev.BodyPartName) = lower( %s ) "
            variables.append(category)
        else:
            query += " and re.RowNum <=10"
        resp = DbManager.query(query, variables)
        return [Exercise.create_from_query_row(row) for row in resp]
