from flask import Flask, request, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from spleeter.separator import Separator
import ffmpeg

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
ALLOWED_EXTENSIONS = {'mp4'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/process-video', methods=['POST'])
def process_video():
    if 'video' not in request.files:
        return 'No video file', 400
    
    file = request.files['video']
    
    if file.filename == '':
        return 'No selected file', 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(input_path)
        
        # Extract audio from video
        audio_path = os.path.splitext(input_path)[0] + '.wav'
        stream = ffmpeg.input(input_path)
        stream = ffmpeg.output(stream, audio_path, acodec='pcm_s16le', ac=2, ar='44100')
        ffmpeg.run(stream, overwrite_output=True)
        
        # Separate vocals from accompaniment
        separator = Separator('spleeter:2stems')
        separator.separate_to_file(audio_path, app.config['PROCESSED_FOLDER'])
        
        vocals_path = os.path.join(app.config['PROCESSED_FOLDER'], os.path.splitext(os.path.basename(audio_path))[0], 'vocals.wav')
        accompaniment_path = os.path.join(app.config['PROCESSED_FOLDER'], os.path.splitext(os.path.basename(audio_path))[0], 'accompaniment.wav')
        
        return {
            'vocals': vocals_path,
            'music': accompaniment_path
        }, 200
    
    return 'Invalid file type', 400

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    os.makedirs(PROCESSED_FOLDER, exist_ok=True)
    app.run(host='0.0.0.0', port=5000, debug=True)