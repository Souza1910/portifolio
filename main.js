// Aguarda o carregamento do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');

    // Recupera a preferência salva no navegador ou a preferência do sistema operacional
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Define o tema inicial com base na preferência
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }

    // Evento de clique para alternar o tema
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');

        // Atualiza o ícone e salva a preferência
        themeIcon.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});

// Função para testar a ligação com a API em Python
async function testarConexaoAPI() {
    try {
        // Faz a requisição para a API hospedada no Render
        const response = await fetch('https://portifolio-soib.onrender.com/api/status');
        const data = await response.json();
        
        console.log('Resposta da API Python:', data.mensagem);
    } catch (error) {
        console.error('Erro ao ligar à API:', error);
    }
}

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('.theme-icon');
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            if (themeIcon) themeIcon.textContent = '🌙';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    async function testarConexaoAPI() {
        try {
            const response = await fetch('https://portifolio-soib.onrender.com/api/status');
            const data = await response.json();
            console.log('Resposta da API Python:', data.mensagem);
        } catch (error) {
            console.error('Erro ao ligar à API:', error);
        }
    }

    // Executa o teste de status da API
    testarConexaoAPI();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formResponse = document.getElementById('form-response');
            if (formResponse) {
                formResponse.textContent = "A enviar mensagem... (pode demorar alguns segundos)";
            }

            const payload = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                mensagem: document.getElementById('mensagem').value
            };

            try {
                // URL atualizada da API na nuvem (Render)
                const response = await fetch('https://portifolio-soib.onrender.com/api/contato', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (formResponse) {
                    formResponse.textContent = result.mensagem;
                }
                contactForm.reset();
            } catch (error) {
                if (formResponse) {
                    formResponse.textContent = "Erro ao enviar mensagem.";
                }
                console.error('Erro no envio:', error);
            }
        });
    }
});
