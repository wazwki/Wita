from django.shortcuts import render


def index(request):
    '''main page'''
    title = "Главная Страница"
    data = {"title": title}
    return render(request, "index.html", context=data)
