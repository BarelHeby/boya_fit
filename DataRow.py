import pandas as pd


class DataRow:
    def __init__(self, row: pd.Series) -> None:
        self.body_part = row["bodyPart"]
        self.equipment = row["equipment"]
        self.exercise_name = row["name"]
        self.first_muscle = row["target"]
        self.second_muscle = row["secondaryMuscles/0"]
        self.third_muscle = row["secondaryMuscles/1"]
        self.instructions = [
            row[f"instructions/{i}"] for i in range(11) if str(row[f"instructions/{i}"]) != "nan"]
