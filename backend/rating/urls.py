from django.urls import path
from .views import RatingView
urlpatterns = [
    path('<int:id>', RatingView.as_view()),
]
