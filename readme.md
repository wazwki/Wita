# Empty django project

This repository of an empty django project for quick setup and installation.

## Installation

Use the git to install empty django repository:

```bash
git clone https://github.com/wazwki/EmptyDjangoProject.git
```
Go to directory:
```bash
cd EmptyDjangoProject/
```
Make a virtual environment:
```bash
python3 -m venv venv_name
```
Activate virtual environment:
```bash
sorce venv_name/bin/activate
```
For linux - update packeges:
```bash
sudo apt-get update
```
```bash
sudo apt-get install libpq-dev
```
```bash
pip3 install --upgrade pip setuptools
```
Install requirements:
```bash
pip3 install -r requirements.txt
```

## Usage

Need change your secret key and database information in .env file
For using PostgreSql - install it and create user and database:
```bash
apt install postgresql
su - postgres
createuser admin
createdb admin
```
```bash
psql
alter user admin with encrypted password '1234';
grant all privileges on database admin to admin;
```
Start project:
```bash
cd application/
python3 manage.py createsuperuser
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic
gunicorn application_settings.wsgi:application --bind 0.0.0.0:8000
```

## Contributing

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)
