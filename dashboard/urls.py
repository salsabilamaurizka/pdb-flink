from django.urls import path
from .views import showDashboard

app_name = 'dashboard'
urlpatterns = [
 path('', showDashboard, name='dashboard')
]
