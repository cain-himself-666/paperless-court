from django.http.response import JsonResponse
from rest_framework import status, response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, renderer_classes

from django.db import transaction
from account import models as acc_models
from django.contrib.auth.models import Group, User
import requests, random, re
from django.contrib.auth.hashers import make_password
from django.core.files.storage import FileSystemStorage
from rest_framework.renderers import JSONRenderer

@csrf_exempt
def otp(request):
    if request.method == "POST":
        contact = re.sub('[^A-Za-z0-9]+', '', request.POST['contact'])
        otp = random.randint(100000,999999)
        try:
            check = acc_models.UserOTP.objects.get(contact = contact)
            check.otp = otp
            check.save()
            # send_otp(contact, otp)
            return JsonResponse("OTP has been successfully sent to mobile number number", status=status.HTTP_201_CREATED, safe=False)
        except: 
            acc_models.UserOTP.objects.create(
                contact = contact,
                otp = otp
            )
            # send_otp(contact, otp)
            return JsonResponse("OTP has been successfully sent to mobile number number", status=status.HTTP_201_CREATED, safe=False)
    
    if request.method == "GET":
        contact = re.sub('[^A-Za-z0-9]+', '', request.GET['contact'])
        otp = re.sub('[^A-Za-z0-9]+', '', request.GET['otp'])
        user_type = re.sub('[^A-Za-z0-9]+', '', request.GET['user'])
        try:
            check = User.objects.get(username = contact)
            acc_models.UserOTP.objects.filter(contact=contact).delete()
            return JsonResponse("User already exists", status=status.HTTP_403_FORBIDDEN, safe=False)
        except:
            try:
                get_otp = acc_models.UserOTP.objects.get(contact=contact)
                return JsonResponse("OTP Expired", status=status.HTTP_400_BAD_REQUEST)
            except:
                get_otp = acc_models.UserOTP.objects.get(contact=contact)
                if request.GET['otp'] == get_otp.otp:
                    if user_type == '0':
                        return JsonResponse("OTP Verified", status=status.HTTP_200_OK, safe=False)
                    else:
                        details = acc_models.AdvocateEntries.objects.filter(adv_mobile = contact).first()
                        if details:
                            data = {
                                    'name': details.adv_name,
                                    'email': details.email,
                                    'address': details.address,
                                    'gender': details.adv_gender,
                                    'contact': details.adv_mobile,
                                    'brn': details.adv_reg
                                }
                            return JsonResponse(data, status=status.HTTP_200_OK)
                        else:
                            return JsonResponse("NotRegistered", status=status.HTTP_404_NOT_FOUND, safe=False)
                else:
                    return JsonResponse("Incorrect OTP", status=status.HTTP_403_FORBIDDEN, safe=False)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            with transaction.atomic():
                user_credentials = User.objects.create(
                    password = make_password(request.POST['password']),
                    username = request.POST['contact_number']
                )
                user_credentials.save()
                if 'photo_file' in request.FILES:
                    photo = request.FILES['photo_file']
                    fs1 = FileSystemStorage(location='media/photos')
                    fs1.save(request.POST['photo'], photo)
                if 'id_file' in request.FILES:
                    id_proof = request.FILES['id_file']
                    fs2 = FileSystemStorage(location='media/documents')
                    fs2.save(request.POST['id_proof'], id_proof)
                if 'adv_id' in request.FILES:
                    adv = request.FILES['adv_id']
                    fs2 = FileSystemStorage(location='media/advId')
                    fs2.save(request.POST['advId'], adv)
                user_profile = acc_models.UserProfile.objects.create(
                    user_id = user_credentials.id,
                    name = request.POST['name'],
                    contact_number = request.POST['contact_number'],
                    email = request.POST['email'],
                    gender = request.POST['gender'],
                    address = request.POST['address'],
                    photo = request.POST['photo'],
                    id_proof = request.POST['id_proof'],
                    bar_registration_number = request.POST['brn'],
                    bar_certificate = request.POST['advId'],
                )
                user_profile.save()
                user = User.objects.get(id=user_credentials.id)
                group = Group.objects.get(id=request.POST['user_type'])
                group.user_set.add(user)
                get_otp = acc_models.UserOTP.objects.filter(contact=request.POST['contact_number']).delete()
                return JsonResponse("User created successfully", status=status.HTTP_200_OK, safe=False)
        except Exception as e:
            print(e)
            return JsonResponse("error", status=status.HTTP_500_INTERNAL_SERVER_ERROR, safe=False)
            

def send_otp(mobile_number, otp):
    message = 'Hello, OTP for phone verification is '+otp+' advtent-High Court of Sikkim'
    username = 'courts-sik.sms'
    pin = 'K1tG1Vsm'
    signature = 'SHCSMS'
    entity_id = '1101444310000040161'
    template_id = '1107165390653742984'
    try:
        url = "https://smsgw.sms.gov.in/failsafe/HttpLink?username="+username+"&pin="+pin+"&message="+message+"&mnumber="+mobile_number+"&signature="+signature+"&dlt_entity_id="+entity_id+"&dlt_template_id="+template_id
        response = requests.get(url, verify=False)
        print(response)
        print('Message Sent')
        return None
    except Exception as e:
        print(e)

    
