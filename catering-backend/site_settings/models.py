from django.db import models


class SiteSettings(models.Model):

    business_name = models.CharField(
        max_length=200
    )

    phone = models.CharField(
        max_length=20
    )

    whatsapp = models.CharField(
        max_length=20
    )

    email = models.EmailField()

    address = models.TextField()

    hero_title = models.CharField(
        max_length=255
    )

    hero_subtitle = models.TextField()

    instagram = models.URLField(
        blank=True,
        null=True
    )

    facebook = models.URLField(
        blank=True,
        null=True
    )

    youtube = models.URLField(
        blank=True,
        null=True
    )

    logo = models.ImageField(
        upload_to='logos/'
    )

    def __str__(self):
        return self.business_name