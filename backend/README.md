This code was based on:
https://github.com/amcquistan/flask-vuejs-survey/tree/SixthPost


It's a basic flask application with JWT authentication

serve images + movies



INSTALL
======

- make and activate virtualenv with python3

- install requirements:

    pip install -r requirements.txt

next step: migrations
--

Note that the migrations folder was created using the command:

     python manage.py db init


- Migrate the db:

    python manage.py db migrate

    python manage.py db upgrade
