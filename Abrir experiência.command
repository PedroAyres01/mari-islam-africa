#!/bin/zsh
cd -- "$(dirname -- "$0")/dist" || exit 1
python3 - <<'PY'
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.request import urlopen
import subprocess

port = 8777
url = f'http://127.0.0.1:{port}/'
try:
    with urlopen(url, timeout=1) as response:
        existing = response.read(2048).decode('utf-8', 'replace')
    if 'O Islã à beira do deserto' in existing:
        subprocess.run(['open', url], check=False)
        raise SystemExit(0)
except (OSError, TimeoutError):
    pass
try:
    server = ThreadingHTTPServer(('127.0.0.1', port), SimpleHTTPRequestHandler)
except OSError:
    server = ThreadingHTTPServer(('127.0.0.1', 0), SimpleHTTPRequestHandler)
url = f'http://127.0.0.1:{server.server_port}/'
print('Experiência da Mariana aberta no navegador. Mantenha esta janela aberta durante a visita.')
subprocess.run(['open', url], check=False)
try:
    server.serve_forever()
except KeyboardInterrupt:
    server.server_close()
PY
