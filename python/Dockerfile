FROM python:3.11.0a2-alpine
RUN pip install --upgrade pip
ARG user=9001
WORKDIR /code
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
ENV PATH="/code/.local/bin:${PATH}"
COPY src/ .
RUN python3 tests/test_book_inventory.py
ARG portNumber=8080
ENV PORT=$portNumber
EXPOSE $portNumber
RUN chown -R 1001 /code
USER 1001
CMD [ "python3", "./server.py" ]