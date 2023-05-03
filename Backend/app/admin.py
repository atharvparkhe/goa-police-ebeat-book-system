from leaflet.admin import LeafletGeoAdmin
from django.contrib import admin
from .models import *


admin.site.register(CategoryModel)
admin.site.register(LocaitonInchargeModel)

admin.site.register(LocaitonsModel, LeafletGeoAdmin)
admin.site.register(DistrictModel, LeafletGeoAdmin)
admin.site.register(SubDivisionModel, LeafletGeoAdmin)
admin.site.register(StationModel, LeafletGeoAdmin)
admin.site.register(BearAreaModel, LeafletGeoAdmin)
