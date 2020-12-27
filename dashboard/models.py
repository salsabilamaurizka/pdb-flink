from django.db import models

# Create your models here.
class Dashboard(models.Model):
    total_revenue = models.IntegerField()
    total_order = models.IntegerField()
    total_customer = models.IntegerField()
    top_products = models.TextField()
    top_customers = models.TextField()
    trend_seller = models.TextField()
    trend_region = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

