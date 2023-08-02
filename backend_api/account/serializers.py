from rest_framework import (
    serializers,
)
from . import models as acc_model
from django.contrib.auth.models import User

class OrganisationSerializer(serializers.ModelSerializer):

    class Meta:
        model = acc_model.Organisation
        fields = (
            'id',
            'name',
            'short_name',
            'address',
        )

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = acc_model.UserProfile
        fields = (
            'user',
            'organisation',
            'name',
            'contact_number',
            'email',
            'gender',
            'address',
            'photo',
            'id_proof',
            'bar_registration_number',
            'bar_certificate',
        )


class HelperUserSerializer(serializers.ModelSerializer):
    related_user_profile = UserProfileSerializer(source='user_profile',many=False,read_only=True)
    class Meta:
        model = User
        fields = ('id','username', 'related_user_profile')
