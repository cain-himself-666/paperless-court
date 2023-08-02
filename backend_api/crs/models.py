from django.db import models
from django.contrib.auth.models import User
from account import models as acc_models
# Create your models here.

class Applications(models.Model):
    application_id = models.CharField(max_length=10, default=None, primary_key=True)
    user_id = models.ForeignKey(acc_models.UserProfile, on_delete=models.CASCADE)
    application_date = models.DateField(auto_now_add=True)
    issued_date = models.DateField(auto_now_add=True)
    collected_date = models.DateField(default=None, null=True)
    application_status = models.CharField(max_length=10, default=None, null=False)
    remarks = models.CharField(max_length=2048, default=None, null=True)
    display_message = models.CharField(max_length=128, default=None, null=True)
    application_last_updated = models.DateTimeField(auto_now=True)
    user_type = models.CharField(max_length=15, default=None, null=True)
    is_accused = models.BooleanField(default=None, null=True)

class ApplicationDetails(models.Model):
    application_id = models.ForeignKey(Applications, on_delete=models.CASCADE)
    parties = models.CharField(max_length=300, default=None, null=False)
    cnr_number = models.CharField(max_length=100, default=None, null=False)
    case_number = models.CharField(max_length=100, default=None, null=False)
    order_number = models.BigIntegerField(default=None, null=False)
    order_date = models.CharField(max_length=10, default=None, null=False)
    number_of_pages = models.BigIntegerField(default=None, null=False)
    number_of_copies = models.BigIntegerField(default=None, null=True)
    encrypted_id = models.CharField(max_length=256, null=True)

class PaymentsMaster(models.Model):
    online_mode = models.BigIntegerField(default=None, null=True)
    offline_mode = models.BigIntegerField(default=None, null=True)

class Payments(models.Model):
    application_id = models.OneToOneField(Applications, on_delete=models.CASCADE)
    mode_of_payment = models.CharField(max_length=10, default=None, null=False)
    calculated_amount = models.FloatField(default=None, null=False)
    paid_amount = models.FloatField(default=None, null=True)
    pages = models.CharField(default=None, null=True, max_length=3)
    receipt = models.CharField(max_length=15, default=None, null=True)
    reason = models.CharField(max_length=100, default=None, null=True)
    last_updated = models.DateTimeField(auto_now=True)

class MyCases(models.Model):
    case_number = models.CharField(max_length=20, default=None, null=False)
    cnr = models.CharField(max_length=16, default=None, null=False)
    username = models.ForeignKey(acc_models.UserProfile, on_delete=models.CASCADE)
    added_date = models.DateTimeField(auto_now_add=True)

class MyCasesNote(models.Model):
    note = models.CharField(max_length=1024, default=None, null=False)
    note_date_time = models.DateTimeField(auto_now_add=True)
    mycase_id = models.ForeignKey(MyCases, on_delete=models.CASCADE)

class CertifiedCopies(models.Model):
    application_id = models.ForeignKey(Applications, on_delete=models.CASCADE)
    certified_copy = models.CharField(max_length=100, blank=True)
    order_judgement = models.CharField(max_length=10, blank=True)
    uploaded_at = models.DateTimeField(auto_now=True)