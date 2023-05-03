from rest_framework import serializers
from rest_framework_gis import serializers as gis_serializers
from .models import *


class DistrictModelSerializer(gis_serializers.GeoModelSerializer):
    class Meta:
        model = DistrictModel
        geo_field = ("region")
        fields = ["id", "name", "region"]

class TestSerializer(serializers.Serializer):
    line = serializers.CharField(required=True)
