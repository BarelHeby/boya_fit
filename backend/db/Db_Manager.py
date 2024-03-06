from dotenv import load_dotenv
import mysql.connector
import os


class DbManager:
    def __init__(self) -> None:
        self._database_name = "db09"
        self.db = self._connect()
        self.cursor = self.db.cursor()

    def query(query: str, values: list = [], is_insert_method: bool = False, multi: bool = False):
        db_manager = DbManager()
        return db_manager._query(query, values, is_insert_method, multi)

    def _query(self, query: str, values: list = [], is_insert_method: bool = False, multi: bool = False):
        self.cursor.execute(query, values, multi=multi)
        results = self.cursor.fetchall()
        if is_insert_method:
            return self.cursor.lastrowid
        return results

    def _connect(self):
        load_dotenv()
        cnx = mysql.connector.connect(
            user='team09',
            password="0009",
            host='127.0.0.1',
            db=self._database_name
        )
        cnx.start_transaction()
        cnx.autocommit = True
        return cnx
