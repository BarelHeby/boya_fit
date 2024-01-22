from django.urls import path
from .views import GymsView
urlpatterns = [
    path('exercise/<int:user_id>/<int:exercise_id>', GymsView.as_view()),
]
