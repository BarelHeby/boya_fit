from dotenv import load_dotenv
import mysql.connector
import os


class DbManager:
    def __init__(self) -> None:
        self._database_name = "boya_fit_1"
        self.db = self._connect()
        self._create_scheme()
        self.db.database = self._database_name
        self.cursor = self.db.cursor()

    def query(self, query: str, values: list = [], is_insert_method: bool = False, multi: bool = False):
        self.cursor.execute(query, values, multi=multi)
        results = self.cursor.fetchall()
        if is_insert_method:
            return self.cursor.lastrowid
        return results

    def _connect(self):
        load_dotenv()
        cnx = mysql.connector.connect(
            user='rika',
            password=os.getenv('MYSQL_ROOT_PASSWORD'),
            host='127.0.0.1',
        )
        cnx.start_transaction()
        cnx.autocommit = True
        return cnx

    def _create_scheme(self):
        query = f"CREATE SCHEMA IF NOT EXISTS `{self._database_name}` ;"
        c = self.db.cursor()
        c.execute(query)
        c.close()
