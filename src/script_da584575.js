function handleContactSubmit(e) {
            e.preventDefault();
            const emailInput = document.getElementById('contact-email');
            const emailError = document.getElementById('email-error');
            const successBox = document.getElementById('contact-success');
            const form = document.getElementById('contact-form');

            const emailVal = emailInput.value.trim().toLowerCase();
            const isWacEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.wac$/i.test(emailVal);

            if (!isWacEmail) {
                emailError.classList.add('show');
                emailInput.style.borderColor = 'var(--accent)';
                return;
            }
            emailError.classList.remove('show');
            emailInput.style.borderColor = 'var(--line)';

            form.style.opacity = '0.5';
            form.style.pointerEvents = 'none';

            setTimeout(() => {
                successBox.classList.add('show');
                form.reset();
                form.style.opacity = '1';
                form.style.pointerEvents = 'auto';
            }, 400);
        }
