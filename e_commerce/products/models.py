from io import BytesIO
from PIL import Image
from django.core.files import File
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify
from django.contrib.auth import get_user_model

User = settings.AUTH_USER_MODEL 



class Product(models.Model):
    user = models.ForeignKey(get_user_model(), default=1, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(unique=True, blank=True, editable=False)
    price = models.DecimalField(max_digits=15, decimal_places=2, default=9999.99)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='uploads/', blank=True, null=True)  
    date_added = models.DateTimeField(auto_now_add=True)
    public = models.BooleanField(null=False, default=True)
    quantity = models.IntegerField(default=0, blank=True, null=True)
    second_hand_quantity = models.IntegerField(default=0, blank=True, null=True)

    class Meta:
        ordering = ('-date_added',)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.pk:
            self.slug = slugify(self.title)
        super(Product, self).save(*args, **kwargs)



    def get_image(self):
        if self.image:
            return 'http://127.0.0.1:8000' + self.image.url
        return ''
    
    def get_thumbnail(self):
        if self.thumbnail:
            return 'http://127.0.0.1:8000' + self.thumbnail.url
        else:
            if self.image:
                self.thumbnail = self.make_thumbnail(self.image)
                self.save()

                return 'http://127.0.0.1:8000' + self.thumbnail.url
            else:
                return ''

    def make_thumbnail(self, image, size=(300, 200)):
        img = Image.open(image)
        img.thumbnail(size)

        thumb_io = BytesIO()
        img.save(thumb_io, 'JPEG', quality=85)

        thumbnail = File(thumb_io, name=image.name)

        return thumbnail
            

    @property
    def second_hand(self):
        return "%.2f" %(float(self.price) * 0.75)

    class Origin(models.TextChoices):
        UKRAINE = 'UKR',_('Ukraine')
        USA = 'USA', _('USA')
        POLAND = 'PL', _('Poland')
        UNATTESTED = 'UNATTESTED', _('Unattested')
    origin = models.CharField(max_length=34, choices=Origin.choices, default=Origin.UNATTESTED, null=True, blank=True)

    
    class Type(models.TextChoices):
        LIGHT = 'LGT',_('Light')
        HEAVY = 'HVY',_('Heavy')
        UNCONVENTIONAL = 'UNC',_('Unconventional')

    type = models.CharField(max_length=34, choices=Type.choices, default=Type.UNCONVENTIONAL, null=True, blank=True)
