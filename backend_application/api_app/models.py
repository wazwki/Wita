from django.db import models
from django.contrib.auth.models import User, Group
from django.core.exceptions import ValidationError


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True, related_name='user_profiles')

    def __str__(self):
        return f'name: {self.user.username}'


class Company(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    users = models.ManyToManyField(User, related_name='companies')
    group = models.OneToOneField(Group, on_delete=models.CASCADE, related_name='company', null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_companies', blank=True)

    def __str__(self):
        return f'name: {self.name}'

    def save(self, *args, **kwargs):
        creating = self._state.adding
        super().save(*args, **kwargs)
        if creating:
            group = Group.objects.create(name=f"{self.name} Group")
            self.group = group
            self.save()


class Command(models.Model):
    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, related_name='commands', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='commands')
    projects = models.ManyToManyField('Project', related_name='commands')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_commands', blank=True)

    def __str__(self):
        return f'name: {self.name}'


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    company = models.ForeignKey(Company, related_name='projects', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='projects')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_projects', blank=True)

    def __str__(self):
        return f'name: {self.name}'


class Task(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=[('to_do', 'TO DO'), ('in_progress', 'IN PROGRESS'), ('code_review', 'CODE REVIEW'), ('done', 'DONE')])
    command = models.ForeignKey(Command, related_name='tasks', on_delete=models.CASCADE)
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)
    assigned_to = models.ManyToManyField(User, related_name='tasks')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_tasks', blank=True)
    company = models.ForeignKey(Company, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return f'name: {self.name}'

    def clean(self):
        command = self.command
        project = self.project
        if command.company_id != project.company_id:
            raise ValidationError('Command and Project must belong to the same Company.')
