from django.db import models
from django.contrib.auth.models import User, Group
from django.core.exceptions import ValidationError


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True, related_name='user_profiles')

    def __str__(self):
        return f'name: {self.name}'


class Company(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    users = models.ManyToManyField(User, related_name='companies')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='companies')

    def __str__(self):
        return f'name: {self.name}'


class Command(models.Model):
    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, related_name='commands', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='commands')
    projects = models.ManyToManyField('Project', related_name='commands')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='commands')

    def __str__(self):
        return f'name: {self.name}'


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    company = models.ForeignKey(Company, related_name='projects', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='projects')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='projects')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_projects')

    def __str__(self):
        return f'name: {self.name}'


class Task(models.Model):
    CHOICES = (
        (1, 'Added'),
        (2, 'In work'),
        (3, 'Complete'),
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    status = models.PositiveSmallIntegerField(choices=CHOICES)
    command = models.ForeignKey(Command, related_name='tasks', on_delete=models.CASCADE)
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_tasks')

    def __str__(self):
        return f'name: {self.name}'

    def clean(self):
        command = self.command
        project = self.project
        if command.company_id != project.company_id:
            raise ValidationError('Command and Project must belong to the same Company.')
