import requests
from rest_framework.views import APIView
from rest_framework.response import Response

class ChatGptAPIView(APIView):
    def post(self, request):
        data = request.data
        
        response = requests.post('https://api.openai.com/v1/chat/completions', json=data, headers={
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        })
        return Response(response.json())


# curl https://api.openai.com/v1/chat/completions \
#   -H "Content-Type: application/json" \
#   -H "Authorization: Bearer $OPENAI_API_KEY" \
#   -d '{
#     "model": "gpt-3.5-turbo",
#     "messages": [{"role": "user", "content": "Hello!"}]
#   }'