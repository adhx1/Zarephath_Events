from django.urls import path
from .views import (
    GalleryListView,
    GalleryByServiceView
)

urlpatterns = [
    path('', GalleryListView.as_view()),
    path(
        'service/<slug:slug>/',
        GalleryByServiceView.as_view()
    ),
]