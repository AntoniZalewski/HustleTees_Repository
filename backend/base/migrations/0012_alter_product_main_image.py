# Generated by Django 5.1 on 2024-09-15 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_product_main_color_product_sec_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='main_image',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='main_images/'),
        ),
    ]
