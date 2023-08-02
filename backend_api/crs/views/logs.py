from rest_framework.response import Response
from durin.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from axes.models import AccessLog

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def getLogs(request):
    if request.method == "GET":
        response_data = []
        get_logs = AccessLog.objects.all().order_by('id')
        for log in get_logs:
            data = {
                "username": log.username,
                "attempt_date_time": log.attempt_time,
                "logout_time": log.logout_time,
                "ip": log.ip_address
            }
            response_data.append(data)
        return Response(response_data, status=status.HTTP_200_OK)
