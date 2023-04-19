from rest_framework import serializers
from .models import *


class loginSerializer(serializers.Serializer):
    email = serializers.EmailField(required = True)
    password = serializers.CharField(required = True)

class ChangePasswordSerializer(serializers.Serializer):
    old = serializers.CharField(required = True)
    new = serializers.CharField(required = True)

class signupSerializer(serializers.Serializer):
    name = serializers.CharField(required = True)
    email = serializers.EmailField(required = True)
    phone = serializers.CharField(required = False)
    password = serializers.CharField(required = True)

class otpSerializer(serializers.Serializer):
    otp = serializers.IntegerField(required = True)
    pw = serializers.CharField(required = False)

class emailSerializer(serializers.Serializer):
    email = serializers.EmailField(required = True)

class CustomerNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["name", "profile_pic"]

class CustomerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["name", "email", "phone"]

class RemoveAdminSerializer(serializers.Serializer):
    text = serializers.CharField(required = True)
    otp = serializers.IntegerField(required = True)

class SellerDisplaySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["name", "email", "phone"]
