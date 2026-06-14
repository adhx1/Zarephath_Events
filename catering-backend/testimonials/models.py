from django.db import models


class Testimonial(models.Model):

    customer_name = models.CharField(
        max_length=150
    )

    customer_image = models.ImageField(
        upload_to='testimonials/',
        blank=True,
        null=True
    )

    review = models.TextField()

    rating = models.PositiveIntegerField(
        default=5
    )

    is_featured = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.customer_name