from flask import Flask,request,jsonify,Response,render_template
from flask_cors import CORS
from cv2 import resize,imread
from tensorflow import keras
from PIL import Image
from io import BytesIO

import numpy as np
import matplotlib.pyplot as plt
import base64

app = Flask(__name__,template_folder="./templates")
CORS(app)

simple_net = keras.models.model_from_json(open("notebooks\\simple_net\\model.json","r").read())
simple_net.load_weights("notebooks\\simple_net\\ckp")

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
    image = data['image_data'].split("base64,")[1] + '==='
    image = Image.open(BytesIO(base64.b64decode(image)))
    image = np.expand_dims(resize(np.array(image)[:,:,-1]/255,(28,28)),0)
    print (simple_net.predict(image).argmax())

    return "HELLO"


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=80,threaded=True)