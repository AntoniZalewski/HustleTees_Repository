from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItem, name='order-add'),
    path('myorders/', views.getMyOrders, name='myorders'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
    path('<str:pk>/deliver/', views.deliverOrder, name='deliver'),
]