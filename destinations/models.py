from django.db import models

class Category(models.Model):
    category = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.category

class Destination(models.Model):
    name = models.CharField(max_length=50, unique=True)
    airport = models.CharField(max_length=3)
    address = models.CharField(max_length=50)
    longitude = models.IntegerField(blank=True, null=True)
    latitude = models.IntegerField(blank=True, null=True)
    cost = models.IntegerField(null=True)
    image = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length=5000)
    categories = models.ManyToManyField(Category, related_name='destinations', blank=True)

    def __str__(self):
        return self.name
