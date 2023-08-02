import datetime
import os
import re
import smtplib
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.views.decorators.csrf import csrf_exempt
import requests
from crs import models
from account import models as acc_models
from django.contrib.auth.models import Group, User
from django.core.files.storage import FileSystemStorage
from django.db import transaction
from django.db.models import Value
from django.db.models.functions import Concat
from durin.auth import TokenAuthentication
from pdfChecker import checker
from rest_framework import status
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
import base64

code = 'HC'
dummy = datetime.datetime.today()
year = int(dummy.strftime('%Y'))
yy = year%100

@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def applications(request):
    if request.method == 'POST':
        try:
            check = models.Applications.objects.filter(application_id__icontains = '{0}{1}'.format(code,yy)).order_by('-application_id')
            if not check:
                application_id = generateAppId(code+''+str(yy)+''+f"{0:05d}")
            else:
                application_id = generateAppId(check[0].application_id)
            data = JSONParser().parse(request)
            details = list(data['data'])
            with transaction.atomic():
                application_status = 'Draft'
                application = models.Applications.objects.create(
                    application_id=application_id,
                    application_status=application_status,
                    user_id_id=request.user.id
                )
                application.save()
                for i in range(0,data['count']):
                    application_details = models.ApplicationDetails.objects.create(
                        application_id_id = application_id,
                        cnr_number=details[i]['cnr_number'],
                        case_number=details[i]['case_number'],
                        order_number=details[i]['order_number'],
                        order_date=details[i]['order_date'],
                        number_of_pages=details[i]['number_of_pages'],
                        parties=details[i]['parties']
                    )
                    application_details.save()
                return Response({"response": "Data Added Successfully !!!", "id":application_id}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            print(e)
            return Response({"response": "Failed"}, status=status.HTTP_403_FORBIDDEN)

    if request.method == "GET":
        response = []
        user_applications = models.Applications.objects.filter(user_id_id = request.user.id).order_by('application_id')
        for i in range(0, len(user_applications)):
            data = {
                "application_id": user_applications[i].application_id,
                "application_date": user_applications[i].application_date,
                "application_status": user_applications[i].application_status,
                "application_last_updated": user_applications[i].application_last_updated
            }
            response.append(data)
        return Response(response, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def applicationDetails(request):
    if request.method == 'GET':
        application_details = []
        request_application_id = re.sub('[^A-Za-z0-9]+', '', request.GET['application_id'])
        profile = models.Applications.objects.filter(application_id = request_application_id).select_related('user_id')
        for data in profile:
            profile_data = {
                "remarks": data.remarks,
                "applicant_photo": data.user_id.photo,
                "applicant_contact": data.user_id.contact_number,
                "applicant_id": data.user_id.id_proof,
                "applicant_name": data.user_id.name,
                "application_date": data.application_date,
                "application_status": data.application_status,
                "collected_date": data.collected_date,
                "issued_date": data.issued_date,
                "user_type": data.user_type,
                "is_accused": data.is_accused,
                "bar_id": data.user_id.bar_certificate,
            }
        get_application_details = models.ApplicationDetails.objects.filter(application_id_id = request_application_id)
        for i in range(0,len(get_application_details)):
            case_number = get_application_details[0].case_number
            parties = get_application_details[0].parties,
            copies = get_application_details[0].number_of_copies
            application_data = {
                "id": get_application_details[i].id,
                "cnr": get_application_details[i].cnr_number,
                "order_number": get_application_details[i].order_number,
                "order_date": get_application_details[i].order_date,
                "number_of_pages": get_application_details[i].number_of_pages,
                "number_of_copies": get_application_details[i].number_of_copies,
            }
            get_certified_copy = models.CertifiedCopies.objects.filter(application_id_id = request_application_id, order_judgement = get_application_details[i].order_date)
            for g in get_certified_copy:
                copy_data = {
                    "copy": g.certified_copy,
                    "date": g.order_judgement,
                }
                try:
                    if(application_data['order_date'] == copy_data['date']):
                        application_data['copies'] = copy_data
                    else:
                        pass
                except:
                    pass
            application_details.append(application_data)
        case_details = {
            'case_number': case_number,
            'parties': parties
        }    
        try:
            get_payment_details = models.Payments.objects.get(application_id_id = request_application_id)
            payment_details = {
                "total_cost": get_payment_details.calculated_amount,
                "mode_of_payment": get_payment_details.mode_of_payment,
                "total_pages": get_payment_details.pages,
                "copies": copies,
                "receipt": get_payment_details.receipt,
                "reason": get_payment_details.reason,
            }
            return Response({"application_details": application_details, "payment_details": payment_details, "profile": profile_data, "case_details": case_details}, status=status.HTTP_200_OK)
        except:
            return Response({"application_details": application_details,"case_details": case_details}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getApplications(request):
    if request.method == "GET":
        response_data = []
        request_status = re.sub('[^A-Za-z0-9]+', '', request.GET['status'])
        user=User.objects.get(id=request.user.id)
        group=Group.objects.all()
        for i in range(0, len(group)):
            try:
                role=user.groups.get(id=group[i].id)
            except:
                pass
        if role.id == 2:
            get_applications = models.Applications.objects.filter(application_status=request_status).select_related('user_id').order_by('application_id')
            for application in get_applications:
                data = {
                    "application_id": application.application_id,
                    "applicant_name": application.user_id.name,
                    "applicant_contact": application.user_id.contact_number,
                    "application_date": application.application_date,
                }
                response_data.append(data)
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            return Response({"Access Restricted !!"}, status=status.HTTP_200_OK)
    if request.method == "POST":
        name = acc_models.UserProfile.objects.get(user_id=request.user.id)
        name = name.name
        user=User.objects.get(id=request.user.id)
        group=Group.objects.all()
        for i in range(0, len(group)):
            try:
                role=user.groups.get(id=group[i].id)
            except:
                pass
        if role.id == 2:
            copies = []
            update_application = models.Applications.objects.filter(application_id = request.POST['application_id']).select_related('user_id').select_related('payments')
            copy = models.CertifiedCopies.objects.filter(application_id_id=request.POST['application_id'])
            if request.POST['status'] == 'Pending':
                if update_application[0].remarks is None:
                    update_application.update(remarks=Concat('remarks', Value('Admin: '+request.POST['remarks'])))
                else:
                    update_application.update(remarks=Concat('remarks', Value('|Admin: '+request.POST['remarks'])))
            if request.POST['status'] == 'Completed':
                getP = models.Payments.objects.get(application_id_id=request.POST['application_id'])
                mode = getP.mode_of_payment
                getCount1 = models.ApplicationDetails.objects.filter(application_id_id=request.POST['application_id']).count()
                getCount2 = models.CertifiedCopies.objects.filter(application_id_id=request.POST['application_id']).count()
                if (mode == 'Email' or mode == 'Both') and getCount1 != getCount2:
                    return Response({'response': 'invalid'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    data = request.POST['complete_receipt']
                    format, imgstr = data.split(';base64,') 
                    ext = format.split('/')[-1]
                    file_name = request.POST['application_id']+'_receipt.'+ext
                    with open('media/certified_copies_receipt/'+file_name, "wb+") as f:
                        f.write(base64.b64decode(imgstr))
                    if update_application[0].remarks is None:
                        if(mode == 'Email'):
                            update_application.update(remarks=Concat('remarks', Value('Admin: '+request.POST['remarks'])), application_status='Collected',display_message='Certified Copy ready for collection from the filing counter', issued_date = datetime.datetime.today().strftime('%Y-%m-%d'), collected_date = datetime.datetime.today().strftime('%Y-%m-%d'))
                            update_payment = models.Payments.objects.filter(application_id_id = request.POST['application_id']).update(paid_amount=0)
                        else:
                            update_application.update(remarks=Concat('remarks', Value('Admin: '+request.POST['remarks'])), application_status=request.POST['status'],display_message='Certified Copy ready for collection from the filing counter', issued_date = datetime.datetime.today().strftime('%Y-%m-%d'))
                    else:
                        if(mode == 'Email'):
                            update_application.update(remarks=Concat('remarks', Value('|Admin: '+request.POST['remarks'])), application_status='Collected',display_message='Certified Copy ready for collection from the filing counter', issued_date = datetime.datetime.today().strftime('%Y-%m-%d'), collected_date = datetime.datetime.today().strftime('%Y-%m-%d'))
                            update_payment = models.Payments.objects.filter(application_id_id = request.POST['application_id']).update(paid_amount=0)
                        else:
                            update_application.update(remarks=Concat('remarks', Value('|Admin: '+request.POST['remarks'])), application_status=request.POST['status'],display_message='Certified Copy ready for collection from the filing counter', issued_date = datetime.datetime.today().strftime('%Y-%m-%d'), collected_date = datetime.datetime.today().strftime('%Y-%m-%d'))
                    for c in copy:
                        copies.append(c.certified_copy)
                    for t in update_application:
                        if(t.payments.mode_of_payment == 'Email' or t.payments.mode_of_payment == 'Both'):
                            send_email(t.user_id.email, request.POST['application_id'], copies)
                        send_confirmation(t.user_id.contact_number, request.POST['application_id'])
                
            if request.POST['status'] == 'Collected':
                with transaction.atomic():
                    update_payment = models.Payments.objects.filter(application_id_id = request.POST['application_id']).update(paid_amount=request.POST['paid_amount'])
                    update_application.update(application_status=request.POST['status'], collected_date = datetime.datetime.today().strftime('%Y-%m-%d'))

            return Response("Updated Successfully !!!", status=status.HTTP_202_ACCEPTED)
        elif role.id == 3 or role.id == 4 or role == 5:
            update_application = models.Applications.objects.filter(application_id = request.POST['application_id'])
            if update_application[0].remarks is None:
                update_application.update(remarks=Concat('remarks', Value(name+': '+request.POST['remarks'])))
            else:
                update_application.update(remarks=Concat('remarks', Value('|'+name+': '+request.POST['remarks'])))
            return Response("Updated Successfully !!!", status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"Access Restricted !!"}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsAdminUser])
def applicationHistory(request):
    if request.method == "GET":
        response_data = []
        get_application_history = models.Applications.objects.filter(application_status = 'Collected').select_related('user_id').select_related('payments').order_by('application_id')
        for application_history in get_application_history:
            data = {
                "application_id": application_history.application_id,
                "applicant_name": application_history.user_id.name,
                "applicant_contact": application_history.user_id.contact_number,
                "application_date": application_history.application_date,
                "application_last_updated": application_history.application_last_updated,
                "calculated_amount": application_history.payments.calculated_amount,
                "paid_amount": application_history.payments.paid_amount,
            }
            response_data.append(data)
        return Response(response_data, status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateDraftApplication(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        details = list(data['data'])
        applicationId = re.sub('[^A-Za-z0-9]+', '', data['application_id'])
        update = models.ApplicationDetails.objects.filter(application_id_id=applicationId).delete()
        for i in range(0,data['count']):
            application_details = models.ApplicationDetails.objects.create(
                application_id_id = applicationId,
                cnr_number=details[i]['cnr_number'],
                case_number=details[i]['case_number'],
                order_number=details[i]['order_number'],
                order_date=details[i]['order_date'],
                number_of_pages=details[i]['number_of_pages'],
                parties = details[i]['parties'],
            )
            application_details.save()
        return Response({"response": "Data Added Successfully !!!", "id":applicationId}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def deleteDraftApplication(request):
    if request.method == 'POST':
            applicationId = re.sub('[^A-Za-z0-9]+', '', request.POST['application_id'])
            with transaction.atomic():
                delete1 = models.ApplicationDetails.objects.filter(application_id_id=applicationId).delete()
                delete2 = models.Applications.objects.filter(application_id=applicationId).delete()
            return Response({"response": "Data Added Successfully !!!", "id":applicationId}, status=status.HTTP_201_CREATED)

@api_view(['POST', 'GET', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def uploadCertifiedCopy(request):
    if request.method == 'GET':
        id = re.sub('[^A-Za-z0-9]+', '', request.GET['application_id'])
        res = []
        copy = models.CertifiedCopies.objects.filter(application_id_id=id).order_by('certified_copy')
        for c in copy:
            data = {
                "application_id": c.application_id_id,
                "certified_copy": c.certified_copy,
                "order_judgement": c.order_judgement,
            }
            res.append(data)
        return Response(res, status=status.HTTP_200_OK)
    if request.method == 'POST':
        try:
            check = models.CertifiedCopies.objects.get(certified_copy = request.POST['copy_name'])
            return Response({"response": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        except: 
            if request.FILES:
                fs = FileSystemStorage(location='media/certified_copies')
                fs.save(request.POST['copy_name'],request.FILES['copy'])
                try:
                    check = checker('media/certified_copies/'+request.POST['copy_name'])
                except:
                    pass
                if check == 0:
                    fs.delete(request.POST['copy_name'])
                    return Response({"response": "Digital"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    copy = models.CertifiedCopies.objects.create(
                        application_id_id = request.POST['application_id'],
                        certified_copy = request.POST['copy_name'],
                        order_judgement = request.POST['order_judgement'],
                        )
                    copy.save()
            return Response({"response": "Copy Uploaded Successfully !!!"}, status=status.HTTP_201_CREATED)
    if request.method == 'DELETE':
        fs = FileSystemStorage(location='media/certified_copies')
        fs.delete(request.GET['filename'])
        copy = models.CertifiedCopies.objects.filter(certified_copy=request.GET['filename']).delete()
        return Response({"response": "Copy Deleted Successfully !!!"}, status=status.HTTP_201_CREATED)
    return Response({"response": "Error"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def addQR(request):
    if request.method == 'POST':
        get = models.ApplicationDetails.objects.get(application_id_id=request.POST['application_id'],id=request.POST['id'])
        print(get.encrypted_id)
        get.encrypted_id = request.POST['view']
        get.save()
        return Response({"response": "QR Generated Successfully"}, status=status.HTTP_200_OK)

@csrf_exempt
def view(request):
    if request.method == 'GET':
        id = re.sub('[^A-Za-z0-9]+', '', request.GET['id'])
        res = []
        get = models.ApplicationDetails.objects.filter(encrypted_id=id).select_related('application_id')
        for g in get:
            data = {
                "date_of_application": g.application_id.application_date,
                "pages": g.number_of_pages,
                "copy_collected_date": g.application_id.collected_date,
                "issued_date": g.application_id.issued_date,
                "application_id": g.application_id.application_id,
                "applicant_name": g.application_id.user_id.name,
                "parties": g.parties,
                "case_no": g.case_number,
            }
            res.append(data)
        return JsonResponse(res, status=status.HTTP_200_OK, safe=False)
    return JsonResponse({"response": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        
def generateAppId(n):
    application_id = n.split('%s%s' % (code,yy))
    integer = int(application_id[1])
    integer = integer + 1
    generated_app_id = code+''+str(yy)+''+f"{integer:05d}"
    return generated_app_id

def send_confirmation(mobile_number, application_id):
    message = 'Your Application No. '+application_id+' is ready to be collected from the filing counter. -High Court of Sikkim'
    username = 'courts-sik.sms'
    pin = 'K1tG1Vsm'
    signature = 'SHCSMS'
    entity_id = '1101444310000040161'
    template_id = '1107165915955531879'
    try:
        url = "https://smsgw.sms.gov.in/failsafe/HttpLink?username="+username+"&pin="+pin+"&message="+message+"&mnumber="+mobile_number+"&signature="+signature+"&dlt_entity_id="+entity_id+"&dlt_template_id="+template_id
        requests.get(url, verify=False)
        print('Message Sent')
        return None
    except Exception as e:
        print(e)

def send_email(email, application_id, copies):
    msg = MIMEMultipart()
    dir_path = 'media/certified_copies'
    dir_path2 = 'media/certified_copies_receipt'
    fromaddr = "rsrajuofficial@gmail.com"
    toaddr = email
    password = "fwhwqqlpllxszoei"
    msg['From'] = fromaddr
    msg['To'] = toaddr
    msg['Subject'] = "Certified Copy: Application ID "+application_id
    body = "Your Application ID "+application_id+" has been successfully approved. The certified copies have been digitally signed and is attached to this mail."
    msg.attach(MIMEText(body, 'plain'))
    for f in copies:  # add files to the message
        file_path = os.path.join(dir_path, f)
        attachment = MIMEApplication(open(file_path, "rb").read(), _subtype="txt")
        attachment.add_header('Content-Disposition','attachment', filename=f)
        msg.attach(attachment)
    file_path2 = os.path.join(dir_path2, application_id+'_receipt.pdf')
    receipt_attachment = MIMEApplication(open(file_path2, "rb").read(), _subtype="txt")
    receipt_attachment.add_header('Content-Disposition','attachment', filename=application_id+'_receipt.pdf')
    msg.attach(receipt_attachment)
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login(fromaddr, password)
    text = msg.as_string()
    s.sendmail(fromaddr, toaddr, text)
    s.quit()
