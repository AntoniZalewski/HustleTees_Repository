from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('add/', views.addOrderItem, name='order-add'),
    #path('<str:pk>/', views.getOrderById, name='order-detail'),
    #path('', views.getOrders, name='orders'),
]