from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('products/', views.getProducts, name='products'),
    path('products/<str:pk>/', views.getProduct, name='product'),
]