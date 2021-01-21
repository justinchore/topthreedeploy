from django.urls import path
from .views import AllListsView, OneListView, UserListView, ListOwnerView

urlpatterns = [
    path('', AllListsView.as_view()),
    path('user/<pk>/', UserListView.as_view()),
    path('<pk>/', OneListView.as_view()),
    path('owner/<pk>/', ListOwnerView.as_view()),
]
