from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import LoginView, ProductListCreateView, ProductDetailView, SignupView, UserDetailView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("me/", UserDetailView.as_view(), name="user-detail"),
    path("products/", ProductListCreateView.as_view(), name="product-list-create"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product-detail"),
]
