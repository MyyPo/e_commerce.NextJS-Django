from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list_create_view, name='product-list'),
    path('<slug>/', views.product_detail_view, name='product-detail'),
    path('slugs/get/', views.product_get_slugs_view, name='product-get-slugs'),
]
