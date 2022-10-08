from rest_framework import generics, filters
from stripe import Order
from products.pagination import StandardResultsSetPagination
from products.serializers import ProductSerializer, ProductSlugSerializer
import random
from django.core.cache import cache

from .models import Product
from authentication.mixins import StaffOrReadOnlyMixin
from authentication.permissions import IsStaffOrReadOnly


RANDOM_EXPERIENCES = 1

class ProductListAPIViews(
    StaffOrReadOnlyMixin,
    generics.ListAPIView):
    # permission_classes = (IsStaffOrReadOnly),
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^title']

    def get_queryset(self):
        product_list = Product.objects.all().order_by('-quantity')
        return product_list

        # if not self.request.session.get('random_exp'):
        #     self.request.session['random_exp']=random.randrange(0,RANDOM_EXPERIENCES)
        # product_list = cache.get('random_exp_%d' % self.request.session['random_exp'])
        # if not product_list:
        #     product_list = list(Product.objects.all().order_by('?'))
        #     cache.set('random_exp_%d' % self.request.session['random_exp'], product_list, 60*60*24)
        # return product_list
       



product_list_create_view = ProductListAPIViews.as_view()


class ProductDetailAPIView(
    StaffOrReadOnlyMixin,
    generics.RetrieveAPIView):
    # permission_classes = (IsStaffOrReadOnly),
    queryset = Product.objects.all()
    lookup_field = 'slug'
    serializer_class = ProductSerializer
   


product_detail_view = ProductDetailAPIView.as_view()

class ProductListGetSlugsAPIView(
    StaffOrReadOnlyMixin,
    generics.ListCreateAPIView):
    # permission_classes = (IsStaffOrReadOnly),
    pagination_class = StandardResultsSetPagination
    queryset = Product.objects.all()
    serializer_class = ProductSlugSerializer

product_get_slugs_view = ProductListGetSlugsAPIView.as_view()