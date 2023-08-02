# Generated by Django 4.0.4 on 2023-06-07 07:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rti', '0015_application_is_completed_by_hc_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='fee_intimation_date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='application',
            name='fee_payment_date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='application',
            name='is_concern_of_life_liberty',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='application',
            name='is_sensory_disabled',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='application',
            name='reason_of_rejection',
            field=models.CharField(blank=True, max_length=2048, null=True),
        ),
        migrations.AlterField(
            model_name='application',
            name='applied_on',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='application',
            name='deadline_on',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='application',
            name='received_on',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='applicationforwardeddetails',
            name='forwarded_on',
            field=models.DateTimeField(),
        ),
        migrations.CreateModel(
            name='IntimationDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('intimation_type', models.CharField(default='', max_length=128)),
                ('contents', models.CharField(default='', max_length=2048)),
                ('date_of_intimation', models.DateTimeField()),
                ('application', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='intimation_details', to='rti.application')),
                ('intimation_sent_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='intimation_details', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FeeDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('particulars', models.CharField(default='', max_length=2048)),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('is_amount_recieved', models.BooleanField(default=False)),
                ('date_of_payment', models.DateTimeField()),
                ('is_invalid', models.BooleanField(default=False)),
                ('reason_for_invalid', models.CharField(default='', max_length=1028)),
                ('application', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='fee_details', to='rti.application')),
            ],
        ),
    ]
