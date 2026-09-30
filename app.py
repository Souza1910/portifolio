from flask import Flask, jsonify, request
from flask_cors import CORS

# Inicializa o aplicativo Flask
app = Flask(__name__)

# Habilita o CORS para permitir que o navegador/site acesse esta API
CORS(app)

# 1. Rota de teste para verificar se a API está online
@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({
        "status": "online",
        "mensagem": "API em Python conectada com sucesso ao portfólio!"
    })

# 2. Rota para receber mensagens do formulário de contato (exemplo)
@app.route('/api/contato', methods=['POST'])
def receber_contato():
    dados = request.get_json()
    
    nome = dados.get('nome', 'Anônimo')
    email = dados.get('email', 'Sem e-mail')
    mensagem = dados.get('mensagem', '')

    print(f"Nova mensagem recebida de {nome} ({email}): {mensagem}")

    # Retorna uma resposta de sucesso para o JavaScript do site
    return jsonify({
        "sucesso": True,
        "mensagem": "Mensagem recebida com sucesso no servidor Python!"
    }), 200

# Executa o servidor na porta 5000
if __name__ == '__main__':
    app.run(debug=True, port=5000)

    # Rota para a página inicial da API
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "mensagem": "Bem-vindo à API do Portfólio!"
    })