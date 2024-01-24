import pandas as pd
from Data_Row import DataRow
from models.Body_Parts import BodyParts
from models.Equipments import Equipment
from models.Excercise_Muscles import ExerciseMuscle
from models.Exercises import Exercise
from models.Muscle import Muscle
from models.Users import User
from models.Users_History import UsersHistory
from models.Rating import Rating
from models.Gyms import Gyms
from datetime import datetime


class TableCreator:

    def __init__(self, query_func: callable) -> None:
        """
        Initialize the TableCreator object,\n
        query_func is a function that gets a query and executes it on the database
        """
        self._query_func = query_func

    def create(self):
        """Create the database tables"""
        with open("sql/main.txt", "r") as f:
            data = f.read()
        queries = data.split(";")
        for query in queries:
            if query != "\n":
                self._query_func(query)

    def fill(self):
        """Fill the database with data from csv files"""
        data = pd.read_csv("data/exercises.csv")
        data.apply(self._fill_by_row, axis=1)
        print(f"{datetime.now()} Generating Users")
        User.generate_and_insert(self._query_func)
        print(f"{datetime.now()} Generating Users History")
        UsersHistory.generate_and_insert(self._query_func)
        print(f"{datetime.now()} Generating Ratings")
        Rating.generate_and_insert(self._query_func)
        data = pd.read_csv("data/gyms.csv")
        data = data.fillna("")
        equipments = Equipment.get_all(self._query_func)
        print(f"{datetime.now()} Filling Gyms")
        data.apply(self._fill_gym, axis=1, equipments=(equipments))
        
    def _fill_gym(self, row: pd.Series, equipments: list):
        # Create a DataRow object from the row
        data_row = Gyms.rowToData(row, self._query_func)
        data_row.insert()
        data_row.insert_equipments(equipments)

    def _fill_by_row(self, row: pd.Series):
        # Create a DataRow object from the row
        data_row = DataRow(row)

        # Insert the data to the database
        # If the data already exists, the insert function will return the id of the existing data
        # If the data doesn't exist, the insert function will insert the data and return the id of the new data

        # Insert the body part
        body_part_id = BodyParts(data_row.body_part, self._query_func).insert()

        # Insert the equipment
        equipment_id = Equipment(data_row.equipment, self._query_func).insert()

        # Insert the exercise
        e = Exercise.generate(
            data_row.exercise_name, equipment_id, body_part_id, data_row.instructions)
        e.set_query_func(self._query_func)
        exercise_id = e.insert()

        # Insert the muscles
        for index, m in enumerate([data_row.first_muscle, data_row.second_muscle, data_row.third_muscle]):
            if str(m) != "nan":
                muscle_id = Muscle(m, body_part_id, self._query_func).insert()
                ExerciseMuscle(exercise_id, muscle_id, index,
                               self._query_func).insert()
