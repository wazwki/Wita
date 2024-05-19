from django.db import models
from django.contrib.auth.models import User


class Test(models.Model):
    ''' Models for test '''
    mail = models.EmailField(max_length=254)
    text = models.SlugField(max_length=254)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'id: {self.id}, {self.mail}'