''' Serializers for mainapp '''
from rest_framework.serializers import ModelSerializer

from .models import Task, Command, Project, Company


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
