FROM python:3.8-slim
WORKDIR /app
COPY . .

VOLUME app_volume
#ENV PYTHONUNBUFFERED=1

#RUN apk add --update python3 
#RUN python3 -m ensurepip 
#RUN pip3 install --upgrade pip setuptools

#RUN apk update && apk add ca-certificates gcc linux-headers musl-dev libffi-dev jpeg-dev zlib-dev
#RUN pip install django

LABEL MAINTAINER="GIGI"
LABEL APP_NAME="GesCo" 

RUN pip install -r requierments.txt

ENV FOUNDATION_PATH="/usr/local/lib/python3.8/site-packages/foundation"

COPY ./replaces/urls.py $FOUNDATION_PATH/urls.py
COPY ./replaces/base.html $FOUNDATION_PATH/templates/foundation/base.html

RUN python3 manage.py makemigrations
RUN python3 manage.py migrate


#CMD ["pip", "freeze"]

ENTRYPOINT ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
