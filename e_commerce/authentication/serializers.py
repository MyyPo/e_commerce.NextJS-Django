from rest_framework import serializers
from authemail.serializers import SignupSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


from .models import Customer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(MyTokenObtainPairSerializer, self).validate(attrs)

        data.update({'email': self.user.email})
        data.update({'first_name': self.user.first_name})
        return data


class MySignupSerializer(SignupSerializer):
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)


class CustomerSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = Customer
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'phoneNumber')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        entered_email = validated_data.pop('email', None)
        if entered_email and Customer.objects.filter(email__exact=entered_email).exists():
            raise serializers.ValidationError("Provided email is already used")
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        if entered_email is not None:
            instance.email = entered_email
        instance.save()
        return instance       