from .models import Trip
from .forms import TripForm
from django.views.generic import ListView
from django.views.generic import DetailView
from django.views.generic import TemplateView
from django.template.loader import get_template
from django.shortcuts import render

# Create your views here.
class TripDetail(DetailView):
    queryset = Trip.objects.all()

    def get_object(self):
        object = super(TripDetail, self).get_object()
        return object

class HomeView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        return context

def home(request):
    return render(request, 'travel/home.html', {'current_user': request.user})

def TripNew(request):
    if request.method == "POST"
        form = PostForm(request.POST)
        trip = form.save(commit=False)
        trip.save()
        return redirect('trip_detail', pk=trip.pk)
    else:
        form = TripForm()
    return render(request, 'travel/trip_form.html', {'form': form})
