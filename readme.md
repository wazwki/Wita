# Wita.

### Project Management Tool.


#### Description: 
A project management platform focused on supporting teamwork that allows users to create projects, manage tasks, assign tasks to team members, track progress, and share comments and files.

#### Technologies:
- Django for the server side.
- Django REST Framework (DRF) for creating APIs.
- PostgreSQL for data storage.
- Celery for asynchronous task processing.
- Redis for caching and message queuing (with Celery).
- RabbitMQ as a message broker for Celery.


#### Main page of the site:
![welcome-full](https://github.com/wazwki/Wita/raw/master/img/welcome-full.png)
#### You can check progress with kanban boards:

![progress-many-full](https://github.com/wazwki/Wita/raw/master/img/progress-many-full.png)
#### Also you can hide left menu for more content on screen:

![progress-many](https://github.com/wazwki/Wita/raw/master/img/progress-many.png)
#### Can register with github-oauth:

![register](https://github.com/wazwki/Wita/raw/master/img/register.png)
#### Adaptive design, can use on phone, tablet or computer:

![tablet-full](https://github.com/wazwki/Wita/raw/master/img/tablet-full.png)


## Installation

Clone repository from github:
```
git clone https://github.com/wazwki/Wita.git
```

Go to project directory:
```
cd path/to/Wita/
```

Use docker-compose for start container:
```
docker compose up
```


## Usage

### For use you need some configurate:

- #### Change .env.example on .env with your personal data.
- #### Change backend_application/application_settings/settings.py:
  - Add your hosts in CORS_ALLOWED_ORIGINS
  - Turn off debug-mode
  - Change TEMPLATES, add your directory in 'DIRS'

## Contributing

#### Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)