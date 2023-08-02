# Generated by Django 4.0.4 on 2023-04-15 05:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
        ('crs', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserOTP',
        ),
        migrations.AlterField(
            model_name='applications',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.userprofile'),
        ),
        migrations.AlterField(
            model_name='mycases',
            name='username',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.userprofile'),
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]