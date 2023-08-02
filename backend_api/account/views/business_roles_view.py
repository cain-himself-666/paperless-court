from django.conf import (
    settings
)
from rest_framework import (
    views as rf_views,
    response
                            
    )

class BusinessRoleList(rf_views.APIView):

    def get(self, request, format=None):
        data = settings.USER_ROLES
        return response.Response(data)

    