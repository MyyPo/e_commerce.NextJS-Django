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
def save_stripe_info(request):
  stripe.api_key = settings.STRIPE_SECRET_KEY
  # data = request.data
  email = request.data["email"]
  payment_method_id = request.data["payment_method_id"]
  extra_msg = '' # add new variable to response message
  # checking if customer with provided email already exists
  customer_data = stripe.Customer.list(email=email).data   
 
  # if the array is empty it means the email has not been used yet  
  if len(customer_data) == 0:
    # creating customer
    customer = stripe.Customer.create(
    email=email, 
    payment_method=payment_method_id
    )
  else:
    customer = customer_data[0]
    extra_msg = "Customer already existed."
  stripe.PaymentIntent.create(
    customer=customer, 
    payment_method=payment_method_id,  
    currency='USD', # you can provide any currency you want
    amount=1500,
    confirm=True)     # it equals 9.99 PLN
  return Response(status=status.HTTP_200_OK, 
    data={'message': 'Success', 'data': {
      'customer_id': customer.id, 'extra_msg': extra_msg}
   })

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def test_payment(request):
    print(request)
    stripe.api_key = settings.STRIPE_SECRET_KEY
    customer = stripe.Customer.create(
    email=request.user, payment_method=request.payment_method_id)
    stripe.PaymentIntent.create(
        customer=customer, 
        payment_method=request.data.id,  
        currency='USD',
        amount=999,
        confirm = True,
)  

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
