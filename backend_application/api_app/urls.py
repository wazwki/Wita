from django.urls import path, re_path
from django.views.generic import TemplateView

from rest_framework.routers import SimpleRouter

from .swagger import schema_view
from . import views

router = SimpleRouter()

router.register(r'test', views.ContactViewSet)

urlpatterns = [
    path('swagger-ui/', TemplateView.as_view(template_name='swaggerui/swaggerui.html', extra_context={'schema_url': 'openapi-schema'}), name='swagger-ui'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
]

urlpatterns += router.urls