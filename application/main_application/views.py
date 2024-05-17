from django.shortcuts import render


def index(request):
    '''main page'''
    info = "Здесь будет ваш контент..."
    title = "Главная Страница"
    data = {"info": info, "title": title}
    return render(request, "index.html", context=data)
