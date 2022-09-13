from django.urls import path

from orders import views


urlpatterns = [
    path('checkout/', views.checkout, name="checkout"),
    path('user_orders/', views.UserOrders.as_view(), name="user-orders")
]