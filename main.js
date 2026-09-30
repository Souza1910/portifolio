document.addEventListener('DOMContentLoaded', () => {


    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('.theme-icon');
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Aplica o tema salvo no localStorage ou a preferência do sistema
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            if (themeIcon) themeIcon.textContent = '🌙';
        }

        // Evento de clique para alternar o tema
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            if (themeIcon) {
                themeIcon.textContent = isDark ? '☀️' : '🌙';
            }
            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }


    async function testarConexaoAPI() {
        try {
            const response = await fetch('https://portifolio-soib.onrender.com/api/status');
            if (response.ok) {
                const data = await response.json();
                console.log('API Status:', data.mensagem);
            }
        } catch (error) {
            console.warn('API indisponível ou inicializando no Render.');
        }
    }

    testarConexaoAPI();


    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formResponse = document.getElementById('form-response');
            if (formResponse) {
                formResponse.textContent = "Enviando mensagem... (pode levar alguns segundos na primeira vez)";
            }

            const payload = {
                nome: document.getElementById('nome')?.value || '',
                email: document.getElementById('email')?.value || '',
                mensagem: document.getElementById('mensagem')?.value || ''
            };

            try {
                const response = await fetch('https://portifolio-soib.onrender.com/api/contato', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const result = await response.json();
                    if (formResponse) formResponse.textContent = result.mensagem;
                    contactForm.reset();
                } else {
                    if (formResponse) formResponse.textContent = "Erro no servidor ao enviar a mensagem.";
                }
            } catch (error) {
                if (formResponse) formResponse.textContent = "Erro ao conectar com a API.";
                console.error('Erro de envio:', error);
            }
        });
    }
});
