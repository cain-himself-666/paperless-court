from django.db import models

# Create your models here.
from django.contrib.auth.models import User
# Create your models here.

class Organisation(models.Model):
    name=models.CharField(max_length=128, null=False, blank=False, unique=True)
    short_name=models.CharField(max_length=20, null=False, blank=False, unique=True)
    address = models.CharField(max_length=512, null=True, blank=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, related_name='user_profile')
    organisation= models.ForeignKey(Organisation, null = True, on_delete=models.SET_NULL, related_name="user_profile")
    name = models.CharField(max_length=120, null=False, default=None)
    contact_number = models.CharField(max_length=10, null=False, default=None, unique=True)
    email = models.EmailField(max_length=100, null=True, default=None)
    gender = models.CharField(max_length=6, null=False, default=None)
    address = models.CharField(max_length=128, null=True, default=None)
    photo = models.CharField(max_length=100, default=None, null=True)
    id_proof = models.CharField(max_length=100, default=None, null=True)
    bar_registration_number = models.CharField(max_length=30, default=None, null=True)
    bar_certificate = models.CharField(max_length=100, default=None, null=True)
    def __str__(self) -> str:
        return super().__str__()

class UserOTP(models.Model):
    contact = models.CharField(max_length=10, default=None, null=False, unique=True)
    otp = models.CharField(max_length=6, default=None, null=False)
    opt_date_time = models.DateTimeField(auto_now=True)
    
class AdvocateEntries(models.Model):
    adv_name = models.CharField(max_length=100, default=None, null=False)
    adv_reg = models.CharField(max_length=20, default=None, null=False)
    address = models.CharField(max_length=254, default=None, null=True)
    email = models.CharField(max_length=254, default=None, null=True)
    adv_mobile = models.CharField(max_length=15, default=None, null=False)
    adv_gender = models.CharField(max_length=10, default=None, null=False)
