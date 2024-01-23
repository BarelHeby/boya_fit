
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Exercise


class ExerciseView(APIView):
    def get(self, request, id=None):
        print(id)
        exercises = Exercise.get(id)
        return Response([exercise.to_json() for exercise in exercises], status=status.HTTP_200_OK)

    def post(self, request):
        d = request.data
        exercise = Exercise.from_json(d)
        print(exercise.__dict__)
        # exercise = Exercise(**request.data)
        try:
            exercise.insert()
            return Response(exercise.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        # return Response(d, status=status.HTTP_200_OK)

    def put(self, request, id=None):
        if id is None:
            return Response({"error": "id is required"}, status=status.HTTP_400_BAD_REQUEST)
        d = request.data
        exercise = Exercise.from_json(d, id)
        try:
            exercise.update()
            return Response(exercise.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ExerciseCategoryView(APIView):
    def get(self, request, category=None):
        exercises = Exercise.get_by_category(category)
        return Response([exercise.to_json() for exercise in exercises], status=status.HTTP_200_OK)


class ExerciseRatingView(APIView):
    def get(self, request, id):
        ratings = Exercise.get_rating(id)
        return Response(ratings, status=status.HTTP_200_OK)
