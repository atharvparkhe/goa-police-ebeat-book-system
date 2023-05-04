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

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ["category_name", "colour_hash_codw"]

class LocationSerializer(gis_serializers.GeoModelSerializer):
    class Meta:
        model = LocaitonsModel
        geo_field = ("location")
        exclude = ["created_at", "updated_at", "category"]
