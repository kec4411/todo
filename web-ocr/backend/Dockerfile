# project/backend/Dockerfile

#official base-image python
FROM python:3.9.6-slim-buster

#working directroy
WORKDIR /usr/src/

#environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#install system depedencies
RUN apt-get update \
  && apt-get -y install netcat gcc postgresql \
  && apt-get -y install tesseract-ocr \
  && apt-get -y install tesseract-ocr-jpn \
  && apt-get clean

RUN apt update \
  && apt upgrade -y \
  && apt install -y build-essential \
  && apt install -y python3-opencv 

#install python depedencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

#add app
COPY . .

#add entrypoint.sh
COPY ./entrypoint.sh .
RUN chmod +x /usr/src/entrypoint.sh

#entrypoint.sh
ENTRYPOINT ["/usr/src/entrypoint.sh"]