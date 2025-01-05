import os
import redis
import random
from typing import Dict
from flask_socketio import SocketIO
from remotion_lambda import RemotionClient
from remotion_lambda import RenderMediaParams, Privacy, ValidStillImageFormats

REMOTION_APP_REGION = os.getenv('REMOTION_APP_REGION')
REMOTION_APP_FUNCTION_NAME = os.getenv('REMOTION_APP_FUNCTION_NAME')
REMOTION_APP_SERVE_URL = os.getenv('REMOTION_APP_SERVE_URL')
REMOTION_AWS_ACCESS_KEY_ID=os.getenv('REMOTION_AWS_ACCESS_KEY_ID')
REMOTION_AWS_SECRET_ACCESS_KEY=os.getenv('REMOTION_AWS_SECRET_ACCESS_KEY')

def render_video(user_render_id: str, input_props: Dict, socketio: SocketIO, redis_client: redis.StrictRedis):
    client = RemotionClient(region=REMOTION_APP_REGION,
                            serve_url=REMOTION_APP_SERVE_URL,
                            function_name=REMOTION_APP_FUNCTION_NAME,
                            access_key=REMOTION_AWS_ACCESS_KEY_ID,
                            secret_key=REMOTION_AWS_SECRET_ACCESS_KEY)

    render_params = RenderMediaParams(
        composition="wakatime-wrapped",
        privacy=Privacy.PUBLIC,
        image_format=ValidStillImageFormats.JPEG,
        input_props=input_props,
        delete_after="1-day",
        download_behavior={"type": "download", "fileName": "wakatime-wrapped.mp4"}
    )

    render_response = client.render_media_on_lambda(render_params)
    if render_response:
        redis_client.set(user_render_id, 0)
        socketio.emit('render_progress', {"render_id":user_render_id, 'progress': 0})

        progress_response = client.get_render_progress(
            render_id=render_response.render_id, bucket_name=render_response.bucket_name)
        last_state = 0
        while progress_response and not progress_response.done:
            state = progress_response.overallProgress * 100
            if state < last_state + random.randint(5, 10):
                continue

            last_state = state
            socketio.emit('render_progress', {"render_id":user_render_id, 'progress': state})
            redis_client.set(user_render_id, state)
            progress_response = client.get_render_progress(
                render_id=render_response.render_id, bucket_name=render_response.bucket_name)
            
        redis_client.delete(user_render_id)
        socketio.emit('render_progress', {"render_id":user_render_id, 'progress': 100, 'url':progress_response.outputFile})
    else:
        print("Render request failed")
        raise Exception("Render request failed")