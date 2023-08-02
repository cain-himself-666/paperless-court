# from rest_framework.response import Response
# from durin.auth import TokenAuthentication
from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from paperless_court import models
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def case_details(request):
    if request.method == 'GET':
        cases = models.CaseDetails.objects.all().order_by('-id').values()
        return JsonResponse(list(cases), status=status.HTTP_200_OK, safe=False)
    if request.method == 'POST':
        petitioner_counsels = request.POST['petitioner_counsels'].split('|')
        respondent_counsels = request.POST['respondent_counsels'].split('|')
        additional_petitioners = request.POST['additional_petitioners'].split('|')
        additional_respondents = request.POST['additional_respondents'].split('|')
        with transaction.atomic():
            details = models.CaseDetails.objects.create(
                case_no = request.POST['case_no'],
                cnr = request.POST['cnr'],
                first_petitioner = request.POST['first_petitioner'],
                first_respondent = request.POST['first_respondent']
            )
            for i in range(0,len(petitioner_counsels)):
                models.Advocates.objects.create(
                    case_id_id = details.id,
                    counsel_name = petitioner_counsels[i],
                    counsel_for = 'p'
                )
            for i in range(0,len(respondent_counsels)):
                models.Advocates.objects.create(
                    case_id_id = details.id,
                    counsel_name = respondent_counsels[i],
                    counsel_for = 'r'
                )
            if len(additional_petitioners) > 1:
                for i in range(0,len(additional_petitioners)):
                    models.Additional.objects.create(
                        case_id_id = details.id,
                        name = additional_petitioners[i],
                        type = 'p'
                    )
            if len(additional_respondents) > 1:
                for i in range(0,len(respondent_counsels)):
                    models.Additional.objects.create(
                        case_id_id = details.id,
                        name = additional_respondents[i],
                        type = 'r'
                    )
            else:
                pass
            return JsonResponse({'case_id': details.id}, status=status.HTTP_201_CREATED)

@csrf_exempt
def uploadDocuments(request):
    if request.method == 'POST':
        if request.FILES:
            fs = FileSystemStorage(location='media/'+request.POST['case_id']+'/'+request.POST['document_type'])
            fs.save(request.FILES['document'].name,request.FILES['document'])
        models.Documents.objects.create(
            case_id_id = request.POST['case_id'],
            document_type = request.POST['document_type'],
            display_name = request.POST['display_name'],
            document = request.FILES['document'].name,
        )
        return JsonResponse({'response': 'Document Uploaded Successfully !!'}, status=status.HTTP_201_CREATED)