// Chat Widget JavaScript
// Add this script after the HTML or in a separate JS file

// Initialize Chat Widget
function initializeChatWidget() {
    const chatBubble = document.getElementById('chatBubble');
    const chatWidget = document.getElementById('chatWidget');
    const closeBtn = document.getElementById('closeBtn');
    const chatForm = document.getElementById('chatForm');
    const phoneInput = document.getElementById('phoneInput');
    const emailInput = document.getElementById('emailInput');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const agreementCheckbox = document.getElementById('agreementCheckbox');
    const submitBtn = document.getElementById('submitBtn');
    const pageUrlInput = document.getElementById('pageUrl');
    const utmSourceInput = document.getElementById('utmSource');
    const utmMediumInput = document.getElementById('utmMedium');
    const utmCampaignInput = document.getElementById('utmCampaign');

    // Set current page URL and UTM parameters
    if (pageUrlInput) pageUrlInput.value = window.location.href;
    
    // Extract UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    if (utmSourceInput) utmSourceInput.value = urlParams.get('utm_source') || '';
    if (utmMediumInput) utmMediumInput.value = urlParams.get('utm_medium') || '';
    if (utmCampaignInput) utmCampaignInput.value = urlParams.get('utm_campaign') || '';

    // Open/Close Widget
    if (chatBubble && chatWidget) {
        chatBubble.addEventListener('click', () => {
            chatBubble.style.display = 'none';
            chatWidget.classList.add('open');
            // Auto-focus first input
            setTimeout(() => {
                const firstInput = chatWidget.querySelector('.form-input');
                if (firstInput) firstInput.focus();
            }, 100);
        });

        closeBtn.addEventListener('click', () => {
            chatWidget.classList.remove('open');
            setTimeout(() => {
                chatBubble.style.display = 'flex';
            }, 300);
        });
    }

    // Phone Formatting & Validation
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            if (value.length >= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
            } else if (value.length >= 3) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            }
            
            e.target.value = value;
            validatePhone();
            checkFormValidity();
        });
    }

    function validatePhone() {
        if (!phoneInput) return true;
        const phoneValue = phoneInput.value.replace(/\D/g, '');
        const isValid = phoneValue.length === 10;
        
        if (phoneInput.value && !isValid) {
            phoneInput.classList.add('error');
            phoneInput.classList.remove('valid');
            if (phoneError) {
                phoneError.textContent = 'Please enter a valid 10-digit phone number';
                phoneError.classList.add('show');
            }
        } else if (isValid) {
            phoneInput.classList.remove('error');
            phoneInput.classList.add('valid');
            if (phoneError) phoneError.classList.remove('show');
        } else {
            phoneInput.classList.remove('error', 'valid');
            if (phoneError) phoneError.classList.remove('show');
        }
        
        return isValid || !phoneInput.value;
    }

    // Email Validation
    function validateEmail() {
        if (!emailInput) return true;
        const emailValue = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(emailValue);
        
        if (emailValue && !isValid) {
            emailInput.classList.add('error');
            emailInput.classList.remove('valid');
            if (emailError) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.classList.add('show');
            }
        } else if (isValid) {
            emailInput.classList.remove('error');
            emailInput.classList.add('valid');
            if (emailError) emailError.classList.remove('show');
        } else {
            emailInput.classList.remove('error', 'valid');
            if (emailError) emailError.classList.remove('show');
        }
        
        return isValid || !emailValue;
    }

    if (emailInput) {
        emailInput.addEventListener('input', function() {
            validateEmail();
            checkFormValidity();
        });
        emailInput.addEventListener('blur', validateEmail);
    }

    // Form Validation & Button State Management
    function checkFormValidity() {
        if (!chatForm || !submitBtn) return;

        const firstName = chatForm.querySelector('input[name="first_name"]')?.value?.trim() || '';
        const lastName = chatForm.querySelector('input[name="last_name"]')?.value?.trim() || '';
        const phone = phoneInput?.value?.replace(/\D/g, '') || '';
        const email = emailInput?.value?.trim() || '';
        const wineryName = chatForm.querySelector('input[name="winery_name"]')?.value?.trim() || '';
        const challenge = chatForm.querySelector('select[name="challenge"]')?.value || '';
        const isAgreed = agreementCheckbox?.checked || false;
        
        const isPhoneValid = phone.length === 10;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        const allFieldsFilled = firstName && lastName && isPhoneValid && isEmailValid && 
                              wineryName && challenge && isAgreed;
        
        submitBtn.disabled = !allFieldsFilled;
    }

    // Add event listeners to all form fields for validation
    if (chatForm) {
        const formInputs = chatForm.querySelectorAll('.form-input, .form-select, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', checkFormValidity);
            input.addEventListener('change', checkFormValidity);
        });

        if (agreementCheckbox) {
            agreementCheckbox.addEventListener('change', checkFormValidity);
        }

        // Initial check
        checkFormValidity();
    }

    // Form Submission - Integration with n8n
    if (chatForm) {
        chatForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!agreementCheckbox?.checked) {
                alert('Please agree to the terms before submitting.');
                return;
            }
            
            const isPhoneValid = validatePhone();
            const isEmailValid = validateEmail();
            
            if (!isPhoneValid || !isEmailValid) {
                alert('Please correct the errors before submitting.');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                // Collect all form data
                const formData = new FormData(chatForm);
                
                // Convert to object for n8n webhook
                const data = {
                    // Contact Information
                    first_name: formData.get('first_name'),
                    last_name: formData.get('last_name'),
                    full_name: `${formData.get('first_name')} ${formData.get('last_name')}`,
                    phone: formData.get('phone'),
                    email: formData.get('email'),
                    
                    // Business Information
                    winery_name: formData.get('winery_name'),
                    challenge: formData.get('challenge'),
                    message: formData.get('message') || '',
                    
                    // Lead Source & Attribution
                    source: formData.get('source'),
                    page_url: formData.get('page_url'),
                    utm_source: formData.get('utm_source'),
                    utm_medium: formData.get('utm_medium'),
                    utm_campaign: formData.get('utm_campaign'),
                    
                    // Metadata
                    submitted_at: new Date().toISOString(),
                    user_agent: navigator.userAgent,
                    referrer: document.referrer,
                    
                    // GHL Configuration
                    ghl_workflow: 'chat_widget_submission',
                    lead_type: 'website_inquiry',
                    status: 'new',
                    priority: 'high'
                };

                // Send to n8n webhook
                await submitToN8n(data);

                // Show success message
                showSuccessMessage();
                
                // Reset form after delay
                setTimeout(() => {
                    closeBtn.click();
                    resetForm();
                }, 3000);

            } catch (error) {
                console.error('Submission error:', error);
                alert('Something went wrong. Please try again or contact us directly.');
                
                // Reset button state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    // Function to submit to n8n webhook
    async function submitToN8n(data) {
        // ⚠️ REPLACE WITH YOUR ACTUAL N8N WEBHOOK URL ⚠️
        const n8nWebhookUrl = 'https://your-n8n-instance.com/webhook/winemembers-chat-widget';
        
        const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            // Add timeout
            signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('n8n submission successful:', result);
        return result;
    }

    // Function to show success message
    function showSuccessMessage() {
        const chatContent = chatWidget.querySelector('.chat-content');
        
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <strong>Thank you!</strong><br>
            We'll be in touch shortly to discuss your AI marketing strategy.
        `;
        
        // Insert at the beginning of chat content
        chatContent.insertBefore(successDiv, chatContent.firstChild);
    }

    // Function to reset form
    function resetForm() {
        if (chatForm) {
            chatForm.reset();
            
            // Remove validation classes
            if (phoneInput) {
                phoneInput.classList.remove('error', 'valid');
            }
            if (emailInput) {
                emailInput.classList.remove('error', 'valid');
            }
            
            // Hide error messages
            if (phoneError) phoneError.classList.remove('show');
            if (emailError) emailError.classList.remove('show');
            
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = true;
            
            // Remove success message
            const successMessage = chatWidget.querySelector('.success-message');
            if (successMessage) {
                successMessage.remove();
            }
            
            // Re-check form validity
            checkFormValidity();
        }
    }

    // Close widget when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.chat-widget-container')) {
            if (chatWidget?.classList.contains('open')) {
                closeBtn.click();
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatWidget?.classList.contains('open')) {
            closeBtn.click();
        }
    });
}

// Initialize chat widget when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatWidget);
} else {
    initializeChatWidget();
}