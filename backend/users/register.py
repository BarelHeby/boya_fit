from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User


class RegisterView(APIView):
    def post(self, request):
        try:
            name = request.data.get('name')
            email = request.data.get('email')
            password = request.data.get('password')
            fitness_level = request.data.get('fitness_level')
            weight = request.data.get('weight')
            height = request.data.get('height')
            picture = request.data.get('picture')
            latitude = request.data.get('latitude')
            longitude = request.data.get('longitude')
            user = User(name, email, password, fitness_level,
                        weight, height, picture, latitude, longitude)
            if User.isExists(email):
                return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user.insert()
            return Response(user.to_json(), status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_400_BAD_REQUEST)
