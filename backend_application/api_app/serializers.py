''' Serializers for mainapp '''
from django.contrib.auth.models import User

from rest_framework.serializers import ModelSerializer

from .models import Task, Command, Project, Company


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        return user


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')


class TaskSerializer(ModelSerializer):
    ''' Serializer for tasks '''
    class Meta:
        model = Task
        fields = '__all__'


class CommandSerializer(ModelSerializer):
    ''' Serializer for commands '''
    class Meta:
        model = Command
        fields = '__all__'


class CompanySerializer(ModelSerializer):
    ''' Serializer for company '''
    class Meta:
        model = Company
        fields = '__all__'


class ProjectSerializer(ModelSerializer):
    ''' Serializer for projects '''
    class Meta:
        model = Project
        fields = '__all__'
