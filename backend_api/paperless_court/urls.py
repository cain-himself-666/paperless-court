from django.urls import path
from paperless_court import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path(r'case-entry', views.case_details),
    path(r'upload-docs', views.uploadDocuments),
    path(r'get-cases', views.cases),
    path(r'get-causelist', views.cause_list),
    path(r'view-details', views.getCaseDetails),
    path(r'get-docs', views.getDocuments),
    path(r'note', views.addNotes),
    path(r'bookmark', views.addBookmark),
    path(r'doc-types', views.getDocTypes),
    path(r'doc-indexes', views.getDocumentIndexes),
    path(r'save', views.save_changes),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)