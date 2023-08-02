from django.urls import path, include
from crs import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path(r'applications', views.applications),
    path(r'application-details', views.applicationDetails),
    path(r'get-applications', views.getApplications),
    path(r'update-application', views.updateDraftApplication),
    path(r'delete-application',views.deleteDraftApplication),
    path(r'application-history', views.applicationHistory),
    path(r'payments', views.payments),
    path(r'mycases', views.myCases),
    path(r'deletecases', views.deleteCases),
    path(r'notes', views.notes),
    path(r'deletenotes', views.deleteNotes),
    path(r'logs', views.getLogs),
    path(r'copy', views.uploadCertifiedCopy),
    path(r'generate-qr', views.addQR),
    path(r'view', views.view)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)