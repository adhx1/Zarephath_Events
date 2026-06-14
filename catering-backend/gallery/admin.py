from django.contrib import admin
from .models import Gallery


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "service",
        "media_type",
        "is_featured",
        "created_at",
    )

    list_filter = (
        "service",
        "media_type",
        "is_featured",
    )

    search_fields = (
        "title",
    )