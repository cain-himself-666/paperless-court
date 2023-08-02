from rest_framework.response import Response
from durin.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from account import models as acc_models
from django.contrib.auth.models import Group, User
from django.contrib.auth.hashers import make_password, check_password
from django.core.files.storage import FileSystemStorage

@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    if request.method == 'GET':
        queryset = acc_models.UserProfile.objects.get(contact_number = request.user)
        data = {
            'name': queryset.name,
            "email": queryset.email,
            "contact": queryset.contact_number,
            "gender": queryset.gender,
            "address": queryset.address,
            "brn": queryset.bar_registration_number,
            "photo": queryset.photo,
            "id_proof": queryset.id_proof,
        }
        return Response(data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        user=User.objects.get(id=request.user.id)
        group=Group.objects.all()
        for i in range(0, len(group)):
            try:
                role=user.groups.get(id=group[i].id)
            except:
                pass
        queryset = acc_models.UserProfile.objects.get(contact_number = request.user)
        data = {
            "name": queryset.name,
            "group": str(role.id),
        }
        return Response(data, status=status.HTTP_200_OK)
        
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updatePassword(request):
    if request.method == "POST":
        update_password = acc_models.User.objects.get(id=request.user.id)
        try:
            if(check_password(request.POST['current_password'], update_password.password)):
                update_password.password = make_password(request.POST['new_password'])
                update_password.save()
                return Response("Password Updated Successfully !!!", status=status.HTTP_200_OK)
            else:
                return Response("Error", status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response("Error", status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    if request.method == 'POST':
        if request.FILES:
            if 'id_proof' in request.FILES:
                fs2 = FileSystemStorage('media/documents')
                fs2.delete(request.POST['id_proof_name'])
                fs2.save(request.POST['id_proof_name'], request.FILES['id_proof'])
            if 'id_card' in request.FILES:
                fs2 = FileSystemStorage('media/advId')
                fs2.delete(request.POST['id_card_name'])
                fs2.save(request.POST['id_card_name'], request.FILES['id_card'])

        update_profile = acc_models.UserProfile.objects.filter(user_id=request.user.id).update(
            name = request.POST['name'],
            email = request.POST['email'],
            gender = request.POST['gender'],
            id_proof = request.POST['id_proof_name'],
            bar_certificate = request.POST['id_card_name'],
        )
        return Response("Updated Successfully", status=status.HTTP_202_ACCEPTED)


