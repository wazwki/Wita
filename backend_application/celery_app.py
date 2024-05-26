from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'application_settings.settings')

app = Celery('application_settings')

app.config_from_object('django.conf:settings')

app.conf.broker_url = settings.CELERY_BROKER_URL

app.autodiscover_tasks()

app.conf.broker_connection_retry_on_startup = True


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
