from django.shortcuts import render
from .models import Rating
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class RatingView(APIView):
    def get(self, request, id=None):
        print(id)
        exercises = Rating.get(id)
        return Response([exercise.to_json() for exercise in exercises], status=status.HTTP_200_OK)
