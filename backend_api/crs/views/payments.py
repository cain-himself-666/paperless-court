from rest_framework.response import Response
from durin.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from crs import models, serializers
from django.core.files.storage import FileSystemStorage

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def payments(request):
    if request.method == "POST":
        fs = FileSystemStorage(location='media/receipts')
        if request.POST['form'] == 'Update':
            if request.FILES:
                fs.delete(request.POST['receipt'])
                fs.save(request.POST['receipt'], request.FILES['receipt_file'])
                return Response({"response": "Receipt Update Successfull"}, status=status.HTTP_201_CREATED)
        else:
            payments = serializers.PaymentSerializer(data = request.POST)
            with transaction.atomic():
                if payments.is_valid():
                    if request.FILES:
                        fs.save(request.POST['receipt'],request.FILES['receipt_file'])
                    application = models.Applications.objects.get(application_id = request.POST['application_id'])
                    application_details = models.ApplicationDetails.objects.filter(application_id_id = request.POST['application_id']).update(number_of_copies=request.POST['number_of_copies'])
                    application.application_status = 'Pending'
                    application.user_type = request.POST['user_type']
                    application.is_accused = request.POST['is_accused']
                    payments.save()
                    application.save()
                    return Response({"response": "Payment Successfull"}, status=status.HTTP_201_CREATED)
                return Response({"response": "Error"}, status=status.HTTP_403_FORBIDDEN)
    if request.method == "GET":
        payment_master = models.PaymentsMaster.objects.all()
        for p in payment_master:
            data = {
                'offline_mode': p.offline_mode,
                'online_mode': p.online_mode
            }
        return Response(data, status=status.HTTP_200_OK)