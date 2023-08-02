from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from paperless_court import models
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.files.base import ContentFile
from django.core.cache import cache

@csrf_exempt
def save_changes(request):
    if request.method == 'POST':
        blob_file = request.FILES['file']
        url = request.POST['url'].split('/')
        file_path = 'media/'+''+url[5]+'/'+url[6]+'/'+url[7]
        print(file_path)
        with open(file_path, 'wb') as file:
            file.write(blob_file.read())
        cache.clear()
        return JsonResponse({'response': 'File Saved Successfully'}, status=status.HTTP_200_OK, safe=False)

