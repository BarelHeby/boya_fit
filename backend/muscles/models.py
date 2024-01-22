from django.db import models

# Create your models here.


class Muscle:
    def __init__(self, name, body_part_id, id=None, priority=None) -> None:
        self.name = name
        self.body_part_id = body_part_id
        self.id = id
        self.priority = priority

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "body_part_id": self.body_part_id,
            "priority": self.priority
        }
