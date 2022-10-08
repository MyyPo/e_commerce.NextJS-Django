from django.urls import path

from orders import views


urlpatterns = [
    path('checkout/', views.checkout, name="checkout"),
    path('test/', views.test_payment, name="test"),
    path('save_stripe_info/', views.save_stripe_info, name="save-stripe-info"),
    path('user_orders/', views.UserOrders.as_view(), name="user-orders")
]