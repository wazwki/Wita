"""
ASGI config for application_settings project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'application_settings.settings')

application = get_asgi_application()
