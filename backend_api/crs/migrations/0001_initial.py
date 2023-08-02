# Generated by Django 4.0.4 on 2023-04-12 11:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdvocateEntries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('adv_name', models.CharField(default=None, max_length=100)),
                ('adv_reg', models.CharField(default=None, max_length=20)),
                ('address', models.CharField(default=None, max_length=254, null=True)),
                ('email', models.CharField(default=None, max_length=254, null=True)),
                ('adv_mobile', models.CharField(default=None, max_length=15)),
                ('adv_gender', models.CharField(default=None, max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Applications',
            fields=[
                ('application_id', models.CharField(default=None, max_length=10, primary_key=True, serialize=False)),
                ('application_date', models.DateField(auto_now_add=True)),
                ('issued_date', models.DateField(auto_now_add=True)),
                ('collected_date', models.DateField(default=None, null=True)),
                ('application_status', models.CharField(default=None, max_length=10)),
                ('remarks', models.CharField(default=None, max_length=2048, null=True)),
                ('display_message', models.CharField(default=None, max_length=128, null=True)),
                ('application_last_updated', models.DateTimeField(auto_now=True)),
                ('user_type', models.CharField(default=None, max_length=15, null=True)),
                ('is_accused', models.BooleanField(default=None, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MyCases',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('case_number', models.CharField(default=None, max_length=20)),
                ('cnr', models.CharField(default=None, max_length=16)),
                ('added_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentsMaster',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('online_mode', models.BigIntegerField(default=None, null=True)),
                ('offline_mode', models.BigIntegerField(default=None, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserOTP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contact', models.CharField(default=None, max_length=10, unique=True)),
                ('otp', models.CharField(default=None, max_length=6)),
                ('opt_date_time', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('name', models.CharField(default=None, max_length=120)),
                ('contact_number', models.CharField(default=None, max_length=10, unique=True)),
                ('email', models.EmailField(default=None, max_length=100, null=True)),
                ('gender', models.CharField(default=None, max_length=6)),
                ('address', models.CharField(default=None, max_length=128, null=True)),
                ('photo', models.CharField(default=None, max_length=100, null=True)),
                ('id_proof', models.CharField(default=None, max_length=100, null=True)),
                ('bar_registration_number', models.CharField(default=None, max_length=30, null=True)),
                ('bar_certificate', models.CharField(default=None, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Payments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mode_of_payment', models.CharField(default=None, max_length=10)),
                ('calculated_amount', models.FloatField(default=None)),
                ('paid_amount', models.FloatField(default=None, null=True)),
                ('receipt', models.CharField(default=None, max_length=15, null=True)),
                ('reason', models.CharField(default=None, max_length=100, null=True)),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('application_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='crs.applications')),
            ],
        ),
        migrations.CreateModel(
            name='MyCasesNote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.CharField(default=None, max_length=1024)),
                ('note_date_time', models.DateTimeField(auto_now_add=True)),
                ('mycase_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crs.mycases')),
            ],
        ),
        migrations.AddField(
            model_name='mycases',
            name='username',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crs.userprofile'),
        ),
        migrations.CreateModel(
            name='CertifiedCopies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certified_copy', models.CharField(blank=True, max_length=100)),
                ('order_judgement', models.CharField(blank=True, max_length=10)),
                ('uploaded_at', models.DateTimeField(auto_now=True)),
                ('application_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crs.applications')),
            ],
        ),
        migrations.AddField(
            model_name='applications',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crs.userprofile'),
        ),
        migrations.CreateModel(
            name='ApplicationDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parties', models.CharField(default=None, max_length=300)),
                ('cnr_number', models.CharField(default=None, max_length=100)),
                ('case_number', models.CharField(default=None, max_length=100)),
                ('order_number', models.BigIntegerField(default=None)),
                ('order_date', models.CharField(default=None, max_length=10)),
                ('number_of_pages', models.BigIntegerField(default=None)),
                ('number_of_copies', models.BigIntegerField(default=None, null=True)),
                ('encrypted_id', models.CharField(max_length=256, null=True)),
                ('application_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crs.applications')),
            ],
        ),
    ]
