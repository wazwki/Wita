"""
Django settings for application_settings project.
Generated using Django 5.0.6.
"""

from pathlib import Path
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()
os.getenv("")

BASE_DIR = Path(__file__).resolve().parent.parent

PROJECT_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = os.getenv("SECRET_KEY")

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_filters',
    'social_django',
    'rest_framework_simplejwt',
    'drf_yasg',
    'redis',
    'celery',
    'corsheaders',
    'main_app.apps.MainAppConfig',
    'api_app.apps.ApiAppConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'application_settings.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            PROJECT_DIR / "templates/main_app/",
            PROJECT_DIR / "templates/"
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'application_settings.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv("DB_NAME"),
        'USER': os.getenv("DB_USER"),
        'PASSWORD': os.getenv("DB_PASSWORD"),
        'HOST': os.getenv("DB_HOST"),
        'PORT': os.getenv("DB_PORT")
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

STATIC_ROOT = PROJECT_DIR / 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': ('rest_framework.renderers.JSONRenderer',),
    'DEFAULT_PARSER_CLASSES': ('rest_framework.parsers.JSONParser',),
    'DEFAULT_AUTHENTICATION_CLASSES': (
    'rest_framework_simplejwt.authentication.JWTAuthentication',
    'rest_framework.authentication.SessionAuthentication',),
#    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
#    'PAGE_SIZE': 100
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

SOCIAL_AUTH_JSONFIELD_ENABLED = True

AUTHENTICATION_BACKENDS = (
    'social_core.backends.github.GithubOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

SOCIAL_AUTH_GITHUB_KEY = os.getenv("SOCIAL_AUTH_GITHUB_KEY")

SOCIAL_AUTH_GITHUB_SECRET = os.getenv("SOCIAL_AUTH_GITHUB_SECRET")

LOGIN_URL = 'login'
LOGOUT_URL = 'logout'
LOGIN_REDIRECT_URL = 'http://localhost:5173/'
LOGOUT_REDIRECT_URL = 'http://localhost:5173/'

SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS': {
        'Bearer': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header',
        },
    },
}

CELERY_BROKER_URL = 'amqp://localhost'
CELERY_RESULT_BACKEND = "redis://redis:6379/0"
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": "redis://redis:6379",
         "OPTIONS": {
            "db": "1",
            "parser_class": "redis.connection.PythonParser",
            "pool_class": "redis.BlockingConnectionPool",
        },
    }
}