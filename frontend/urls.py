from django.urls import path, re_path
from .views import Home, Assets

urlpatterns = [
    path('', Home.as_view(), name='home'),
    #if you can find a filename in the url path, send it to the assets as View, and view tries to find and display
    re_path(r'^(?P<filename>[\w\.]+)$', Assets.as_view(), name='assets'),

]
