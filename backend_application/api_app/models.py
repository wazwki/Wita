from django.db import models
from django.contrib.auth.models import AbstractUser


class Company(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f'name: {self.name}'


class User(AbstractUser):
    company = models.ForeignKey(Company, related_name='users', on_delete=models.CASCADE)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text=('The groups this user belongs to. A user will get all permissions '
                   'granted to each of their groups.'),
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )


class Command(models.Model):
    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, related_name='commands', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='commands')
    projects = models.ManyToManyField('Project', related_name='commands')

    def __str__(self):
        return f'name: {self.name}'


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    company = models.ForeignKey(Company, related_name='projects', on_delete=models.CASCADE)
    users = models.ManyToManyField(User, related_name='projects')

    def __str__(self):
        return f'name: {self.name}'


class Task(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    command = models.ForeignKey(Command, related_name='tasks', on_delete=models.CASCADE)
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return f'name: {self.name}'
