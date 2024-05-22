from django.contrib import admin
from .models import Task, Command, Project

admin.site.register(Task)
admin.site.register(Command)
admin.site.register(Project)
