from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User


class UserStatsView(APIView):
    def get(self, request, id=None):
        resp = User.get_last_10_active_days_stats(id)
        return Response(resp, status=status.HTTP_200_OK)
