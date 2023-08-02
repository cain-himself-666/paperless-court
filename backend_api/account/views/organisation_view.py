from rest_framework import (
    generics
    )

from account import (models as acc_models,
                    serializers as acc_serializers
                    
)

class OrganisationList(generics.ListCreateAPIView):
    queryset = acc_models.Organisation.objects.all().order_by('-id')
    serializer_class = acc_serializers.OrganisationSerializer


class OrganisationDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = acc_models.Organisation
    serializer_class = acc_serializers.OrganisationSerializer


