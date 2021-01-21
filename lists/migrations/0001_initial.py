# Generated by Django 3.1.5 on 2021-01-21 00:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='List',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('list_title', models.CharField(max_length=255)),
                ('list_entry_1', models.CharField(max_length=255)),
                ('list_entry_1_desc', models.TextField()),
                ('list_entry_2', models.CharField(max_length=255)),
                ('list_entry_2_desc', models.TextField()),
                ('list_entry_3', models.CharField(max_length=255)),
                ('list_entry_3_desc', models.TextField()),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('list_author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
