from django.urls import path
from .views import UsersHistoryView
urlpatterns = [
    path('<int:id>', UsersHistoryView.as_view()),
    path('<int:user_id>/<int:exercise_id>', UsersHistoryView.as_view()),
]
