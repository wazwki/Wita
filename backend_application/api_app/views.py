from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views import View
from django.shortcuts import redirect

from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, views

from rest_framework_simplejwt.tokens import RefreshToken

from social_django.utils import psa

from .permissions import IsOwnerOrInGroup
from .serializers import TaskSerializer, CommandSerializer, ProjectSerializer, CompanySerializer, UserSerializer, RegisterSerializer
from .models import Task, Command, Project, Company


class ProfileView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        serializer.save()


@psa('social:complete')
def register_by_access_token(request, backend):
    token = request.GET.get('access_token')
    user = request.backend.do_auth(token)

    if user:
        refresh = RefreshToken.for_user(user)
        return redirect(f'/?token={str(refresh.access_token)}')
    else:
        return redirect('/login')


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
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsOwnerOrInGroup]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(project__group=user.profile.group) | Task.objects.filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, assigned_to=self.request.user)


class CommandViewSet(ModelViewSet):
    queryset = Command.objects.all()
    serializer_class = CommandSerializer
    permission_classes = [IsOwnerOrInGroup]

    def get_queryset(self):
        user = self.request.user
        return Command.objects.filter(group=user.profile.group)

    def perform_create(self, serializer):
        serializer.save(group=self.request.user.profile.group, created_by=self.request.user)


class CompanyViewSet(ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsOwnerOrInGroup]

    def get_queryset(self):
        user = self.request.user
        return Company.objects.filter(group=user.profile.group) | Company.objects.filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(group=self.request.user.profile.group, created_by=self.request.user)


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [OrderingFilter]
    permission_classes = [IsOwnerOrInGroup]
    ordering_fields = ['id']

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(group=user.profile.group) | Project.objects.filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, group=self.request.user.profile.group)
