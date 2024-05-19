''' API for main app '''
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend


from .permissions import IsOwnerOrStaffOrReadOnly
from .serializers import TestSerializer
from .models import Test


class ContactViewSet(ModelViewSet):
    ''' API for test '''
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    permission_classes = [IsOwnerOrStaffOrReadOnly]
    filterset_fields = ['id']
    search_fields = ['id']
    orderindg_fields = ['id']

    def perform_create(self, serializer):
        serializer.validated_data['owner'] = self.request.user
        serializer.save()