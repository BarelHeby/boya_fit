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
        query = "SELECT Id,Name,Email,Password,FitnessLevel,Weight,Height,Picture,ST_X(Latlon) x,ST_Y(Latlon) y FROM Users"
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

    def isExists(email):
        query = "SELECT Id FROM Users WHERE Email=%s"
        resp = DbManager.query(query, [email])
        return len(resp) > 0

    def login(email, password):
        query = "SELECT Id,Name,Email,Password,FitnessLevel,Weight,Height,Picture,ST_X(Latlon) x,ST_Y(Latlon) y FROM Users WHERE Email=%s AND Password=%s"
        resp = DbManager.query(query, [email, password])
        if len(resp) > 0:
            return User.create_from_query_row(resp[0])
        return None
