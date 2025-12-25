from rest_framework import serializers
from .models import Registration, Course
import re


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'image_url', 'price']

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'

    def validate_student_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Student name cannot be empty.") 
        
        # Check for alphabetic characters and spaces
        if not all(x.isalpha() or x.isspace() for x in value):  
            raise serializers.ValidationError("Student name must contain only alphabetic characters and spaces.")
        return value
    
    def validate_email(self, value):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", value):
            raise serializers.ValidationError("Invalid email format.")
        return value
    
    def validate_phone(self, value):
        # Simple regex for phone number validation
        if not re.match(r"^\+?1?\d{9,15}$", value):
            raise serializers.ValidationError("Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
        return value

    def validate_course(self, value):
        if not value:
            raise serializers.ValidationError("Course must be provided.")
        return value