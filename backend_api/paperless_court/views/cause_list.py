from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from paperless_court import models
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def cases(request):
    if request.method == 'GET':
        response = []
        cases = models.CaseDetails.objects.all()
        for c in cases:
            data = {
                'id': c.id,
                'case_no': c.case_no
            }
            response.append(data)
        return JsonResponse(response, status=status.HTTP_200_OK, safe=False)
    
    if request.method == 'POST':
        models.CauseList.objects.create(
            display_s_no = request.POST['sno'],
            display_name = request.POST['name'],
            date = request.POST['date'],
            case_id_id = request.POST['case_id']
        )
        return JsonResponse({'response': 'Data Added Successfully'}, status=status.HTTP_201_CREATED)
    
@csrf_exempt
def cause_list(request):
    if request.method == 'GET':
        cause_list = []
        pet_counsel = []
        res_counsel = []
        cases = models.CauseList.objects.filter(date = request.GET['date']).select_related('case_id').order_by('id')
        for c in cases:
            case_id = c.case_id.id
            counsels = models.Advocates.objects.filter(case_id_id = case_id)
            for co in counsels:
                if co.counsel_for == 'p':
                    pet_counsel.append(co.counsel_name)
                else:
                    res_counsel.append(co.counsel_name)
                p = '|'.join(str(name) for name in pet_counsel)
                r = '|'.join(str(name) for name in res_counsel)
            data = {
                "display": c.display_name,
                "s_no": c.display_s_no,
                "case_no": c.case_id.case_no,
                "first_petitioner": c.case_id.first_petitioner,
                "first_respondent": c.case_id.first_respondent,
                "petitioner_counsels": p,
                "respondent_counsels": r,
                "cnr": c.case_id.cnr
            }
            cause_list.append(data)
            pet_counsel = []
            res_counsel = []
        return JsonResponse(cause_list, status=status.HTTP_200_OK, safe=False)
