from django.urls import path
from .views import RegisterView, LoginView,UserProfileView
from .views import(
    CartView,
    CartItemView,
    ClearCartView,
    AddToCartView,
    ProductListView
)


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('products/',ProductListView.as_view(), name='product-view'),

    path('cart/', CartView.as_view(), name='cart-detail'),
    path('cart/clear/', ClearCartView.as_view(), name='clear-cart'),
    path('cart/items/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/items/<int:item_id>/', CartItemView.as_view(), name='cart-item-detail'),
]
