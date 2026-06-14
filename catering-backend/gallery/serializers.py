from rest_framework import serializers
from .models import Gallery


class GallerySerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(
        source='service.title',
        read_only=True
    )

    class Meta:
        model = Gallery
        fields = "__all__"