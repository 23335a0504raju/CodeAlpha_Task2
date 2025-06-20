# Run these commands in your Django shell (python manage.py shell)

from django.core.files import File
from django.conf import settings
import os
from connect.models import Product

additional_products = [
    {
        "name": "Graphic Print T-Shirt",
        "description": "Cotton t-shirt with cool graphic print",
        "price": 29.99,
        "category": "T-Shirts",
        "colors": ["Black", "White"],
        "image_path": "products/11.jpg"
    },
    {
        "name": "Cargo Pants",
        "description": "Utility pants with multiple pockets",
        "price": 49.99,
        "category": "Activewear",
        "colors": ["Khaki", "Black"],
        "image_path": "products/5.jpeg"
    },
    {
        "name": "Formal Dress Shirt",
        "description": "Premium formal shirt for business occasions",
        "price": 54.99,
        "category": "Formal Wear",
        "colors": ["White", "Blue"],
        "image_path": "products/4.jpeg"
    },
    {
        "name": "Hooded Sweatshirt",
        "description": "Comfortable cotton hoodie",
        "price": 44.99,
        "category": "Activewear",
        "colors": ["Gray", "Black"],
        "image_path": "products/3.jpeg"
    },
    {
        "name": "Leather Jacket",
        "description": "Genuine leather motorcycle jacket",
        "price": 199.99,
        "category": "Jackets",
        "colors": ["Black", "Brown"],
        "image_path": "products/2.jpeg"
    },
    {
        "name": "Chino Pants",
        "description": "Classic fit chino pants",
        "price": 49.99,
        "category": "Activewear",
        "colors": ["Beige", "Navy"],
        "image_path": "products/1.jpeg"
    }
]

for product_data in additional_products:
    # Create product without image first
    product = Product.objects.create(
        name=product_data["name"],
        description=product_data["description"],
        price=product_data["price"],
        category=product_data["category"],
        colors=product_data["colors"]
    )
    
    # Add image if path exists
    if product_data["image_path"]:
        try:
            with open(os.path.join(settings.MEDIA_ROOT, product_data["image_path"]), 'rb') as f:
                product.image.save(
                    os.path.basename(product_data["image_path"]), 
                    File(f)
                )
                product.save()
        except FileNotFoundError:
            print(f"Image not found: {product_data['image_path']}")
            continue

print(f"Successfully added {len(additional_products)} more products")