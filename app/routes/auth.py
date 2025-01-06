import os
import requests
from flask import Blueprint, jsonify, request

auth_bp = Blueprint("auth", __name__)
client_id = os.getenv('WAKATIME_CLIENT_ID')
client_secret = os.getenv('WAKATIME_CLIENT_SECRET')
redirect_uri = os.getenv('WAKATIME_REDIRECT_URI')

@auth_bp.route("/authorize_url", methods=['GET'])
def auth_wakatime():
    return f"https://wakatime.com/oauth/authorize?client_id={client_id}&response_type=code&redirect_uri={redirect_uri}&scope=read_stats,read_summaries,email"

@auth_bp.route("/token")
def oauth_callback():
    code = request.args.get('code')
    if not code:
        return jsonify({'error': 'Authorization failed'}), 400

    token_response = requests.post('https://wakatime.com/oauth/token', data={
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'grant_type': 'authorization_code',
        'scope':'read_stats,read_summaries,email',
        'redirect_uri': redirect_uri
    })
    
    return token_response.text