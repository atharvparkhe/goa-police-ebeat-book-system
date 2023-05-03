from django.contrib.gis.db import models
from base.models import *


class UserModel(BaseUser):
    profile_pic = models.ImageField(upload_to="profile", height_field=None, width_field=None, max_length=None, null=True, blank=True)
    rank = models.CharField(max_length=30, null=True, blank=True)
    def __str__(self):
        return self.name


class BeatOficer(BaseUser):
    from app.models import BearAreaModel
    profile_pic = models.ImageField(upload_to="profile", height_field=None, width_field=None, max_length=None, null=True, blank=True)
    rank = models.CharField(max_length=30, null=True, blank=True)
    beat = models.ForeignKey(BearAreaModel, related_name="beat_officer", on_delete=models.CASCADE)
    def __str__(self):
        return self.name
