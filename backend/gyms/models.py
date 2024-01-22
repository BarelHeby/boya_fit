from django.db import models

# Create your models here.

from db.Db_Manager import DbManager


class Gym:
    def __init__(self, name: str,  city: str, country: str, country_short_code: str, is_kids: bool, is_active: bool, logo_photo: str, lat: float, lan: float, id=None, distance: float = None) -> None:
        self.name = name
        self.city = city
        self.country = country
        self.country_short_code = country_short_code
        self.is_kids = is_kids
        self.is_active = is_active
        self.logo_photo = logo_photo
        self.lat = lat
        self.lan = lan
        self.id = id
        self.distance = distance

    def set_distance(self, distance):
        self.distance = distance

    def to_json(self):
        return {
            "name": self.name,
            "city": self.city,
            "country": self.country,
            "country_short_code": self.country_short_code,
            "is_kids": self.is_kids,
            "is_active": self.is_active,
            "logo_photo": self.logo_photo,
            "lat": self.lat,
            "lan": self.lan,
            "id": self.id,
            "distance": self.distance
        }

    def create_from_query_row(row):
        id = row[0]
        name = row[1]
        city = row[2]
        country = row[3]
        country_short_code = row[4]
        is_kids = row[5]
        is_active = row[6]
        logo_photo = row[7]
        lat = row[8]
        lan = row[9]
        distance = row[10] if len(row) > 10 else None
        return Gym(name, city, country, country_short_code, is_kids, is_active, logo_photo, lat, lan, id, distance)

    def get_by_exercise(user_id, exercise_id):
        query = """
        select
            g.Id,
            g.Name,
            g.City,
            g.Country,
            g.CountryShortCode,
            g.IsKids,
            g.IsActive,
            g.Logo_Photo,
            ST_X(g.Latlon) lat,
            ST_Y(g.Latlon) lan,
            ST_Distance_Sphere(g.Latlon, u.Latlon) distance
        from
            boya_fit_1.Gyms g,
            boya_fit_1.Exercises e,
            boya_fit_1.Gyms_Equipments ge,
            boya_fit_1.Users u
        where
            g.Id = ge.GymId
        and
            e.EquipmentId = ge.EquipmentId
        and
            e.Id = %s
        and
            u.Id = %s
        order by
            ST_Distance_Sphere(g.Latlon, u.Latlon) asc
        """
        vars = [exercise_id, user_id]
        resp = DbManager.query(query, vars)
        return [Gym.create_from_query_row(row) for row in resp]
