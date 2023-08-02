"""
URL configuration for backend_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from account import urls as acc_urls
from paperless_court import urls as ecourts_urls
from crs import urls as crs_urls
from rti import urls as rti_urls
from common import urls as chat_gpt_urls

urlpatterns = [
    path('api/',include(chat_gpt_urls)),
    path('api/',include(rti_urls)),
    path('api/',include(crs_urls)),
    path('api/',include(acc_urls)),
    path('api/',include(ecourts_urls)),
    path('admin/', admin.site.urls),
]
