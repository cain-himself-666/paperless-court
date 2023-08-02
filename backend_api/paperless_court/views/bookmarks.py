from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from paperless_court import models
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def addBookmark(request):
    if request.method == 'POST':
        models.Bookmarks.objects.create(
            page_no = request.POST['page_no'],
            bookmark_label = request.POST['bookmark_label'],
            case_id_id = request.POST['case_id'],
            document_id_id = request.POST['document_id']
        )
        return JsonResponse({'response': 'Bookmark Added Successfully'}, status=status.HTTP_201_CREATED)
    if request.method == 'DELETE':
        models.Bookmarks.objects.filter(id=request.GET['id']).delete()
        return JsonResponse({'response': 'Bookmark Deleted Successfully'}, status=status.HTTP_200_OK)
    return JsonResponse({'response': 'Error'}, status=status.HTTP_400_BAD_REQUEST)
    