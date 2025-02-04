from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets,status
from notes.models import Enseignant
from apiNotes.serializers import EnseignantSerializer


@api_view(['GET','POST'])
def liste_enseignant(request):
    if request.method == 'GET':
        enseignants = Enseignant.objects.all()
        serializer = EnseignantSerializer(enseignants,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EnseignantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_CREATED)


# class EnseignantViewSet(viewsets.ModelViewSet):
#     queryset = Enseignant.objects.all()
#     serializer_class = EnseignantSerializer
