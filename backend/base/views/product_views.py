from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from django.core.files.storage import default_storage

from django.contrib.auth.models import User
from base.models import Product
from base.serializers import ProductSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.conf import settings
import os
from base.models import Product, ProductImage

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Get All Products
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)

# Get Single Product by ID
@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product, many=False, context={'request': request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product not found'}, status=404)
    

@api_view(['POST'])
def uploadFile(request):
    data = request.data
    
    product_id = data['product_id']
    file_type = data.get('file_type', 'main_images')  # Default to 'main_images' if not provided
    product = Product.objects.get(_id=product_id)

    files = request.FILES.getlist('file')
    if not files:
        return Response({'detail': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)

    urls = []

    for file in files:
        # Determine the directory based on the file type
        if file_type == 'main_images':
            directory = 'main_images'
        elif file_type == 'videos':
            directory = 'videos'
        elif file_type == 'models':
            directory = 'models'
        elif file_type == 'product_images':
            directory = 'product_images'
        else:
            return Response({'detail': 'Invalid file type'}, status=status.HTTP_400_BAD_REQUEST)

        # Save the file in the appropriate directory
        file_path = os.path.join(settings.MEDIA_ROOT, directory, file.name)
        with open(file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        # Construct the URL without duplicating the MEDIA_URL prefix
        file_url = os.path.join(directory, file.name)

        # Update the product with the correct file path
        if file_type == 'main_images':
            product.main_image = file_url
        elif file_type == 'videos':
            product.video = file_url
        elif file_type == 'models':
            product.model_3d = file_url
        elif file_type == 'product_images':
            product_image = ProductImage(product=product, image=file_url)
            product_image.save()

        urls.append(file_url)

    product.save()

    return Response({'urls': urls}, status=status.HTTP_201_CREATED)

@api_view(['DELETE']) 
@permission_classes([IsAdminUser])   
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        countInStock=0,
        description='',        
        main_color='#FFFFFF',
        sec_color='#000000'
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    
    product.name = data['name']
    product.price = data['price']
    product.countInStock = data['countInStock']
    product.description = data['description']
    product.main_color = data['main_color']
    product.sec_color = data['sec_color']
    
    product.save()
    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

