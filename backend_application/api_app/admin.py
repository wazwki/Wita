from django.contrib import admin
from .models import Task, Command, Project, Company, UserProfile

admin.site.register(Task)
admin.site.register(Command)
admin.site.register(Project)
admin.site.register(Company)
admin.site.register(UserProfile)
