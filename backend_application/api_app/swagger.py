from django.urls import include, path
from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Wita API",
        default_version='v0.1',
        description="This test API, can working unstable",
        terms_of_service="/",
        contact=openapi.Contact(email="vazkildi@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    patterns=[path('api/', include('api_app.urls')), ],
    public=True,
    permission_classes=(permissions.AllowAny,),
)