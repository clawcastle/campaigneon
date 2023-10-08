FROM python:3.11

WORKDIR /app

COPY pyproject.toml /app

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

COPY /src /app

CMD ["gunicorn", "-w", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "main:app", "--bind", "0.0.0.0:5000"]