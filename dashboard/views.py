from django.shortcuts import render
from .models import Dashboard
from django.http import JsonResponse
import requests

# Create your views here.
response = {}
def showDashboard(request):
	return JsonResponse(list(Dashboard.objects.all().values('total_revenue','total_customer','total_order','top_customers','top_products','trend_seller','trend_region')), safe=False)

def getData(request):
    #LINK NYA NTAR GANTIIIIIIIIIIII
    data = requests.get('https://www.googleapis.com/books/v1/volumes?q=quilting').json()
    dashboard = Dashboard(
            total_revenue = data['total_revenue'],
            total_customer = data['total_customer'],
            total_order = data['total_order'],
            top_products = data['top_products'],
            top_customers = data['top_customers'],
            trend_seller = data['trend_seller'],
            trend_region = data['trend_region']
        )
    dashboard.save()
    return JsonResponse({'message':'Success!'}, status = 200)

