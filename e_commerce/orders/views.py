from django.conf import settings
import stripe

from django.conf import settings
from django.contrib.auth.models import User
from django.http import Http404
from rest_framework import generics

from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from authentication.mixins import StaffOrReadOnlyMixin

from .models import Order, OrderItem
from .serializers import OrderSerializer

class UserOrders(StaffOrReadOnlyMixin, generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        else:
            user = self.request.user
            return Order.objects.filter(customer=user)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def checkout(request):
    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():
        stripe.api_key = settings.STRIPE_SECRET_KEY
        paid_amount = sum(item.get('quantity') * item.get('product').price for item in serializer.validated_data['items'])

        try:
            charge = stripe.Charge.create(
                amount = int(paid_amount * 100),
                currency='USD',
                description='Charge from arms',
                source=serializer.validated_data['stripe_token']
            )

            serializer.save(user=request.user, paid_amount=paid_amount)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
