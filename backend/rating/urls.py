from django.urls import path
from .views import RatingView, RatingBestExercises
urlpatterns = [
    path('', RatingView.as_view()),
    path('<int:id>', RatingView.as_view()),
    path('best/', RatingBestExercises.as_view())
]
