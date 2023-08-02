from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from paperless_court import models
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def getDocTypes(request):
    if request.method == 'GET':
        types = []
        doc_types = models.DocumentMaster.objects.all()
        for i in range(0,len(doc_types)):
            data = {
                "doc_type": doc_types[i].document_type
            }
            types.append(data)
        return JsonResponse(types, status=status.HTTP_200_OK, safe=False)