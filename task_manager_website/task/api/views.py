from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializer import TaskSerializer
from ..models import Task
from django.db.models import Q
from django.shortcuts import get_object_or_404

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

        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


class TaskDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Task, id=pk)

    def get(self, request, pk):
        task = self.get_object(pk)
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def patch (self, request, pk):
        task = self.get_object(pk)

        if task.user != request.user:
            return Response({"error": "Not Allowed"}, status=403)

        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        task = self.get_object(pk)

        if task.user != request.user:
            return Response({"error": "Not Allowed"}, status=403)

        task.delete()
        return Response({'message': 'Task deleted successfully.'}, status=204)