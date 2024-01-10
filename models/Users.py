import numpy as np
from data.Pictures_Links import profile_pictures


class User:
    def __init__(self, name: str, email: str, password: str, fitness_level: int, weight: int, height: int, picture: str, query_func: callable = None, id=None) -> None:
        self.name = name
        self.email = email
        self.password = password
        self.fitness_level = fitness_level
        self.weight = weight
        self.height = height
        self._query_func = query_func
        self.id = id
        self.picture = picture

    def set_query_func(self, query_func: callable):
        self._query_func = query_func

    def create_from_query_row(row):
        name = row[1]
        email = row[2]
        password = row[3]
        fitness_level = row[4]
        weight = row[5]
        height = row[6]
        picture = row[7]
        id = row[0]
        return User(name, email, password, fitness_level, weight, height, picture, id=id)

    def get(query_func: callable, id=None):
        query = "SELECT * FROM Users"
        if id != None:
            query += f" WHERE Id={id}"
        resp = query_func(query)
        return [User.create_from_query_row(row) for row in resp]

    def insert(self):
        query = "INSERT INTO Users (Name, Email, Password, FitnessLevel, Weight, Height,Picture) VALUES (%s, %s, %s, %s, %s, %s,%s)"
        self._query_func(query, [self.name, self.email, self.password,
                                 self.fitness_level, self.weight, self.height, self.picture])

    def generate_and_insert(query_func: callable, num_users=50):
        users = User.generate(num_users)
        for user in users:
            user.set_query_func(query_func)
            user.insert()

    def generate(num_users=50):
        users = []
        for i in range(num_users):
            name = f"User {i}"
            email = f"user{i}@example.com"
            password = f"password{i}"
            fitness_level = np.random.randint(1, 6)
            weight = np.random.randint(50, 100)
            height = np.random.randint(150, 200)
            picture = profile_pictures[np.random.randint(
                0, len(profile_pictures))]
            users.append(User(name, email, password,
                         fitness_level, weight, height, picture))
        return users
