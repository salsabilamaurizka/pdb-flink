# Generated by Django 3.1.4 on 2020-12-28 07:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_auto_20201223_1725'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dashboard',
            name='created_date',
        ),
    ]
