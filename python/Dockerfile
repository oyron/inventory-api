FROM python:3.8
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY src/ .
RUN python3 tests/test_book_inventory.py
ARG portNumber=8080
ENV PORT=$portNumber
EXPOSE $portNumber
CMD [ "python3", "./server.py" ]