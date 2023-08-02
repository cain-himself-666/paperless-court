# Generated by Django 4.0.4 on 2023-04-17 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rti', '0004_rename_ducement_url_application_document_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='mailing_address',
            field=models.CharField(default='', max_length=1028),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='application',
            name='document_name',
            field=models.CharField(default='', max_length=256),
        ),
        migrations.AlterField(
            model_name='application',
            name='document_url',
            field=models.FileField(blank=True, null=True, upload_to='documents/2023'),
        ),
    ]
