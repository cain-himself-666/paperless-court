from rest_framework import generics, status, response
from rti import (models as rti_models,
                 serializers as rti_serializeer
                 )
import json
from django.db import ( transaction, 

)


class ApplicationForwardedDetailsList(generics.ListCreateAPIView):
    queryset = rti_models.ApplicationForwardedDetails.objects.all().order_by('-id')
    serializer_class = rti_serializeer.ApplicationForwardedDetailsSerializer

    @transaction.atomic()
    def post(self, request, *args, **kwargs):
        data=request.data.get('data')
        print("Requested Data:",data)
        data=json.loads(request.data.get('data'))
        self.request.data._mutable=True
        if data:
            for item in data:
               
                self.request.data['application'] = item['application']
                self.request.data['forwarded_to_address'] = item['forwarded_to_address']
                self.request.data['forwarded_on'] = item['forwarded_on']
                self.request.data['remarks'] = item['remarks']
                self.request.data['forwarded_by'] = self.request.user.id

                self.create(request,*args, **kwargs)

            rti_models.Application.objects.filter( id = data[0]['application'] ).update(is_completed_by_hc = request.data.get('is_completed_by_hc'))
       
        self.request.data._mutable=False

        return response.Response({'message':'Record inserted sucessfully..'}, status.HTTP_201_CREATED) 

class ApplicationForwardedDetailsDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = rti_models.ApplicationForwardedDetails
    serializer_class = rti_serializeer.ApplicationForwardedDetailsSerializer

    def perform_update(self, serializer):
        self.request.data._mutable=True
        self.request.data['forwarded_by']= self.request.user.id
        self.request.data._mutable=False
        return super().perform_update(serializer)

