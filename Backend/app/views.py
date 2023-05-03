from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from .utils import *


class AllDistricts(ListAPIView):
    queryset = DistrictModel.objects.all()
    serializer_class = DistrictModelSerializer

class SingleDistricts(RetrieveAPIView):
    queryset = DistrictModel.objects.all()
    serializer_class = DistrictModelSerializer
    lookup_field = "id"


# @permission_classes([IsAuthenticated])
@api_view(["GET"])
def test(request):
    try:
        obj = DistrictModel.objects.first().region
        print("@@@@@@@@@")
        # print(obj.coords)
        print(obj.dims)
        # divide_region(obj.region)
        print("@@@@@@@@@")
        return Response({"message":"hello"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
def line_input(request):
    try:
        obj = DistrictModel.objects.first().region
        print(obj.dims)
        ser = TestSerializer(data=request.data)
        if ser.is_valid():
            print(str(ser.validated_data["line"]))
            # divide_region(str(obj.dims), str(ser.validated_data["line"]))
        return Response({"message":"hello"}, status=status.HTTP_200_OK)
        # return Response({"error":ser.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error":str(e), "message":"Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)