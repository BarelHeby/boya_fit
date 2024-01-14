from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User


class UserView(APIView):
    def get(self, request, id=None):
        users = User.get(id)
        return Response([user.to_json() for user in users], status=status.HTTP_200_OK)

    def post(self, request):
        d = request.data
        user = User.from_json(d)
        user.insert()
        return Response(user.to_json(), status=status.HTTP_200_OK)

    def put(self, request, id=None):
        if id is None:
            return Response({"error": "id is required"}, status=status.HTTP_400_BAD_REQUEST)
        d = request.data
        user = User.from_json(d, id)
        user.update()
        return Response(user.to_json(), status=status.HTTP_200_OK)
