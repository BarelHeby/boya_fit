from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Gym
# Create your views here.


class GymsView(APIView):
    def get(self, request, user_id, exercise_id):
        resp = Gym.get_by_exercise(user_id, exercise_id)
        return Response([g.to_json() for g in resp], status=status.HTTP_200_OK)
