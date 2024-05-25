from django.urls import path, re_path
from django.views.generic import TemplateView

from rest_framework.routers import SimpleRouter

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import RegisterView, ProfileView, UserView
from .swagger import schema_view
from . import views


router = SimpleRouter()

router.register(r'task', views.TaskViewSet)
router.register(r'command', views.CommandViewSet)
router.register(r'company', views.CompanyViewSet)
router.register(r'project', views.ProjectViewSet)


urlpatterns = [
    path('swagger-ui/', TemplateView.as_view(template_name='swaggerui/swaggerui.html',
        extra_context={'schema_url': 'openapi-schema'}), name='swagger-ui'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0),
        name='schema-json'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('user/', UserView.as_view(), name='user'),
]

urlpatterns += router.urls
