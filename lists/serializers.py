from rest_framework import serializers
from .models import List
from django.contrib.auth import get_user_model


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = '__all__'
        lookup_field = 'id'


class ListOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'first_name', 'last_name')
        lookup_field = 'id'
