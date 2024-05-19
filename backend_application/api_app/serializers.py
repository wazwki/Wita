''' Serializers for mainapp '''
from rest_framework.serializers import ModelSerializer

from .models import Test


class TestSerializer(ModelSerializer):
    ''' Serializer for tets '''
    class Meta:
        model = Test
        fields = '__all__'