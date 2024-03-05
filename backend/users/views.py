from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User


class UserView(APIView):
    def get(self, request, id=None):
        users = User.get(id)
        return Response([user.to_json() for user in users], status=status.HTTP_200_OK)

    def post(self, request):
        try:
            d = request.data
            user = User.from_json(d)
            if not user.is_exists():
                user.insert()
                return Response(user.to_json(), status=status.HTTP_200_OK)
            else:
                return Response({"error": "user already exists"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        if id is None:
            return Response({"error": "id is required"}, status=status.HTTP_400_BAD_REQUEST)
        d = request.data
        user = User.from_json(d, id)
        user.update()
        return Response(user.to_json(), status=status.HTTP_200_OK)


class UserFreinds(APIView):
    def get(self, request, id=None):
        users = User.get_friends(id)
        return Response([user.to_json() for user in users], status=status.HTTP_200_OK)


class UserFreindsRequests(APIView):
    def get(self, request, id=None):
        print("here")
        users = User.get_friends_requests(id)
        return Response([user.to_json() for user in users], status=status.HTTP_200_OK)

    def post(self, request, id=None):
        data = request.data
        friendId = data["friendId"]
        is_accepted = data["isAccepted"]
        is_request = data["isRequest"]
        if id is None or friendId is None:
            return Response({"error": "id and friendId are required"}, status=status.HTTP_400_BAD_REQUEST)
        if is_request:
            if not User.is_friend(id, friendId) and not User.is_friend_request(id, friendId):
                User.send_friend_request(id, friendId)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response({"error": "already friends or existing request is on"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            User.add_friend(id, friendId, is_accepted)
            users = User.get_friends_requests(id)
            return Response([user.to_json() for user in users], status=status.HTTP_200_OK)


class UserActive(APIView):
    def get(self, request, rows=None):

        resp = User.get_most_active(rows)
        return Response([{"user": user["user"].to_json(), "count": user["count"]} for user in resp], status=status.HTTP_200_OK)


class Userstatus(APIView):
    def get(self, request, id=None, friend_id=None):
        if id is None:
            return Response({"error": "id is required"}, status=status.HTTP_400_BAD_REQUEST)
        if User.is_friend(id, friend_id):
            return Response({"status": "friend"}, status=status.HTTP_200_OK)
        elif User.is_friend_request(id, friend_id):
            return Response({"status": "request"}, status=status.HTTP_200_OK)
        else:
            return Response({"status": None}, status=status.HTTP_200_OK)
