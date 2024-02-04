from random import randint, randrange
import pandas as pd


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

    def rowToData(row: pd.Series, query_func: callable) -> None:
        Id = int(row["Id"])
        Name = row["Name"]
        Adress = row["Adress"]
        City = row["City"]
        Zip = row["Zip"]
        Country = row["Country"]
        CountryShortCode = row["CountryShortCode"]
        IsKids = int(row["IsKids"])
        IsActive = int(row["IsActive"])
        Logo_Photo = row["Logo_Photo"]
        Latlon = row["Latlon"]
        return Gyms(Id, Name, Adress, City, Zip, Country, CountryShortCode, IsKids, IsActive, Logo_Photo, Latlon, query_func)

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
        return Gyms(Id, Name, Adress, City, Zip, Country, CountryShortCode, IsKids, IsActive, Logo_Photo, Latlon)

    def get(query_func: callable, id=None):
        query = "SELECT * FROM Gyms"
        if id != None:
            query += f" WHERE Id={id}"
        resp = query_func(query)
        return [Exercise.create_from_query_row(row) for row in resp]

    def set_query_func(self, query_func: callable):
        self._query_func = query_func

    def is_exist(name, query_func: callable):
        return query_func(
            f"SELECT Id FROM Gyms WHERE Name = %s", [name])

    def insert(self):
        numbers = [0, 0] if len(self.Latlon.split(
            ',')) != 2 else self.Latlon.split(',')
        numbers = [float(numbers[0])/90, float(numbers[1])/90]
        return self._query_func("""
                INSERT INTO 
                Gyms 
                    (Name,Adress,City,Zip,Country,CountryShortCode,IsKids,IsActive,Logo_Photo,Latlon) 
                VALUES 
                (%s,%s,%s,%s,%s,%s,%s,%s,%s,ST_GeomFromText('POINT(%s %s)'))""",
                                [self.Name, self.Adress, self.City, self.Zip, self.Country, self.CountryShortCode, self.IsKids, self.IsActive, self.Logo_Photo, float(numbers[0]), float(numbers[1])], True)

    def insert_equipments(self, equipments: list):
        idxs = []
        for i in range(3):
            while 1:
                idx = randint(0, len(equipments)-1)
                if idx not in idxs:
                    idxs.append(idx)
                    break
        self._query_func(
            f"INSERT INTO Gyms_Equipments (GymId,EquipmentId) VALUES (%s,%s),(%s,%s),(%s,%s)", [self.Id, equipments[idxs[0]][0], self.Id, equipments[idxs[1]][0], self.Id, equipments[idxs[2]][0]], True)
