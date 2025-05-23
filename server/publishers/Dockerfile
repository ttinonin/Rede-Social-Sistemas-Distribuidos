FROM python:3.10

WORKDIR /app/publishers

COPY ../requirements.txt /app/
COPY . /app/publishers/

RUN pip install --no-cache-dir -r /app/requirements.txt

CMD ["python", "publisher_process.py"]
