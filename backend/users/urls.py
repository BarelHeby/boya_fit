from django.urls import path
from .views import UserView
urlpatterns = [
    path('', UserView.as_view()),
    path('<int:id>', UserView.as_view()),
]
