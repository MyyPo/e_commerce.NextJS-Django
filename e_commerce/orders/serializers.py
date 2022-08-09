from dataclasses import fields
from rest_framework import serializers

from .models import Order, OrderItem

from products.serializers import ProductSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer

    def validate(self, data, product):
        if data['quantity'] > product['quantity']:
            raise serializers.ValidationError("Not in stock")
        return data



    class Meta:
        model = OrderItem
        fields = (
            'price',
            'product',
            'quantity',
        )
        


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order

        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "address",
            "zipcode",
            "place",
            "phone",
            "stripe_token",
            "items",
            "paid_amount"
        )

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order