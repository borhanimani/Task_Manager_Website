from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
class TaskView( LoginRequiredMixin, View):
    
    def get(self, request):
        return render(request, 'task/task_list.html')


class TaskCreateView(LoginRequiredMixin, View):
    
    def get(self, request):
        return render(request, 'task/task_create.html')


class TaskDetailView(LoginRequiredMixin, View):
    
    def get(self, request, pk):
        return render(request, 'task/task_detail.html')


class TaskEditView(LoginRequiredMixin, View):
    
    def get(self, request, pk):
        return render(request, 'task/task_edit.html')

class TaskDeleteView(LoginRequiredMixin, View):
    
    def get(self, request, pk):
        return render(request, 'task/task_delete.html')