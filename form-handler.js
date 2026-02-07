document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const submitButton = document.getElementById('submitButton');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

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
                responseMessage.textContent = '¡Enviado con éxito! Gracias por contactarnos.';
                form.reset();
            } else {
                const resultText = await response.text();
                responseMessage.className = 'error';
                responseMessage.textContent = `Error: ${resultText || 'No se pudo enviar el formulario.'}`;
            }
        } catch (error) {
            responseMessage.className = 'error';
            responseMessage.textContent = `Error de red: ${error.message}`;
        } finally {
            responseMessage.style.display = 'block';
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
});
