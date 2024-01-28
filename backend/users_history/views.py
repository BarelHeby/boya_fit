
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UsersHistory


class UsersHistoryView(APIView):
    def get(self, request, id=None):
        print(id)
        exercises = UsersHistory.get(id)
        return Response([exercise.to_json() for exercise in exercises], status=status.HTTP_200_OK)

    def post(self, request):
        try:
            user_id = request.data["userId"]
            exercise_id = request.data["exerciseId"]
            UsersHistory.add(user_id, exercise_id)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
