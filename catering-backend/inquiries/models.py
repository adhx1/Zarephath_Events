from django.db import models
from services.models import Service


class Inquiry(models.Model):

    STATUS_CHOICES = (
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('closed', 'Closed'),
    )

    name = models.CharField(
        max_length=150
    )

    phone = models.CharField(
        max_length=20
    )

    service = models.ForeignKey(
        Service,
        on_delete=models.SET_NULL,
        null=True
    )

    place = models.CharField(
        max_length=255
    )

    message = models.TextField(
        blank=True,
        null=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name