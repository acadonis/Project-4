from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from .models import Category, Destination

class DestinationTests(APITestCase):

    def setUp(self):
        # create a test user
        user = User.objects.create(username='test', email='test@test.com')

        category = Category.objects.create(category='Beach', user=user)

        destination = Destination.objects.create(name='Lake District', airport='LAK', address='Cumbria', longitude=20, latitude=20, cost=2, image='url', description='Day out on the beach!', user=user)

        destination.categories.set([category])

        # authenticate the client
        self.client.force_authenticate(user=user)

    def test_destinations_index(self):
        url = reverse('destinations-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
    #
    #
    #
    def test_destination_create(self):
        """
        Should return the created destination
        """

        url = reverse('destinations-list')
        data = {

        "name": "Brhton",
        "airport": "BRI",
        "address": "South Coast",
        "longitude": 20,
        "latitude": 2,
        "cost": 4,
        "image": "https:ton-ity=75&width=1680&height=940",
        "description": "Day out on Brighton Beach!",
        "categories": [1],
        "user": 1
        }
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Destination.objects.count(), 2)
        self.assertJSONEqual(response.content, {
            'id': 2,
            "name": "Brhton",
            "airport": "BRI",
            "address": "South Coast",
            "longitude": 20,
            "latitude": 2,
            "cost": 4,
            "image": "https:ton-ity=75&width=1680&height=940",
            "description": "Day out on Brighton Beach!",
            "user": {
                "username": "test",
                "email": "test@test.com"
            },
            "categories": [
            {
                "id": 1,
                "category": "Beach",
            }
            ],
        })

        self.client.force_authenticate(user=None) # remove authentication
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 401)
