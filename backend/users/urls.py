from django.urls import path
from .views import UserView, UserFreinds, UserActive, UserFreindsRequests, Userstatus
from .login import LoginView
urlpatterns = [
    path('', UserView.as_view()),
    path('<int:id>', UserView.as_view()),
    path('login/', LoginView.as_view()),
    path('<int:id>/friends', UserFreinds.as_view()),
    path('<int:id>/friends/requests', UserFreindsRequests.as_view()),
    path('<int:id>/friends/status/<int:friend_id>',
         Userstatus.as_view()),
    path('active/<int:rows>', UserActive.as_view())
]
