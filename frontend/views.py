import os
from django.views.generic import View
from django.http import HttpResponse, HttpResponseNotFound

class Home(View):

    def get(self, _request):
        #os.path.dirname gives name of folder that __file__ is in
        #will open the file in frontend/dist/index.html
        #basically means when you get a request to the Home, go to the index page
        with open(os.path.join(os.path.dirname(__file__), 'dist', 'index.html')) as file:
            return HttpResponse(file.read())

class Assets(View):

    def get(self, _request, filename):
        path = os.path.join(os.path.dirname(__file__), 'dist', filename)

        if os.path.isfile(path):
            with open(path) as file:
                return HttpResponse(file.read())
        else:
            return HttpResponseNotFound()

# Create your views here.
