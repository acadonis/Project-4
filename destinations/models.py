from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(User, related_name='categories', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name

class Destination(models.Model):
    name = models.CharField(max_length=50, unique=True)
    airport = models.CharField(max_length=3, null=True,)
    address = models.CharField(max_length=50)
    longitude = models.IntegerField(blank=True, null=True)
    latitude = models.IntegerField(blank=True, null=True)
    cost = models.IntegerField(null=True)
    image = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length=5000)

    categories = models.ManyToManyField(Category, related_name='destinations')

    user = models.ForeignKey(User, related_name='destinations', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name
