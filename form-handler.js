document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitButton = document.getElementById('submitButton');
    const responseMessage = document.getElementById('responseMessage');

    // t() viene de i18n.js; si no cargó, se usa el texto en español
    const tr = (key, fallback) => (typeof t === 'function' ? t(key) : fallback);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = tr('form_sending', 'Enviando…');

        responseMessage.style.display = 'none';
        responseMessage.className = '';

        const formData = new FormData(form);
        const workerUrl = 'https://worker-de-email.biopixel-form.workers.dev';

        try {
            const response = await fetch(workerUrl, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                responseMessage.className = 'success';
                responseMessage.textContent = tr('form_success', '¡Enviado con éxito! Gracias por contactarnos.');
                form.reset();
            } else {
                const resultText = await response.text();
                console.error('Form error:', response.status, resultText);
                responseMessage.className = 'error';
                responseMessage.textContent = tr('form_error', 'No se pudo enviar el formulario.');
            }
        } catch (error) {
            console.error('Form network error:', error);
            responseMessage.className = 'error';
            responseMessage.textContent = tr('form_network_error', 'Error de red. Inténtalo de nuevo.');
        } finally {
            responseMessage.style.display = 'block';
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
});
