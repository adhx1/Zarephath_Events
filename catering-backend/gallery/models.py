from django.db import models
from services.models import Service


class Gallery(models.Model):

    MEDIA_CHOICES = (
        ('image', 'Image'),
        ('video', 'Video'),
    )

    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='gallery_items'
    )

    title = models.CharField(max_length=200)

    media_type = models.CharField(
        max_length=10,
        choices=MEDIA_CHOICES
    )

    media_file = models.FileField(
        upload_to='gallery/'
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    is_featured = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title