from django.urls import path
from .views import get_stock_items

urlpatterns = [
    path("get_stock_items/", get_stock_items, name="get_stock_items"),  # Existing route
    path("", get_stock_items, name="home"),  # Add this if you want "/" to work
]
