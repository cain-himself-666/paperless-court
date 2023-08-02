from django.db import models

# Create your models here.
class CaseDetails(models.Model):
    case_no = models.CharField(unique=True, max_length=20, null=False)
    cnr = models.CharField(max_length=30, null=False)
    first_petitioner = models.CharField(max_length=128, null=False)
    first_respondent = models.CharField(max_length=128, null=False)

class Advocates(models.Model):
    case_id = models.ForeignKey(CaseDetails, on_delete=models.CASCADE)
    counsel_name = models.CharField(max_length=128, null=True)
    counsel_for = models.CharField(max_length=2, null=True)

class Additional(models.Model):
    case_id = models.ForeignKey(CaseDetails, on_delete=models.CASCADE)
    name = models.CharField(max_length=128, null=True)
    type = models.CharField(max_length=2, null=True)

class Documents(models.Model):
    case_id = models.ForeignKey(CaseDetails, on_delete=models.CASCADE)
    document_type = models.CharField(max_length=50, null=False)
    display_name = models.CharField(max_length=512, null=True)
    document = models.CharField(max_length=256, null=True)

class CauseList(models.Model):
    display_s_no = models.CharField(max_length=5, null=False)
    case_id = models.ForeignKey(CaseDetails, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=2048, null=True)
    date = models.DateField(default=None)

class Notes(models.Model):
    case_id = models.ForeignKey(CaseDetails, on_delete=models.CASCADE)
    note = models.CharField(max_length=255, default=None, null=True)
    date = models.DateTimeField(auto_now=True)

class Bookmarks(models.Model):
    case_id = models.ForeignKey(CaseDetails, on_delete=models.CASCADE)
    document_id = models.ForeignKey(Documents, on_delete=models.CASCADE)
    page_no = models.CharField(max_length=3, default=None, null=False)
    bookmark_label = models.CharField(max_length=255, default=None, null=True)

class DocumentMaster(models.Model):
    document_type = models.CharField(max_length=512, default=None)

class DocumentIndexes(models.Model):
    doc_id = models.ForeignKey(Documents, on_delete=models.CASCADE)
    name = models.CharField(max_length=256, default=None, null=False)
    page = models.BigIntegerField(default=None, null=False)
