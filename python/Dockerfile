FROM python:3.8-alpine
RUN pip install --upgrade pip
RUN adduser -D worker
USER worker
WORKDIR /code
COPY --chown=worker:worker requirements.txt requirements.txt
RUN pip install --user -r requirements.txt
ENV PATH="/code/.local/bin:${PATH}"
COPY --chown=worker:worker src/ .
RUN python3 tests/test_book_inventory.py
ARG portNumber=8080
ENV PORT=$portNumber
EXPOSE $portNumber
CMD [ "python3", "./server.py" ]