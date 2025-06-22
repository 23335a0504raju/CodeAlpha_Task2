from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include
from django.http import HttpResponse

def health_check(request):
    return HttpResponse("Server is running", status=200)

urlpatterns = [
    path("api/",include("connect.urls")),
    path("admin/", admin.site.urls),
    path('', health_check),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)