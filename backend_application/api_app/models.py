from django.db import models
from django.contrib.auth.models import User


class Company(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    users = models.ManyToManyField(User, related_name='companys')

    def __str__(self):
        return f'name: {self.name}'


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
