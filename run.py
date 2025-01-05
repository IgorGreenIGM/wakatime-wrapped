import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_socketio import SocketIO
from app.routes.auth import auth_bp
from app.routes.stats import stats_bp

socketio = SocketIO()

def create_app():
    load_dotenv()
    app = Flask(__name__)
    CORS(app, supports_credentials=True, resources={
        r"/*": {
            "origins": "*",
            "allow_credentials": True,
            "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"]
        }
    })

    app.secret_key = os.urandom(24)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(stats_bp, url_prefix='/stats')
    
    socketio.init_app(app, cors_allowed_origins="*")
    return app

if __name__ == "__main__":
    app = create_app()
    socketio.run(app=app, port=8080, host='0.0.0.0')