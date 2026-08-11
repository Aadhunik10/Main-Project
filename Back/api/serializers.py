from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Product, UserProfile

User = get_user_model()


class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)
    phone = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "confirm_password", "phone"]

    def validate(self, attrs):
        if attrs.get("password") != attrs.get("confirm_password"):
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password", None)
        phone = validated_data.pop("phone", "")
        full_name = validated_data.pop("username")
        email = validated_data["email"]
        user = User.objects.create_user(
            username=email,
            email=email,
            password=validated_data["password"],
            first_name=full_name,
        )
        Token.objects.create(user=user)
        UserProfile.objects.create(user=user, phone=phone)
        return user


class UserSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source="first_name", read_only=True)
    phone = serializers.CharField(source="profile.phone", read_only=True)

    class Meta:
        model = User
        fields = ["id", "fullName", "email", "phone"]


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        user = authenticate(username=email, password=password)
        if not user:
            raise serializers.ValidationError("Unable to log in with provided credentials.")
        attrs["user"] = user
        return attrs

    def create(self, validated_data):
        user = validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)
        return {"token": token.key}


class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.PrimaryKeyRelatedField(read_only=True)
    sellerName = serializers.CharField(source="seller.username", read_only=True)
    sellerEmail = serializers.EmailField(source="seller.email", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "seller",
            "sellerName",
            "sellerEmail",
            "name",
            "category",
            "condition",
            "price",
            "location",
            "description",
            "image",
            "phone",
            "listed_at",
        ]
        read_only_fields = ["seller", "listed_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["seller"] = user
        return super().create(validated_data)
