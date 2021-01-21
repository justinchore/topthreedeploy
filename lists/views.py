from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import List
from django.contrib.auth import get_user_model
from django.core.serializers import serialize
from django.http import HttpResponse
from .serializers import ListSerializer, ListOwnerSerializer
from .permissions import IsAuthorOrReadOnly
# Create your views here.


class UserListView(generics.ListAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    lookup_field = 'pk'

    def get(self, request, pk, format=None):
        lists = List.objects.filter(list_author=pk).order_by('-date')
        serialized_user_list = ListSerializer(lists, many=True)
        return Response(serialized_user_list.data)


class AllListsView(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    lookup_field = 'pk'

    def get(self, request, format=None):
        lists = List.objects.all().order_by('-date')
        serialized_lists = ListSerializer(lists, many=True)
        return Response(serialized_lists.data)

    def post(self, request, format=None):
        data = self.request.data

        list_title = data['list_title']
        list_entry_1 = data['list_entry_1']
        list_entry_1_desc = data['list_entry_1_desc']
        list_entry_2 = data['list_entry_2']
        list_entry_2_desc = data['list_entry_2_desc']
        list_entry_3 = data['list_entry_3']
        list_entry_3_desc = data['list_entry_3_desc']
        list_author = request.user

        if List.objects.filter(list_title=list_title, list_author=list_author).exists():
            return Response({'error': 'You already have a list with this title'})
        else:
            created_list = List.objects.create(
                list_title=list_title, list_entry_1=list_entry_1, list_entry_1_desc=list_entry_1_desc, list_entry_2=list_entry_2, list_entry_2_desc=list_entry_2_desc, list_entry_3=list_entry_3, list_entry_3_desc=list_entry_3_desc, list_author=list_author
            )

            created_list.save()
            serialized_list = ListSerializer(created_list)
            return Response(serialized_list.data)


class OneListView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = List.objects.all()
    serializer_class = ListSerializer
    lookup_field = 'pk'

    def delete(self, request, pk, format=None):
        selected_list = List.objects.get(id=pk)
        selected_list.delete()
        return Response({'success': 'Question Deleted'})


class ListOwnerView(APIView):
    queryset = get_user_model().objects.all()
    lookup_field = 'pk'
    serializer_class = ListOwnerSerializer

    def get(self, request, pk, format=None):
        list_owner = get_user_model().objects.get(id=pk)
        serialized_owner = ListOwnerSerializer(list_owner)
        return Response(serialized_owner.data)
