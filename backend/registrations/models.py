from django.db import models

# Create your models here.
class Registration(models.Model):
    student_name = models.CharField(max_length=100)
    course_name = models.CharField(max_length=100)
    registration_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} - {self.course_name}"