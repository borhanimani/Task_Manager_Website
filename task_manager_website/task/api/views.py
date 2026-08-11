from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializer import TaskSerializer
from ..models import Task
from django.db.models import Q

class TaskListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        search = request.query_params.get("search")

        if search:
            tasks = Task.objects.filter(
            Q(title__icontains=search) |
            Q(description__icontains=search))
        else:
            tasks = Task.objects.all()

        if request.GET.get('onlyme') == 'true':
            tasks = tasks.filter(user = request.user)
            print(tasks)

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    