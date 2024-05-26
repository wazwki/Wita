FROM python:3.12.3
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /app/backend
COPY . .
RUN pip install --no-cache-dir -r /app/backend/requirements.txt
RUN python manage.py collectstatic --noinput