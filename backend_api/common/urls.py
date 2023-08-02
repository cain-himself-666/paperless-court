from django.urls import path
from common.views import (ChatGptAPIView )


urlpatterns = [
    path('chatgpt/', ChatGptAPIView.as_view()),

  
]