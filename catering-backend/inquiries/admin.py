from django.contrib import admin
from .models import Inquiry


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "phone",
        "service",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "service",
    )

    search_fields = (
        "name",
        "phone",
    )