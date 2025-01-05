import os
import redis
from typing import Dict
from remotion_lambda import RemotionClient
from remotion_lambda import RenderMediaParams, Privacy, ValidStillImageFormats

REMOTION_APP_REGION = os.getenv('REMOTION_APP_REGION')
REMOTION_APP_FUNCTION_NAME = os.getenv('REMOTION_APP_FUNCTION_NAME')
REMOTION_APP_SERVE_URL = os.getenv('REMOTION_APP_SERVE_URL')
REMOTION_AWS_ACCESS_KEY_ID=os.getenv('REMOTION_AWS_ACCESS_KEY_ID')
REMOTION_AWS_SECRET_ACCESS_KEY=os.getenv('REMOTION_AWS_SECRET_ACCESS_KEY')

def render_video(user_render_id: str, input_props: Dict, redis_client: redis.StrictRedis):
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
        redis_client.hmset(user_render_id, {'state':0, 'url':''})

        progress_response = client.get_render_progress(
            render_id=render_response.render_id, bucket_name=render_response.bucket_name)
        while progress_response and not progress_response.done:
            redis_client.hmset(user_render_id, {'state':progress_response.overallProgress * 100, 'url':''})
            progress_response = client.get_render_progress(
                render_id=render_response.render_id, bucket_name=render_response.bucket_name)
            
        redis_client.hmset(user_render_id, {'state':100, 'url':progress_response.outputFile})
    else:
        print("Render request failed")
        raise Exception("Render request failed")