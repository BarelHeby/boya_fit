class Equipment:
    def __init__(self, name: str, query_func: callable = None) -> None:
        self.name = name
        self._query_func = query_func

    def set_query_func(self, query_func: callable):
        self._query_func = query_func

    def is_exist(name: str, query_func: callable):
        return query_func(
            f"SELECT Id FROM Equipments WHERE Name = %s", [name])

    def insert(self):
        resp = Equipment.is_exist(self.name, self._query_func)
        if len(resp) == 0:
            return self._query_func(
                f"INSERT INTO Equipments (name) VALUES (%s)", [self.name], True)
        else:
            return resp[0][0]

    def delete(id: int, query_func: callable):
        query_func(
            f"DELETE FROM Equipments WHERE Id = %s", [id])

    def get_all(query_func: callable):
        return query_func("SELECT * FROM Equipments")
