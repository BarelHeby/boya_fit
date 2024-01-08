class Muscle:
    def __init__(self, name: str, body_part_id: int, query_func: callable = None) -> None:
        self.name = name
        self.body_part_id = body_part_id
        self._query_func = query_func

    def set_query_func(self, query_func: callable):
        self._query_func = query_func

    def is_exist(name, query_func: callable):
        return query_func(
            f"SELECT Id FROM Muscles WHERE Name = %s", [name])

    def insert(self):
        resp = Muscle.is_exist(self.name, self._query_func)
        if len(resp) == 0:
            return self._query_func(
                f"INSERT INTO Muscles (Name,BodyPartId) VALUES (%s,%s)", [self.name, self.body_part_id], True)
        else:
            return resp[0][0]
