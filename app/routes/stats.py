import io
import os
import uuid
import redis
import threading
from http import HTTPStatus
from flask import Blueprint, jsonify, current_app, request, send_file

from app.services.wakatime import Wakatime
from app.services.remotion import render_video

stats_bp = Blueprint("stats", __name__)

REDISPORT=os.getenv('REDISPORT')
REDISHOST=os.getenv('REDISHOST')
REDIS_PASSWORD=os.getenv('REDIS_PASSWORD')
redis_client = redis.StrictRedis(host=REDISHOST, 
                                 port=REDISPORT, 
                                 password=REDIS_PASSWORD,
                                 db=0)

@stats_bp.route("/", methods=['GET'])
def get_stats():
    try:
        access_token = request.args.get('token')
        wakatime_service = Wakatime(access_token)
        stats = wakatime_service.fetch_yearly_stats()
        return jsonify({
            'success': True,
            'data': stats
        }), HTTPStatus.OK
        
    except Exception as e:
        current_app.logger.error(f"Error fetching Wakatime stats: {str(e)}")
        return jsonify({
            'error': 'Internal server error',
            'message': 'An error occurred while fetching your Wakatime statistics'
        }), HTTPStatus.INTERNAL_SERVER_ERROR

@stats_bp.route('/cards', methods=['GET'])
def get_card():
    access_token = request.args.get('token')
    if not access_token:
        return jsonify({
            'error': 'access token not provided',
            'message': 'An error occurred while accessing your statistics card : access token not provided'
        }), HTTPStatus.BAD_REQUEST
    
    card_path = f'app/cards/{access_token}.png'
    if os.path.exists(card_path):
       try:
            # load file in memory, delete the file, and return stored data(maybe there's a better alternative ?)
            return_data = io.BytesIO()
            with open(card_path, 'rb') as fp:
                return_data.write(fp.read())
            return_data.seek(0)
            os.remove(card_path)
            return send_file(return_data, download_name="card-stat.png", max_age=0)
       except Exception as e: 
           return jsonify({"error": str(e)}), HTTPStatus
    else:
        return jsonify({
            'error': 'Card Not Found',
            'message': 'An error occurred while accessing your statistics card'
        }), HTTPStatus.NOT_FOUND

@stats_bp.route('/video/progress', methods=['GET'])
def get_video():
    render_id = request.args.get('renderId', '')
    progress = redis_client.get(render_id)
    if progress is None:
        return jsonify({"error": f"No ongoing progress found with id {render_id}"}), HTTPStatus.NOT_FOUND
    
    return_value = progress.copy()
    if return_value['url']:
        redis_client.delete(render_id)
        
    return jsonify(return_value)

@stats_bp.route('/video/build', methods=['POST'])
def build_video():
    props = request.json
    if props is None:
        return jsonify({"error": 'no input props provided for rendering'}), HTTPStatus.BAD_REQUEST

    user_render_id = str(uuid.uuid4())
    threading.Thread(target=render_video, args=(user_render_id, props, redis_client)).start()
    return jsonify({"status": "started", "render_id": user_render_id})