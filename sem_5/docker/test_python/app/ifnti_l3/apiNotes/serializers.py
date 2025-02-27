from rest_framework import serializers
from notes.models import Enseignant

class EnseignantSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Enseignant
        fields = "__all__"