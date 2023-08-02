from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from paperless_court import models
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def getDocuments(request):
    if request.method == 'GET':
        docs = []
        documents = models.Documents.objects.filter(case_id_id = request.GET['case_id'])
        for d in documents:
            data = {
                "id": d.id,
                "case_id": d.case_id_id,
                "doc_name": d.document,
                "display_name": d.display_name,
                "document_type": d.document_type,
            }
            docs.append(data)
        return JsonResponse({"docs": docs}, status=status.HTTP_200_OK, safe=False)