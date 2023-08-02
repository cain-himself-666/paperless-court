from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from paperless_court import models
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def getDocumentIndexes(request):
    if request.method == 'GET':
        indexes = models.DocumentIndexes.objects.filter(doc_id_id = request.GET['doc_id']).values()
        return JsonResponse(list(indexes), status=status.HTTP_200_OK, safe=False)
    if request.method == 'POST':
        models.DocumentIndexes.objects.create(
            name = request.POST['name'],
            page = request.POST['page'],
            doc_id_id = request.POST['doc_id'],
        )
        return JsonResponse({'response': 'Index Added Successfully'}, status=status.HTTP_200_OK, safe=False)