from django.shortcuts import render
from django.views import View
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
class TaskView(View):
    def get(self, request):
        return render(request, 'task/task_list.html')