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