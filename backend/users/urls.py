from django.urls import path
from .views import UserView, UserFreinds
from .login import LoginView
urlpatterns = [
    path('', UserView.as_view()),
    path('<int:id>', UserView.as_view()),
    path('login/', LoginView.as_view()),
    path('<int:id>/friends', UserFreinds.as_view()),
]
