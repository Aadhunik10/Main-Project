from django.conf import settings
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=25, blank=True)

    def __str__(self):
        return f"Profile for {self.user.email}"


class Product(models.Model):
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=120)
    condition = models.CharField(max_length=80)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    location = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="product_images/%Y/%m/%d/")
    phone = models.CharField(max_length=25)
    listed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
