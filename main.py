from DbManager import DbManager
from TableCreator import TableCreator
print("Start creating the database")
dbManager = DbManager()
print("Database created successfully")
print("Start creating the tables")
TableCreator(dbManager.query).create()
print("Tables created successfully")
print("Start filling the tables")
TableCreator(dbManager.query).fill()
print("Tables filled successfully")
print("Done!")
