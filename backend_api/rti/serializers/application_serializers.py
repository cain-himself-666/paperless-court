from rest_framework import serializers
from rti import (models as rti_models, 
                
                 )

from rti.serializers import (offline_applicant_serializers, 
                             application_forward_serializers)
from account import serializers as acc_serializer



class ApplicationSerializer(serializers.ModelSerializer):

    related_offline_applicant = offline_applicant_serializers.OfflineApplicantSerializer(source='offline_applicant', many=True, read_only=True)
    related_online_applicant = acc_serializer.HelperUserSerializer(source='user',  read_only=True)
    related_forwaded_to = application_forward_serializers.ApplicationForwardedDetailsSerializer(source='application_forwarded_details', many=True, read_only=True)
    class Meta:
        model = rti_models.Application
        fields = (
            'id',
            'user',
            'application_no',
            'content',
            'mailing_address',
            'status',
            'economic_category',
            'economic_category_proof_url',
            'document_name',
            'document_url',
            'is_online_application',
            'applied_on',
            'deadline_on',
            'is_received',
            'is_completed_by_hc',
            'is_sensory_disabled',
            'is_concern_of_life_liberty',
            'reason_of_rejection',
            'received_on',
            'fee_intimation_date',
            'fee_payment_date',
            'created_at',
            'created_by',
            'related_offline_applicant',
            'related_online_applicant',
            'related_forwaded_to',
        )
    

