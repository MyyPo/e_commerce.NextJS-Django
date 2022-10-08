from distutils.log import error
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
import uuid
from django.contrib.auth import get_user_model

from products.models import Product


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(get_user_model(), related_name='orders', on_delete=models.CASCADE)
    # first_name = models.CharField(max_length=64)
    # last_name = models.CharField(max_length=64)
    email = models.CharField(max_length=64)
    # address = models.CharField(max_length=64)
    # zipcode = models.CharField(max_length=64)
    # place = models.CharField(max_length=64)
    # phone = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    paid_amount = models.DecimalField(max_digits=16, decimal_places=2, blank=True, null=True)
    stripe_token = models.CharField(max_length=100)

    class Meta:
        ordering = ['-created_at',]

    def __str__(self):
        return f"Order | {self.id}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, to_field="title", on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=16, decimal_places=2, blank=True, null=True)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return '%s' % self.id

@receiver(pre_save, sender=OrderItem, dispatch_uid="check_quantity")
def check_stock(sender, instance, **kwargs):
    if instance.product.quantity > instance.quantity:
        pass
    else:
        raise Exception

@receiver(post_save, sender=OrderItem, dispatch_uid="update_quantity")
def update_stock(sender, instance, **kwargs):
    instance.product.quantity -= instance.quantity
    instance.product.save()
