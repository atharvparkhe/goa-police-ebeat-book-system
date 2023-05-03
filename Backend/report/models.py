from django.contrib.gis.db import models as gis_models
from base.models import BaseModel
from django.db import models
from .validators import *
from authentication.models import UserModel


class ReportModel(BaseModel):
    bo = models.ForeignKey(UserModel, related_name="beat_officer_report", on_delete=models.CASCADE)
    location = gis_models.PointField(srid=4326)
    photo = models.ImageField(upload_to="report", height_field=None, width_field=None, max_length=None)
    audio = models.FileField(upload_to=None, max_length=100, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    priority = models.FloatField(default=5, validators=[validate_stars])
    def __str__(self):
        return self.category_name


class FlaggedLocation(BaseModel):
    title = models.CharField(max_length=50)
    location = gis_models.PointField(srid=4326)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    def __str__(self):
        return self.title

