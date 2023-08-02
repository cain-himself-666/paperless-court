
from rest_framework import serializers
from rti import models as rti_models

class ApplicationForwardedDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = rti_models.ApplicationForwardedDetails
        fields = (
            'application',
            'forwarded_to',
            'forwarded_by',
            'forwarded_on',
            'forwarded_to_address',
            'remarks',
        )
