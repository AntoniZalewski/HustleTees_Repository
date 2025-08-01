# Generated by Django 5.1 on 2024-09-19 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_alter_product_model_3d_alter_product_video_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='main_image',
            field=models.ImageField(blank=True, default='media/placeholder.png', null=True, upload_to='main_images/'),
        ),
        migrations.AlterField(
            model_name='product',
            name='model_3d',
            field=models.FileField(blank=True, default='media/placeholder.png', null=True, upload_to='models/'),
        ),
        migrations.AlterField(
            model_name='product',
            name='video',
            field=models.FileField(blank=True, default='media/placeholder.png', null=True, upload_to='videos/'),
        ),
        migrations.AlterField(
            model_name='productimage',
            name='image',
            field=models.ImageField(blank=True, default='media/placeholder.png', null=True, upload_to='product_images/'),
        ),
    ]
