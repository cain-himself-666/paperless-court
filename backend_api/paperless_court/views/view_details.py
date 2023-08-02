from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from paperless_court import models
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def getCaseDetails(request):
    if request.method == 'GET':
        docs = []
        bookMarks = []
        data_notes = []
        details = models.CaseDetails.objects.get(cnr = request.GET['cnr'])
        fetch_det = {
            "case_id": details.id,
            "case_no": details.case_no,
            "first_petitioner": details.first_petitioner,
            "first_respondent": details.first_respondent, 
        }
        documents = models.Documents.objects.filter(case_id_id = details.id)
        for d in documents:
            indexes = models.DocumentIndexes.objects.filter(doc_id_id=d.id).order_by('id').values()
            data = {
                "case_id": details.id,
                "doc_id": d.id,
                "doc_name": d.document,
                "display_name": d.display_name,
                "document_type": d.document_type,
                "document_indexes": list(indexes)
            }
            docs.append(data)
        bookmarks = models.Bookmarks.objects.filter(case_id_id = details.id).select_related('case_id').select_related('document_id')
        for b in bookmarks:
            data = {
                'id': b.id,
                'page_no':b.page_no,
                'case_id': b.case_id.id,
                'document_type': b.document_id.document_type,
                'document_name': b.document_id.document,
            }
            bookMarks.append(data)
        notes = models.Notes.objects.filter(case_id_id = details.id)
        for n in notes:
            data = {
                "id": n.id,
                "note": n.note,
                "date": n.date,
            }
            data_notes.append(data)
        return JsonResponse({"details": fetch_det, "docs": docs, "bookmarks": bookMarks, "notes": data_notes}, status=status.HTTP_200_OK, safe=False)