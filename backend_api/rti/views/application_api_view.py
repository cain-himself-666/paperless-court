from rest_framework import generics, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction, connection
from rti import serializers as rti_serializer
from durin.auth import TokenAuthentication
from rti import models as rti_models
from django.contrib.auth.models import User
import datetime
from common import sms_manager
from account import models as acc_models
from asgiref.sync import sync_to_async
from django.conf import settings



class ApplicationList(generics.ListCreateAPIView):
    queryset = rti_models.Application.objects.all().order_by('-id')
    serializer_class= rti_serializer.ApplicationSerializer

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        request.data._mutable = True
        request.data['application_no'] = self.generate_application_no()
        request.data['created_by'] = request.user.id

        if(request.data['is_online_application']=='True'):
            request.data['user'] = request.user.id
        
       
        request = self.file_upload_handler(request)     
        
     
        response = self.create(request, *args, **kwargs)
        # user_profile = acc_models.UserProfile.objects.filter(user=request.user.id).first()
        instance=rti_models.Application.objects.get(id=response.data['id'])
        if(request.data['is_online_application']!="True"):
            rti_models.OfflineApplicant.objects.create(
                application = instance,
                applicant_name = request.data['applicant_name'],
                from_department = request.data['from_department'],
                contact_number = request.data['contact_number'],
            )
    
        request.data._mutable = False
        serializer = self.get_serializer(instance)

        return Response(serializer.data, 201)
    
    def file_upload_handler(self, request):

        if 'document_url' in request.FILES:
            file_name_parts = request.data['document_url'].name.split(
                        '.')
            if len(file_name_parts) > 1:
                        request.data['document_url'].name = request.data.get(
                            'application_no') + '.'+file_name_parts[len(file_name_parts)-1]

                        request.data['document_name']=request.data['document_url'].name

        if 'economic_category_proof_url' in request.FILES:
            file_name_parts = request.data['economic_category_proof_url'].name.split(
                        '.')
            if len(file_name_parts) > 1:
                    request.data['economic_category_proof_url'].name ="economic_category_proof_"  +request.data.get(
                            'application_no') + '.'+file_name_parts[len(file_name_parts)-1]
        
        return request
    
    def generate_application_no(self):

        latest_record = rti_models.Application.objects.last()
        # date_object = datetime.datetime.strptime(data['checkin_date'], '%Y-%m-%d')

        two_digit_year =datetime.datetime.now().year % 100
        reservation_month =datetime.datetime.now().month
        sl_no = 1
        if latest_record and property:
            application_no = latest_record.application_no
            print('Application No:',application_no)
            if application_no:

                year = application_no[-7:-5]
                print('year:',year)
                sl_no = int(application_no[-5:])

                if two_digit_year == int(year):
                    sl_no = sl_no + 1
                else:
                    sl_no = 1

        return 'RTI'  + f"{reservation_month:02d}" + str(two_digit_year)+f"{sl_no:05d}"


        
    # @transaction.atomic
    # def perform_create(self, serializer):

    #     self.request.data._mutable = True
    #     self.request.data['application_no'] = generate_application_no(self)
    #     self.request.data['created_by'] = self.request.user.id

    #     if(self.request.data['is_online_application']):
    #         self.request.data['user'] = self.request.user.id
        
    #     if 'document_url' in self.request.FILES:
    #             file_name_parts = self.request.data['document_url'].name.split(
    #                 '.')
    #             if len(file_name_parts) > 1:
    #                 self.request.data['document_url'].name = self.request.data.get(
    #                     'application_no') + '.'+file_name_parts[len(file_name_parts)-1]

    #                 self.request.data['document_name']=self.request.data['document_url'].name

    #     if 'economic_category_proof_url' in self.request.FILES:
    #         file_name_parts = self.request.data['economic_category_proof_url'].name.split(
    #                 '.')
    #         if len(file_name_parts) > 1:
    #             self.request.data['economic_category_proof_url'].name ="economic_category_proof_"  +self.request.data.get(
    #                     'application_no') + '.'+file_name_parts[len(file_name_parts)-1]

    #     isinstance = serializer.save()

    #     print('Is Offline:',self.request.data['is_online_application'])
       
    #     if(self.request.data['is_online_application']):
    #         pass
    #     else:
    #         print('Inside Else:',"Yes")
    #         rti_models.OfflineApplicant.objects.create(
    #             application = isinstance,
    #             applicant_name = self.request.data['applicant_name'],
    #             from_department = self.request.data['from_department'],
    #             contact_number = self.request.data['contact_number'],
    #         )
    
    #     # user_profile = acc_models.UserProfile.objects.filter(user=self.request.user.id).first()
    #     # if user_profile:
    #     #     #  sync_to_async(sms_manager.send_sms(user_profile.contact_number,"",""),thread_sensitive=True )
    #     #     pass
    #     self.request.data._mutable = False
    #     return isinstance
    
    def get_queryset(self):
        group = self.request.user.groups.first()
        queryset= rti_models.Application.objects.all()
        print("User ID",self.request.user.id)
        status = self.request.query_params.get('status')
        if status:
              queryset= queryset.filter(status=status)
        
        if group:
            if group.name == settings.USER_ROLES['general_user']:
                print("User ID",self.request.user.id)
                queryset= queryset.filter(user=self.request.user.id).order_by('-id')
            if group.name == settings.USER_ROLES['hc_rti_admin']:
                queryset= queryset.order_by('-id')
            if group.name == settings.USER_ROLES['dc_rti_admin']:
                user_profile=acc_models.UserProfile.objects.filter(user=self.request.user.id).last()
                
                if(user_profile):
                    queryset= queryset.filter(application_forwaded_details__forwarded_to=user_profile.organisation).order_by('-id')
                else:
                     queryset=[]
       
        
        return queryset

    
    # def get_queryset(self):
    #     queryset = rti_models.Application.objects.filter(user=self.request.user).order_by('-id')
    #     return queryset

class ApplicationDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = rti_models.Application
    serializer_class= rti_serializer.ApplicationSerializer

    




