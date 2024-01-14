from random import randint, randrange


class Gyms:
    def __init__(self, Id: int, Name: str, Adress: str, City: str, Zip: str, Country: str, CountryShortCode: str, IsKids: int, IsActive: int, Logo_Photo: str, Latlon: str, query_func: callable = None) -> None:
        self.Id = Id
        self.Name = Name
        self.Adress = Adress
        self.City = City
        self.Zip = Zip
        self.Country = Country
        self.CountryShortCode = CountryShortCode
        self.IsKids = IsKids
        self.IsActive = IsActive
        self.Logo_Photo = Logo_Photo
        self.Latlon = Latlon
        self._query_func = query_func
        

    def create_from_query_row(row):
        Id = row[0]
        Name = row[1]
        Adress = row[2]
        City = row[3]
        Zip = row[4]
        Country = row[5]
        CountryShortCode = row[6]
        IsKids = row[7]
        IsActive = row[8]
        Logo_Photo = row[9]
        Latlon = row[10]
        return Gyms(Id, Name, Adress,City,Zip,Country,CountryShortCode,IsKids,IsActive,Logo_Photo,Latlon)

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
