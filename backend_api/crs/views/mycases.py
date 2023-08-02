from requests import delete
from rest_framework.response import Response
from durin.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.db import transaction
from crs import models, serializers
import re

@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def myCases(request):
    if request.method == 'POST':
        try:
            check = models.MyCases.objects.get(cnr=request.POST['cnr'],username_id=request.user.id)
            return Response("Error !!! Case already exists", status=status.HTTP_400_BAD_REQUEST)
        except:    
            add_my_cases = models.MyCases.objects.create(
                cnr = request.POST['cnr'],
                case_number = request.POST['case_number'],
                username_id = request.user.id,
            )
            return Response("Data Added Successfully", status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        response_data = []
        get_mycases = models.MyCases.objects.filter(username_id = request.user.id)
        for cases in get_mycases:
            data = {
                'cnr': cases.cnr,
                'case_number': cases.case_number,
            }
            response_data.append(data)
        return Response(response_data, status=status.HTTP_200_OK)


@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def deleteCases(request):
    if request.method == 'POST':
        try:
            with transaction.atomic():
                delete_cases = models.MyCases.objects.get(cnr = request.POST['cnr'])
                delete_notes = models.MyCasesNote.objects.filter(mycase_id_id=delete_cases.id).delete()
                delete_cases.delete()
            return Response("Case Deleted Successfully", status=status.HTTP_200_OK)
        except:
            return Response("Data does not exist", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def notes(request):
    if request.method == 'GET':
        cnr = re.sub('[^A-Za-z0-9]+', '', request.GET['cnr'])
        send_notes = []
        case_id = models.MyCases.objects.get(cnr = cnr)
        notes = models.MyCasesNote.objects.filter(mycase_id_id = case_id.id).order_by('-note_date_time')
        for note in notes:
            data = {
                'id':note.id,
                'note': note.note,
                'date': note.note_date_time,
            }
            send_notes.append(data)
        return Response(send_notes, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        cnr = re.sub('[^A-Za-z0-9]+', '', request.POST['cnr'])
        case_id = models.MyCases.objects.get(cnr=cnr)
        add_note = models.MyCasesNote.objects.update_or_create(
            note = request.POST['note'],
            mycase_id_id = case_id.id
        )
        return Response("Note added successfully", status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def deleteNotes(request):
    if request.method == 'POST':
        try:
            delete = models.MyCasesNote.objects.filter(id = request.POST['id']).delete()
            return Response("Note Deleted Successfully", status=status.HTTP_200_OK)
        except:
            return Response("Note Not Found", status=status.HTTP_404_NOT_FOUND)
