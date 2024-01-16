from django.db import models

# Create your models here.
import numpy as np
from db.Db_Manager import DbManager


class User:
    def __init__(self, name: str, email: str, password: str, fitness_level: int, weight: int, height: int, picture: str, latitude: float, longitude: float, id=None) -> None:
        self.name = name
        self.email = email
        self.password = password
        self.fitness_level = fitness_level
        self.weight = weight
        self.height = height
        self.id = id
        self.picture = picture
        self.latitude = latitude
        self.longitude = longitude

    def from_json(json, id=None):
        return User(json["name"], json["email"], json["password"], json["fitness_level"], json["weight"], json["height"], json["picture"], json["latitude"], json["longitude"], id=id)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "fitness_level": self.fitness_level,
            "weight": self.weight,
            "height": self.height,
            "picture": self.picture,
            "latitude": self.latitude,
            "longitude": self.longitude
        }

    def create_from_query_row(row):
        name = row[1]
        email = row[2]
        password = row[3]
        fitness_level = row[4]
        weight = row[5]
        height = row[6]
        picture = row[7]
        latitude = row[8]
        longitude = row[9]
        id = row[0]
        return User(name, email, password, fitness_level, weight, height, picture, latitude, longitude, id=id)

    def get(id=None):
        query = "SELECT * FROM Users_View"
        if id != None:
            query += f" WHERE Id={id}"
        resp = DbManager.query(query)
        return [User.create_from_query_row(row) for row in resp]

    def insert(self):
        query = "INSERT INTO Users (Name, Email, Password, FitnessLevel, Weight, Height,Picture,Latlon) VALUES (%s, %s, %s, %s, %s, %s,%s,ST_GeomFromText('POINT(%s %s)'))"
        DbManager.query(query, [self.name, self.email, self.password,
                                self.fitness_level, self.weight, self.height, self.picture, self.latitude, self.longitude], True)

    def update(self):
        query = "UPDATE Users SET Name=%s, Email=%s, Password=%s, FitnessLevel=%s, Weight=%s, Height=%s,Picture=%s,Latlon=ST_GeomFromText('POINT(%s %s)') WHERE Id=%s"
        DbManager.query(query, [self.name, self.email, self.password,
                                self.fitness_level, self.weight, self.height, self.picture, self.latitude, self.longitude, self.id], True)

    def is_exists(self):
        query = "SELECT Id FROM Users WHERE Email=%s"
        resp = DbManager.query(query, [self.email])
        return len(resp) > 0

    def login(email, password):
        query = "SELECT Id,Name,Email,Password,FitnessLevel,Weight,Height,Picture,ST_X(Latlon) x,ST_Y(Latlon) y FROM Users WHERE Email=%s AND Password=%s"
        resp = DbManager.query(query, [email, password])
        if len(resp) > 0:
            return User.create_from_query_row(resp[0])
        return None

    def get_friends(id):
        query = """
        with friendsIds as (	
            select
                    UserId1 Id
                from
                    Users_Friends
                where
                    UserId2 = %s
            union 
                select
                    UserId2 Id
                from
                    Users_Friends
                where
                    UserId1 = %s
        )
        select
            Users_View.*
        from
            Users_View,
            friendsIds
        where
            Users_View.Id = friendsIds.Id
    """
        resp = DbManager.query(query, [id, id])
        return [User.create_from_query_row(row) for row in resp]

    def get_most_active(rows):
        query = f"""
        with Users_Rank as (SELECT 
            UserId Id,
            count(*) as numOfExercisesLastSevenDays
        FROM 
            Users_History
        where
            Time>date_sub(current_time() ,INTERVAL 7 DAY)
        group by
            1
        order by
            2 desc
        {"limit 50" if rows is None else f"limit {rows}"}
        )
        select
            Users_View.*,
            Users_Rank.numOfExercisesLastSevenDays
        from
            Users_View,
            Users_Rank
        where
            Users_View.Id  = Users_Rank.Id
        order by
            Users_Rank.numOfExercisesLastSevenDays desc

    """
        resp = DbManager.query(query)
        return [{"user": User.create_from_query_row(row), "count": row[10]} for row in resp]
