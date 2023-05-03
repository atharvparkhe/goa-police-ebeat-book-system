from django.urls import path
from . import views
from .views import *


urlpatterns = [

# Main
    path('all-districts/', views.AllDistricts.as_view(), name="all-districts"),
    path('district/<id>/', views.SingleDistricts.as_view(), name="district"),
    
    path('test/', views.test, name="test"),
    
    path('line/', views.line_input, name="line"),
    
    # path('category/', views.CategoryGet.as_view(), name="get-categories"),

]