from rest_framework import serializers, pagination
from rest_framework.response import Response


from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='product-detail',
        lookup_field='slug',
        read_only=True
    )
    class Meta:
        model = Product
        fields = [
            'id',
            'url',
            'user',
            'title',
            'slug',
            'origin',
            'type',
            'price',
            'description',
            'second_hand',
            'quantity',
            'second_hand_quantity',
            'public',
            'get_image',
            'get_thumbnail',
        ]

class ProductSlugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'title',
            'slug',
        ]