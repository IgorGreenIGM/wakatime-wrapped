import io
import os
import sys
from http import HTTPStatus
from flask import Blueprint, jsonify, current_app, request, send_file

from app.services.wakatime import Wakatime

stats_bp = Blueprint("stats", __name__)

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