from django.contrib import admin
from .models import Product, ProductImage, Review, Order, OrderItem, ShippingAddress

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1  # Number of extra forms to display

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'main_color', 'sec_color')
    fields = ('name', 'price', 'main_color', 'sec_color', 'description', 'countInStock', 'main_image', 'video')
    inlines = [ProductImageInline]

admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)