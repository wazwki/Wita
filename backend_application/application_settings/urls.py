"""
URL configuration for application_settings project.
"""
from django.contrib import admin
from django.urls import path, re_path, include

from api_app.views import GitHubLoginComplete

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

#from main_app.views import page_not_found

urlpatterns = [
    re_path(r'^admin/?', admin.site.urls),
    path('', include('main_app.urls')),
    path('api/', include('api_app.urls')),
    path('oauth/', include('social_django.urls', namespace='social')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('complete/github/', GitHubLoginComplete.as_view(), name='github_complete'),
]

#handler404 = page_not_found
