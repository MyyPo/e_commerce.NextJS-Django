from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/', include('authentication.urls')),
    path('api/', include('orders.urls')),
    



] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)