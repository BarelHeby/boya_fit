from django.urls import path
from .views import UserView
from .login import LoginView
urlpatterns = [
    path('', UserView.as_view()),
    path('<int:id>', UserView.as_view()),
    path('login/', LoginView.as_view()),
]
