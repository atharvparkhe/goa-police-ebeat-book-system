# Generated by Django 4.2 on 2023-05-03 10:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_beatoficer_beat'),
        ('app', '0002_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PoliceAreaModel',
            new_name='StationModel',
        ),
    ]
