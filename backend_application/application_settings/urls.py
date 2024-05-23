"""
URL configuration for application_settings project.
"""
from django.contrib import admin
from django.urls import path, re_path, include

from api_app.views import GitHubLoginComplete, register_by_access_token


urlpatterns = [
    re_path(r'^admin/?', admin.site.urls),
    path('', include('main_app.urls')),
    path('api/', include('api_app.urls')),
    path('oauth/', include('social_django.urls', namespace='social')),
    path('complete/github/', GitHubLoginComplete.as_view(), name='github_complete'),
    path('oauth/<str:backend>/', register_by_access_token, name='register_by_access_token'),
]
