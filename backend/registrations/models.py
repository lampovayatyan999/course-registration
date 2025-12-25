from django.db import models

# Create your models here.
class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    def __str__(self):
        return self.name

class Registration(models.Model):
    student_name = models.CharField(max_length=100)
    registration_date = models.DateTimeField(auto_now_add=True)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='registrations')

    def __str__(self):
        return f"{self.student_name} - {self.course.name}"