from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

from authemail.views import (
    SignupVerify,
    PasswordReset,
    PasswordResetVerify,
)

from .views import CustomerCreate, FacebookLoginView, HelloWorldView, MySignup, MyTokenObtainPairView, GoogleLoginView
from django.urls import path


urlpatterns = [
    path('user/create/', CustomerCreate.as_view(), name='create_user'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('google/', GoogleLoginView.as_view(), name='google'),
    path('facebook/', FacebookLoginView.as_view(), name='facebook'),
    path('signup/', MySignup.as_view(), name='email_signup'),
    path('signup/verify/', SignupVerify.as_view(), name='signup_verify'),
    path('reset-password/', PasswordReset.as_view(), name='reset_password'),
    path('verify-reset-password/', PasswordResetVerify.as_view(), name='verify_reset_password'),
]