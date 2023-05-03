from django.contrib.gis.db import models as gis_models
from django.db import models
from base.models import BaseModel
from authentication.models import UserModel


class CategoryModel(BaseModel):
    category_name = models.CharField(max_length=50)
    colour_hash_code = models.CharField(max_length=10, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    def __str__(self):
        return self.category_name


class LocaitonsModel(BaseModel):
    name = models.CharField(max_length=50)
    location = gis_models.PointField(srid=4326)
    category = models.ForeignKey(CategoryModel, related_name="location_type", on_delete=models.CASCADE)
    address = models.TextField(null=True, blank=True)
    photo = models.ImageField(upload_to="locations", height_field=None, width_field=None, max_length=None, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    radius = models.FloatField(null=True, blank=True)
    def __str__(self):
        return self.name


class LocaitonInchargeModel(BaseModel):
    name = models.CharField(max_length=50)
    contact = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    def __str__(self):
        return self.name


##########################################################################################

class ChildModel(BaseModel):
    name = models.CharField(max_length=50)
    region = gis_models.PolygonField(srid=4326)
    class Meta:
        abstract = True

##########################################################################################

class DistrictModel(ChildModel):
    sp = models.OneToOneField(UserModel, related_name="sp", on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class SubDivisionModel(ChildModel):
    dysp = models.OneToOneField(UserModel, related_name="dysp", on_delete=models.CASCADE)
    district = models.ForeignKey(DistrictModel, related_name="sub_divisional", on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class StationModel(ChildModel):
    pi = models.OneToOneField(UserModel, related_name="pi", on_delete=models.CASCADE)
    sub_div = models.ForeignKey(SubDivisionModel, related_name="police_station_region", on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class BearAreaModel(ChildModel):
    sub_div = models.ForeignKey(SubDivisionModel, related_name="beat_area", on_delete=models.CASCADE)
    def __str__(self):
        return self.name
