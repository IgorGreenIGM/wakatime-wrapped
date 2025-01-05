from main_app import create_app, socketio
from app.routes.auth import auth_bp
from app.routes.stats import stats_bp

if __name__ == "__main__":
    app = create_app()
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(stats_bp, url_prefix='/stats')
    socketio.run(app=app, port=8080, host='0.0.0.0')