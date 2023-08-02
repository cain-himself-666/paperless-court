
from django.urls import path, include
from account import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path(r'auth/', include('durin.urls')),
    path(r'otp', views.otp),
    path(r'register', views.register),
    path(r'users', views.profile),
    path(r'update-password', views.updatePassword),
    path(r'update-profile',views.updateProfile),

    path('business_role/list', views.BusinessRoleList.as_view()),

    path('account/organisation', views.OrganisationList.as_view()),
    path('account/organisation/<int:pk>', views.OrganisationDetails.as_view())
    
    ]