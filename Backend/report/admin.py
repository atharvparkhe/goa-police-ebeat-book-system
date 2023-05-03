from leaflet.admin import LeafletGeoAdmin
from django.contrib import admin
from .models import *

admin.site.register(ReportModel, LeafletGeoAdmin)
admin.site.register(FlaggedLocation, LeafletGeoAdmin)
