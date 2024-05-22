''' API for main app '''
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View

from .permissions import IsOwnerOrStaffOrReadOnly
from .serializers import TaskSerializer, CommandSerializer, ProjectSerializer, CompanySerializer
from .models import Task, Command, Project, Company


class GitHubLoginComplete(View):
    @method_decorator(login_required)
    def get(self, request):
        user = request.user
        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })


class TaskViewSet(ModelViewSet):
    ''' API for test '''
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    permission_classes = [AllowAny]
    filterset_fields = ['id']
    search_fields = ['id']
    orderindg_fields = ['id']

    def perform_create(self, serializer):
        serializer.validated_data['owner'] = self.request.user
        serializer.save()


class CommandViewSet(ModelViewSet):
    ''' API for test '''
    queryset = Command.objects.all()
    serializer_class = CommandSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    permission_classes = [AllowAny]
    filterset_fields = ['id']
    search_fields = ['id']
    orderindg_fields = ['id']

    def perform_create(self, serializer):
        serializer.validated_data['owner'] = self.request.user
        serializer.save()


class CompanyViewSet(ModelViewSet):
    ''' API for test '''
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    permission_classes = [AllowAny]
    filterset_fields = ['id']
    search_fields = ['id']
    orderindg_fields = ['id']

    def perform_create(self, serializer):
        serializer.validated_data['owner'] = self.request.user
        serializer.save()


class ProjectViewSet(ModelViewSet):
    ''' API for test '''
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    permission_classes = [AllowAny]
    filterset_fields = ['id']
    search_fields = ['id']
    orderindg_fields = ['id']

    def perform_create(self, serializer):
        serializer.validated_data['owner'] = self.request.user
        serializer.save()