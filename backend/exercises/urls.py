from django.urls import path
from .views import ExerciseView, ExerciseCategoryView, ExerciseRatingView, ExerciseLowestDifficulty
urlpatterns = [
    path('', ExerciseView.as_view()),
    path('<int:id>', ExerciseView.as_view()),
    path('category/', ExerciseCategoryView.as_view()),
    path('category/<str:category>', ExerciseCategoryView.as_view()),
    path('rating/<int:id>', ExerciseRatingView.as_view()),
    path('lowest_difficulty/', ExerciseLowestDifficulty.as_view())
]
