from django.db import models
from base.models import BaseUser


class UserModel(BaseUser):
    profile_pic = models.ImageField(upload_to="profile", height_field=None, width_field=None, max_length=None, null=True, blank=True)
    rank = models.CharField(max_length=30, null=True, blank=True)
    def __str__(self):
        return self.name
