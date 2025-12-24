from django.urls import path 
from .views import RegistrationView, CourseListView
urlpatterns = [
    path('registrations/', RegistrationView.as_view(), name='registration-list-create'),
    path('courses/', CourseListView.as_view(), name='course-list'),
]