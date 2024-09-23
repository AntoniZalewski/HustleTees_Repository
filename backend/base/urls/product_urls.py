from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='products'),

    path('create/', views.createProduct, name='product-create'),
    path('upload/', views.uploadFile, name='file-upload'),

    path('<str:pk>/reviews/', views.createProductReview, name='review-create'),
    path('reviews/<str:pk>/', views.updateProductReview, name='review-update'),
    path('reviews/delete/<str:pk>/', views.deleteProductReview, name='review-delete'),

    path('<str:pk>/', views.getProduct, name='product'),

    path('update/<str:pk>/', views.updateProduct, name='product-update'),
    path('delete/<str:pk>/', views.deleteProduct, name='product-delete'),
]