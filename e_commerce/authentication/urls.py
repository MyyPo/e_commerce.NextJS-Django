from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from .views import CustomerCreate, FacebookLoginView, HelloWorldView, MyTokenObtainPairView, GoogleLoginView
from django.urls import path


urlpatterns = [
    path('user/create/', CustomerCreate.as_view(), name='create_user'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('google/', GoogleLoginView.as_view(), name='google'),
    path('facebook/', FacebookLoginView.as_view(), name='facebook'),

]