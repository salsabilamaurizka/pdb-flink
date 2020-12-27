from django.shortcuts import render
from .models import Dashboard
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
import requests

# Create your views here.
response = {}
def showDashboard(request):
    data = Dashboard.objects.all()
    return JsonResponse(list(data.values('total_revenue','total_customer','total_order','top_customers','top_products','trend_seller','trend_region'))[-1], safe=False)

@api_view(['POST'])
def addData(request):
    data = request.data
    dashboard = Dashboard(
            total_revenue = data['total_revenue'],
            total_customer = data['total_customer'],
            total_order = data['total_order'],
            top_products = data['top_products'],
            top_customers = data['top_customers'],
            trend_seller = data['trend_seller'],
            trend_region = data['trend_region']
        )
    try:
        dashboard.save()
        return Response(data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response(e, status=status.HTTP_400_BAD_REQUEST)
