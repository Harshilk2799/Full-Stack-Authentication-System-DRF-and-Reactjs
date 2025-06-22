from django.urls import path
from account import views 
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", views.RegistrationView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("profile/", views.UserProfileView.as_view(), name="profile"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("changepassword/", views.UserChangePasswordView.as_view(), name="changepassword"),
    path("send-reset-password-email/", views.SendPasswordResetEmailView.as_view(), name="send-reset-password-email"),
    path("reset-password/<uid>/<token>/", views.UserPasswordRestView.as_view(), name="reset-password"),
]

