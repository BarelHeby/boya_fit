
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UsersHistory


class UsersHistoryView(APIView):
    def get(self, request, id=None):
        print(id)
        exercises = UsersHistory.get(id)
        return Response([exercise.to_json() for exercise in exercises], status=status.HTTP_200_OK)