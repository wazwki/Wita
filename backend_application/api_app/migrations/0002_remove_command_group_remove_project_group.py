# Generated by Django 5.0.6 on 2024-05-25 10:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='command',
            name='group',
        ),
        migrations.RemoveField(
            model_name='project',
            name='group',
        ),
    ]