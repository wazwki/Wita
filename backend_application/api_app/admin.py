from django.contrib import admin
from .models import Task, Command, Project, Company

admin.site.register(Task)
admin.site.register(Command)
admin.site.register(Project)
admin.site.register(Company)
