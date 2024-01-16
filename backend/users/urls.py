from django.urls import path
from .views import UserView, UserFreinds, UserActive
from .login import LoginView
urlpatterns = [
    path('', UserView.as_view()),
    path('<int:id>', UserView.as_view()),
    path('login/', LoginView.as_view()),
    path('<int:id>/friends', UserFreinds.as_view()),
    path('active/<int:rows>', UserActive.as_view())
]
