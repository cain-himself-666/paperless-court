from django.db import models
from django.contrib.auth.models import User
import datetime
from account import models as acc_models
# Create your models here.
def dynamic_upload_path(instance, filename):
    # Logic to generate dynamic upload path
    return "documents/{}".format(datetime.datetime.now().year)

class Application(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name="application")
    application_no = models.CharField(max_length=20, blank=False, null=False, unique=True)
    content = models.CharField(max_length=2048, blank=True, null=True)
    status = models.CharField(max_length=20, blank=False, null=False)
    economic_category = models.CharField(max_length=25, blank=True, null=True)
    economic_category_proof_url = models.FileField(upload_to='RTI/{}'.format(datetime.datetime.now().year), null=True, blank=True)
    document_name = models.CharField(max_length=256, blank=False, null=False, default='')
    document_url = models.FileField(upload_to='RTI/{}'.format(datetime.datetime.now().year), null=True, blank=True)
    mailing_address=models.CharField(max_length=1028,null=False)
    applied_on = models.DateTimeField(auto_created=False, auto_now=False, auto_now_add=False)
    is_received = models.BooleanField(default=False)
    received_on = models.DateTimeField(auto_created=False, auto_now=False, auto_now_add=False, null=True)
    deadline_on = models.DateTimeField(auto_created=False, auto_now=False, auto_now_add=False, null=True)
    is_online_application = models.BooleanField(default=False)
    is_completed_by_hc= models.BooleanField(default=False)
    is_sensory_disabled = models.BooleanField(default=False)
    is_concern_of_life_liberty = models.BooleanField(default=False)
    reason_of_rejection = models.CharField(max_length=2048, blank=True, null=True)
    fee_intimation_date = models.DateTimeField(auto_created=False, auto_now=False, auto_now_add=False, null=True)
    fee_payment_date = models.DateTimeField(auto_created=False, auto_now=False, auto_now_add=False, null=True)
    created_by = models.ForeignKey(
    User, null=True, on_delete=models.SET_NULL, related_name='item_received')
    created_at = models.DateTimeField(auto_now=True, blank=False)

    def __str__(self):
        return self.name
    

    
class OfflineApplicant(models.Model):
    application = models.ForeignKey(Application, null=False, on_delete=models.CASCADE, related_name='offline_applicant')
    applicant_name = models.CharField(max_length=128, null=False)
    from_department = models.CharField(max_length=512, null=True)
    contact_number = models.CharField(max_length=15, null=True)
    
    def __str__(self):
        return self.name
# class SupportingDocument(models.Model):
#      application = models.ForeignKey(Application, null=True, on_delete=models.SET_NULL, related_name='supporting_document')
#      document_name = models.CharField(max_length=256, blank=False, null=False)
#      ducement_url = models.FileField(upload_to='documents')

class ApplicationForwardedDetails(models.Model):
    application = models.ForeignKey(Application, null=True, on_delete=models.SET_NULL, related_name="application_forwarded_details")
    forwarded_to = models.ForeignKey(acc_models.Organisation, null=True, on_delete=models.SET_NULL, related_name='application_forwarded_details' )
    forwarded_to_address = models.CharField(max_length=1028, null=False)
    forwarded_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name="application_forwarded_details")
    forwarded_on = models.DateTimeField(auto_created=False, auto_now=False)
    remarks = models.CharField(max_length=512, default='')

    def __str__(self):
        return self.name


class FeeDetails(models.Model):
    application = models.ForeignKey(Application, null=True, on_delete=models.SET_NULL, related_name="fee_details")
    particulars = models.CharField(max_length=2048, default='')
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_amount_recieved = models.BooleanField(default=False)
    date_of_payment = models.DateTimeField(auto_created=False, auto_now=False, auto_now_add=False)
    is_invalid =models.BooleanField(default=False)
    reason_for_invalid = models.CharField(max_length=1028, default='')

class IntimationDetails(models.Model):
    application = models.ForeignKey(Application, null=True, on_delete=models.SET_NULL, related_name="intimation_details")
    intimation_type = models.CharField(max_length=128, default='')
    contents = models.CharField(max_length=2048, default='')
    intimation_sent_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name="intimation_details")
    date_of_intimation = models.DateTimeField(auto_created=False, auto_now=False, auto_now_add=False)