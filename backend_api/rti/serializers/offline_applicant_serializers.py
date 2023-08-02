from rest_framework import serializers
from rti import models as rti_models

class OfflineApplicantSerializer(serializers.ModelSerializer):
     class Meta:
         model = rti_models.OfflineApplicant
         fields = (
             'application',
             'applicant_name',
             'from_department',
             'contact_number'
         )