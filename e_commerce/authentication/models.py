import uuid
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import PermissionsMixin

from authemail.models import EmailUserManager, EmailAbstractUser

# class CustomerManager(EmailUserManager):
#     def create_user(self, email, password=None):
#         if not email:
#             raise ValueError('Must specify email')
#         user = self.model(
#             email = self.normalize_email(email),
#         )
#         user.set_password(password)
#         user.save(using=self.db)
#         return user

#     def create_superuser(self, email, password=None):
#         if not email:
#             raise ValueError('Must specify email')
#         user = self.model(
#             email = self.normalize_email(email),
#         )
#         user.is_admin = True
#         user.is_superuser = True
#         user.set_password(password)
#         user.save(using=self.db)
#         return user

class Customer(EmailAbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=100)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    postal_code = models.CharField(max_length=5, blank=True, null=True)
    phoneNumberRegex = RegexValidator(regex = r"^\+?1?\d{8,15}$")
    phoneNumber = models.CharField(('phone number'), validators = [phoneNumberRegex], max_length = 16, unique = True, blank=True, null=True)

    objects = EmailUserManager()
    
    # def has_perm(self, perm, obj=None):
    #     return self.is_admin

    # def has_module_perms(self, app_label):
    #     return True

    # @property
    # def is_staff(self):
    #     "Is the user a member of staff?"
    #     # Simplest possible answer: All admins are staff
    #     return self.is_admin
