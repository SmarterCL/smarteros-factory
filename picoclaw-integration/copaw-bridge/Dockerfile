FROM python:3.10-slim

WORKDIR /opt/copaw

# Instalar dependencias
RUN pip install --no-cache-dir paho-mqtt requests

# Copiar script
COPY copaw-bridge.py /opt/copaw/

# Ejecutar
CMD ["python", "/opt/copaw/copaw-bridge.py"]
