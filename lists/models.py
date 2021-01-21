from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class List(models.Model):
    list_title = models.CharField(max_length=255)
    list_author = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
    )
    list_entry_1 = models.CharField(max_length=255)
    list_entry_1_desc = models.TextField()
    list_entry_2 = models.CharField(max_length=255)
    list_entry_2_desc = models.TextField()
    list_entry_3 = models.CharField(max_length=255)
    list_entry_3_desc = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.list_title
