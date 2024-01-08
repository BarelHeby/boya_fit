class Entity:
    def __init__(self, query_func: callable = None) -> None:
        self._query_func = query_func

    def set_query_func(self, query_func: callable):
        self._query_func = query_func

    def query(self, query: str, values: list = [], is_insert_method: bool = False):
        return self._query_func(query, values, is_insert_method)
