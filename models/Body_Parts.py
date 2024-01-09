from models.Entity import Entity


class BodyParts(Entity):
    def __init__(self, name: str, query_func: callable = None) -> None:
        super().__init__(query_func)
        self.name = name

    def is_exist(name: str, query_func: callable):
        return query_func(
            f"SELECT Id FROM Body_Parts WHERE Name = %s", [name])

    def insert(self):
        resp = BodyParts.is_exist(self.name, self._query_func)
        if len(resp) == 0:
            query = f"INSERT INTO Body_Parts (Name) VALUES (%s)"
            values = [self.name]
            return self.query(query, values, True)
        else:
            return resp[0][0]

    def delete(id: int, query_func: callable):
        query_func(
            f"DELETE FROM Body_Parts WHERE Id = %s", [id])
