"""
TITAN ATHLETICS - Robust Local Development Web Server
Automatically detects an available open port and launches the browser.
Run: python server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PREFERRED_PORTS = [8080, 8000, 5000, 5500, 8888, 3050]
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable caching-free local development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def start_server():
    os.chdir(DIRECTORY)
    httpd = None
    active_port = None

    # Search through preferred ports, then sequential range
    candidate_ports = PREFERRED_PORTS + list(range(8081, 8120))

    for port in candidate_ports:
        try:
            httpd = ReusableTCPServer(("", port), NoCacheHandler)
            active_port = port
            break
        except OSError:
            # Port is occupied by another application, try next
            continue

    if not httpd:
        try:
            # Let operating system dynamically pick an available port
            httpd = ReusableTCPServer(("", 0), NoCacheHandler)
            active_port = httpd.server_address[1]
        except Exception as e:
            print(f"Error starting server: {e}")
            sys.exit(1)

    url = f"http://localhost:{active_port}"
    print("=" * 64)
    print("  ⚡ TITAN FORGE GYM & ATHLETICS WEBSITE IS LIVE! ⚡")
    print(f"  Active Local URL : {url}")
    print(f"  Serving Directory: {DIRECTORY}")
    print("  Press Ctrl+C to stop the server.")
    print("=" * 64)

    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer gracefully stopped.")
        httpd.server_close()
        sys.exit(0)

if __name__ == '__main__':
    start_server()
