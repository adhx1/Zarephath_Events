from rest_framework import generics
from .models import Gallery
from .serializers import GallerySerializer


class GalleryListView(generics.ListAPIView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class GalleryByServiceView(generics.ListAPIView):
    serializer_class = GallerySerializer

    def get_queryset(self):
        slug = self.kwargs['slug']
        return Gallery.objects.filter(
            service__slug=slug
        )