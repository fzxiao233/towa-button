from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import uuid

app = Flask(__name__)
cors = CORS(app)
ABS_DIR = r'public/'


@app.route('/api/submit', methods=['POST'])
def submit():
    argv = request.json
    if not argv:
        return jsonify({'msg': '-1'})
    with open(ABS_DIR + r'voices.json', 'w+') as f:
        f.write(json.dumps(argv))
    return jsonify({'msg': '0'})


@app.route('/api/upload', methods=['POST'])
def upload():
    file = request.files['file']
    filename = uuid.uuid1()
    form = request.form
    zh_CN = form['zh_CN']
    ja_JP = form['ja_JP']
    voices = json.load(open(ABS_DIR + 'voices.json', encoding='utf-8'))
    voices['voices'][-1]['voiceList'].append(
        {"name": f'{filename}', "path": f'{filename}.mp3', "description": {"zh-CN": zh_CN, "ja-JP": ja_JP}})
    with open(ABS_DIR + r'voices.json', 'w+') as f:
        f.write(json.dumps(voices))
    file.save(ABS_DIR + f'voices/{filename}.mp3')
    return jsonify({'msg': '0'})

if __name__ == '__main__':
    app.run(debug=True)
