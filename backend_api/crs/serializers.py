from rest_framework import serializers
from crs import models as crs_models
from account import models as acc_models
from axes.admin import AccessLog
from django.contrib.auth.models import User,Group

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = acc_models.UserProfile
        fields = [
            'user',
            'name',
            'email',
            'contact_number',
            'gender',
            'address',
            'photo',
            'id_proof',
            'bar_registration_number',
            'bar_certificate'
        ]

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = crs_models.Payments
        fields = [
            'application_id',
            'mode_of_payment',
            'calculated_amount',
            'paid_amount',
            'pages',
            'receipt',
            'reason',
        ]

class LogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessLog
        fields = [
            'ip_address',
            'username',
            'attempt_time',
            'logout_time',
        ]

class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = [
            'id',
            'name',
        ]

class UserSerializer(serializers.ModelSerializer):
    related_profile = UserProfileSerializer(source='user_profile', read_only =True)
    related_group = UserGroupSerializer(source='groups', many=True, read_only =True)
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'first_name',
            'related_profile',
            'related_group'
        ]

class PaymentMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = crs_models.PaymentsMaster
        fields = [
            'online_mode',
            'offline_mode',
        ]


