from django.urls import path
from .views import showDashboard, addData

app_name = 'dashboard'
urlpatterns = [
 path('', showDashboard, name='dashboard'),
 path('add/', addData, name='add-data')
]
