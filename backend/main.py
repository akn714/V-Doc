from flask import Flask, render_template, request, redirect
from flask_cors import CORS
from langchain.memory import ConversationBufferMemory

from ai_res import get_response

app = Flask(__name__, static_folder="views/static", template_folder="views")

# cors = CORS(app, resources={r"/chat": {"origins": "http://localhost:3000"}})
cors = CORS(
    app,
    resources={r"/chat": {
        "origins": "https://v-doc.adarshkumar35.repl.co"
    }})


@app.route("/")
def home():
    return redirect('https://v-doc.adarshkumar35.repl.co/')


@app.route('/chat', methods=['POST'])
def chat():
    print('chat')
    data = request.get_json()
    print(data['query'])
    chat_hist = ConversationBufferMemory()
    response, chat_hist = get_response(data['query'], chat_hist)
    return {'ovd_msg': response}


app.run(host="0.0.0.0", port=80, debug=True)
