
from importlib.resources import path
from django.db import router
from django.urls import include, path
from rest_framework import routers
from rti import views as rti_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('rti/application', rti_views.ApplicationList.as_view()),
    path('rti/application/<int:pk>', rti_views.ApplicationDetails.as_view()),

    path('rti/application/forwrded_to', rti_views.ApplicationForwardedDetailsList.as_view()),
    path('rti/application/forwrded_to/<int:pk>', rti_views.ApplicationForwardedDetailsDetails.as_view()),
]

if settings.DEBUG:
    urlpatterns += static('/media/', document_root=settings.MEDIA_ROOT)

