from flask import Flask,request,jsonify,Response,render_template
from joblib import load
from flask_cors import CORS
from cv2 import resize,imread
import numpy as np

import matplotlib.pyplot as plt

log = load("./models/log-saga.joblib")

app = Flask(__name__,template_folder="./templates")

CORS(app)


@app.route("/",methods=['GET'])
def index():
    return render_template("index.html")

@app.route('/static/<filetype>/<file>')
def static_files(filetype,file):
    return Response(
        open(f"./templates/static/{filetype}/{file}","r").read(),
        mimetype=f'text/{filetype}'
    )


@app.route("/predict",methods=['POST'])
def predict():
    data = request.get_json()
    # digit = log.predict([resize(np.array(data['image']).astype(np.float).reshape(40,40),(28,28)).reshape(28*28)])
    digit = log.predict([np.array(data['image']).astype(np.float).reshape(28*28)])
    return jsonify(
            dict(
                digit = int(digit[0]),
                status=True
            )
        )


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=80,threaded=True,debug=True)