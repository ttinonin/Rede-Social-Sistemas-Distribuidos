FROM python:3.10

WORKDIR /app/publishers

COPY . /app/publishers/

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "publisher_process.py"]
