from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Permite requisições de qualquer origem (inclusive do GitHub Pages)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def home():
    return jsonify({"mensagem": "API do Portfólio a funcionar!"})

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({
        "status": "online",
        "mensagem": "API em Python conectada com sucesso ao portfólio!"
    })

@app.route('/api/contato', methods=['POST', 'OPTIONS'])
def receber_contato():
    # Tratamento para requisição prévia (preflight OPTIONS)
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'}), 200

    dados = request.get_json()
    
    nome = dados.get('nome', 'Anônimo')
    email = dados.get('email', 'Sem e-mail')
    mensagem = dados.get('mensagem', '')

    print(f"Nova mensagem recebida de {nome} ({email}): {mensagem}")

    return jsonify({
        "sucesso": True,
        "mensagem": "Mensagem recebida com sucesso no servidor Python!"
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
