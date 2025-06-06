// WineMembers.AI Custom Chat Widget
// Save this file as: chat-widget.js

// WineMembers.AI Configuration
const WIDGET_CONFIG = {
    client_id: "winemembers-ai",
    client_name: "WineMembers.AI",
    ghl_location_id: "0wA3ApC68RYuFne6byBk",
    webhook_token: "wm_ai_marketing_2024_secure",
    widget_type: "marketing_services",
    
    branding: {
        primary_color: "#722f37",
        secondary_color: "#c85a68"
    },
    
    content: {
        bubble_title: "Let's Connect",
        intro_message: "Ready to transform your winery's growth with AI? Share your information and we'll reach out to discuss your AI marketing strategy.",
        button_text: "Get My Free Consultation",
        success_message: "Thank you! We'll be in touch shortly to discuss your AI marketing strategy."
    }
};

// Custom Chat Widget Class
class WineMembersWidget {
    constructor() {
        this.config = WIDGET_CONFIG;
        this.elements = {};
        this.init();
    }

    init() {
        this.createWidget();
        this.bindEvents();
        this.setupValidation();
    }

    createWidget() {
        // Create the widget HTML
        const widgetHTML = this.generateHTML();
        
        // Add to page
        const container = document.createElement('div');
        container.innerHTML = widgetHTML;
        document.body.appendChild(container.firstElementChild);
        
        // Cache DOM elements
        this.elements = {
            container: document.querySelector('.chat-widget-container'),
            bubble: document.getElementById('chatBubble'),
            widget: document.getElementById('chatWidget'),
            closeBtn: document.getElementById('closeBtn'),
            form: document.getElementById('chatForm'),
            submitBtn: document.getElementById('submitBtn'),
            phoneInput: document.getElementById('phoneInput'),
            emailInput: document.getElementById('emailInput'),
            agreementCheckbox: document.getElementById('agreementCheckbox')
        };
    }

    generateHTML() {
        return `
        <div class="chat-widget-container">
            <!-- Chat Bubble -->
            <div class="chat-bubble" id="chatBubble">
                <div class="chat-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <!-- Chat Widget -->
            <div class="chat-widget" id="chatWidget">
                <!-- Header -->
                <div class="chat-header">
                    <button class="close-btn" id="closeBtn">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <div class="chat-title">
                        <div class="chat-icon">
                            <div class="chat-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        ${this.config.content.bubble_title}
                    </div>
                </div>

                <!-- Content -->
                <div class="chat-content">
                    <div class="chat-message">
                        ${this.config.content.intro_message}
                    </div>

                    <form id="chatForm">
                        <!-- Name Row -->
                        <div class="form-row">
                            <div class="form-group">
                                <input type="text" class="form-input" name="first_name" placeholder="First Name" required>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-input" name="last_name" placeholder="Last Name" required>
                            </div>
                        </div>

                        <!-- Contact Info -->
                        <div class="form-group">
                            <input type="tel" class="form-input" id="phoneInput" name="phone" placeholder="Phone Number" required>
                            <div class="error-message" id="phoneError"></div>
                        </div>

                        <div class="form-group">
                            <input type="email" class="form-input" id="emailInput" name="email" placeholder="Email Address" required>
                            <div class="error-message" id="emailError"></div>
                        </div>

                        <!-- Winery Name -->
                        <div class="form-group">
                            <input type="text" class="form-input" name="winery_name" placeholder="Winery Name" required>
                        </div>

                        <!-- Marketing Challenge -->
                        <div class="form-group">
                            <label class="select-label">What's your biggest marketing challenge?</label>
                            <select class="form-select" name="marketing_challenge" required>
                                <option value="">Select your primary challenge</option>
                                <option value="tasting_room_traffic">Increasing tasting room traffic</option>
                                <option value="wine_club_conversion">Wine club conversions</option>
                                <option value="online_reputation">Online reputation management</option>
                                <option value="member_retention">Member retention & loyalty</option>
                                <option value="digital_marketing">Digital marketing strategy</option>
                                <option value="lead_generation">Lead generation & nurturing</option>
                                <option value="ai_automation">AI automation & efficiency</option>
                                <option value="social_media">Social media & content marketing</option>
                                <option value="email_marketing">Email marketing & CRM</option>
                                <option value="paid_advertising">Paid advertising optimization</option>
                                <option value="comprehensive_strategy">Comprehensive growth strategy</option>
                                <option value="other">Other marketing needs</option>
                            </select>
                        </div>

                        <!-- Message -->
                        <div class="form-group">
                            <textarea class="form-textarea" name="message" placeholder="Tell us more about your winery and growth goals..." rows="3"></textarea>
                        </div>

                        <!-- Hidden fields for n8n routing -->
                        <input type="hidden" name="client_id" value="${this.config.client_id}">
                        <input type="hidden" name="ghl_location_id" value="${this.config.ghl_location_id}">
                        <input type="hidden" name="webhook_token" value="${this.config.webhook_token}">
                        <input type="hidden" name="widget_type" value="${this.config.widget_type}">
                        <input type="hidden" name="source" value="WineMembers.AI Website">
                        <input type="hidden" name="page_url" id="pageUrl">
                        <input type="hidden" name="utm_source" id="utmSource">
                        <input type="hidden" name="utm_medium" id="utmMedium">
                        <input type="hidden" name="utm_campaign" id="utmCampaign">
                    </form>
                </div>

                <!-- Footer -->
                <div class="chat-footer">
                    <!-- Agreement -->
                    <div class="agreement-section">
                        <label class="checkbox-container">
                            <input type="checkbox" id="agreementCheckbox" required>
                            <span class="checkmark"></span>
                            <span class="disclaimer">
                                I agree to receive communications from WineMembers.AI regarding AI marketing solutions. Message frequency varies. Reply STOP to opt out. <a href="#" target="_blank">Privacy Policy</a> | <a href="#" target="_blank">Terms</a>
                            </span>
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="submit-btn" form="chatForm" id="submitBtn">
                        <span class="btn-text">${this.config.content.button_text}</span>
                        <span class="btn-loading" style="display: none;">Sending...</span>
                    </button>

                    <!-- Powered By -->
                    <div class="powered-by">
                        Powered by WineMembers.AI
                    </div>
                </div>
            </div>
        </div>

        <style>
            /* Chat Widget Styles */
            .chat-widget-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                font-family: 'Lexend', sans-serif;
            }

            /* Chat Bubble (Closed State) */
            .chat-bubble {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, ${this.config.branding.primary_color}, #5a1f24);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .chat-bubble:hover {
                transform: scale(1.05);
                box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
            }

            .chat-dots {
                display: flex;
                gap: 3px;
            }

            .chat-dots span {
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                animation: bounce 1.4s infinite ease-in-out both;
            }

            .chat-dots span:nth-child(1) { animation-delay: -0.32s; }
            .chat-dots span:nth-child(2) { animation-delay: -0.16s; }

            @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }

            /* Chat Widget (Open State) */
            .chat-widget {
                width: 380px;
                background: #e8e8e8;
                border-radius: 16px;
                box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
                display: none;
                flex-direction: column;
                animation: slideUp 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .chat-widget.open {
                display: flex;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            /* Header */
            .chat-header {
                background: linear-gradient(135deg, ${this.config.branding.primary_color}, #5a1f24);
                color: white;
                padding: 18px 20px;
                text-align: center;
                position: relative;
                border-radius: 16px 16px 0 0;
            }

            .close-btn {
                position: absolute;
                top: 12px;
                right: 12px;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .close-btn:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            .chat-title {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 16px;
                font-weight: 600;
            }

            .chat-icon {
                background: rgba(255, 255, 255, 0.2);
                padding: 6px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* Content */
            .chat-content {
                padding: 18px 20px;
                background: white;
            }

            .chat-message {
                background: #3a3a3a;
                color: #e8e8e8;
                padding: 12px;
                border-radius: 12px;
                margin-bottom: 16px;
                line-height: 1.4;
                font-size: 13px;
            }

            /* Form */
            .form-group {
                margin-bottom: 14px;
            }

            .form-row {
                display: flex;
                gap: 10px;
                margin-bottom: 14px;
            }

            .form-row .form-group {
                flex: 1;
                margin-bottom: 0;
            }

            .form-input, .form-select, .form-textarea {
                width: 100%;
                border: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding: 10px 0 8px 0;
                font-size: 13px;
                background: transparent;
                outline: none;
                transition: all 0.3s ease;
                color: #1a1a1a;
                font-family: inherit;
            }

            .form-input::placeholder, .form-textarea::placeholder {
                color: #999;
                font-size: 13px;
            }

            .form-input:focus, .form-select:focus, .form-textarea:focus {
                border-color: ${this.config.branding.secondary_color};
            }

            .form-input.error {
                border-color: #e74c3c;
            }

            .form-input.valid {
                border-color: #27ae60;
            }

            .form-textarea {
                resize: none;
                min-height: 50px;
            }

            .form-select {
                cursor: pointer;
            }

            .select-label {
                color: #1a1a1a;
                font-size: 12px;
                margin-bottom: 4px;
                display: block;
                font-weight: 500;
            }

            .error-message {
                color: #e74c3c;
                font-size: 10px;
                margin-top: 2px;
                opacity: 0;
                transition: all 0.3s ease;
            }

            .error-message.show {
                opacity: 1;
            }

            /* Footer */
            .chat-footer {
                padding: 16px 20px;
                background: #f8f8fa;
                border-top: 1px solid #f0f0f0;
                border-radius: 0 0 16px 16px;
            }

            /* Agreement */
            .agreement-section {
                margin-bottom: 14px;
            }

            .checkbox-container {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                cursor: pointer;
            }

            .checkbox-container input[type="checkbox"] {
                display: none;
            }

            .checkmark {
                width: 14px;
                height: 14px;
                border: 1px solid #ddd;
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                margin-top: 1px;
                transition: all 0.3s ease;
            }

            .checkbox-container input[type="checkbox"]:checked + .checkmark {
                background: ${this.config.branding.primary_color};
                border-color: ${this.config.branding.primary_color};
            }

            .checkbox-container input[type="checkbox"]:checked + .checkmark::after {
                content: '✓';
                color: white;
                font-size: 9px;
                font-weight: bold;
            }

            .disclaimer {
                font-size: 10px;
                color: #666;
                line-height: 1.3;
            }

            .disclaimer a {
                color: ${this.config.branding.secondary_color};
                text-decoration: none;
            }

            /* Submit Button */
            .submit-btn {
                background: #3a3a3a;
                color: #999;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                margin-bottom: 12px;
                transition: all 0.3s ease;
                position: relative;
            }

            .submit-btn:not(:disabled):hover {
                background: linear-gradient(135deg, ${this.config.branding.primary_color}, #5a1f24);
                color: white;
                transform: translateY(-1px);
            }

            .submit-btn:disabled {
                background: #f0f0f0;
                color: #ccc;
                cursor: not-allowed;
            }

            .btn-loading {
                display: none;
            }

            .submit-btn.loading .btn-text {
                display: none;
            }

            .submit-btn.loading .btn-loading {
                display: inline;
            }

            /* Powered By */
            .powered-by {
                text-align: center;
                color: #888;
                font-size: 10px;
                padding: 8px 0;
            }

            /* Success Message */
            .success-message {
                background: rgba(46, 213, 115, 0.1);
                border: 1px solid #2ed573;
                border-radius: 12px;
                padding: 1rem;
                margin: 1rem 0;
                text-align: center;
                color: #2ed573;
                font-size: 13px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .chat-widget {
                    width: 340px;
                }

                .chat-widget-container {
                    right: 10px;
                    bottom: 10px;
                }
            }
        </style>`;
    }

    bindEvents() {
        // Set URL and UTM parameters
        this.setTrackingData();

        // Widget open/close
        this.elements.bubble.addEventListener('click', () => this.openWidget());
        this.elements.closeBtn.addEventListener('click', () => this.closeWidget());

        // Form submission
        this.elements.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Outside click to close
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.chat-widget-container')) {
                if (this.elements.widget.classList.contains('open')) {
                    this.closeWidget();
                }
            }
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.widget.classList.contains('open')) {
                this.closeWidget();
            }
        });
    }

    setTrackingData() {
        const urlParams = new URLSearchParams(window.location.search);
        document.getElementById('pageUrl').value = window.location.href;
        document.getElementById('utmSource').value = urlParams.get('utm_source') || '';
        document.getElementById('utmMedium').value = urlParams.get('utm_medium') || '';
        document.getElementById('utmCampaign').value = urlParams.get('utm_campaign') || '';
    }

    setupValidation() {
        // Phone validation
        this.elements.phoneInput.addEventListener('input', (e) => {
            this.formatPhone(e.target);
            this.validateForm();
        });

        // Email validation
        this.elements.emailInput.addEventListener('input', () => this.validateForm());
        this.elements.emailInput.addEventListener('blur', () => this.validateEmail());

        // General form validation
        const formInputs = this.elements.form.querySelectorAll('.form-input, .form-select, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', () => this.validateForm());
            input.addEventListener('change', () => this.validateForm());
        });

        this.elements.agreementCheckbox.addEventListener('change', () => this.validateForm());

        // Initial validation check
        this.validateForm();
    }

    formatPhone(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        
        input.value = value;
    }

    validateEmail() {
        const email = this.elements.emailInput.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        if (email && !isValid) {
            this.elements.emailInput.classList.add('error');
            this.showError('emailError', 'Please enter a valid email address');
        } else {
            this.elements.emailInput.classList.remove('error');
            this.hideError('emailError');
        }
        
        return isValid || !email;
    }

    validateForm() {
        const form = this.elements.form;
        const required = form.querySelectorAll('[required]');
        let allValid = true;

        required.forEach(field => {
            if (field.type === 'checkbox') {
                if (!field.checked) allValid = false;
            } else if (!field.value.trim()) {
                allValid = false;
            }
        });

        // Additional phone validation
        const phone = this.elements.phoneInput.value.replace(/\D/g, '');
        if (phone.length !== 10) allValid = false;

        // Additional email validation
        const email = this.elements.emailInput.value;
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            allValid = false;
        }

        this.elements.submitBtn.disabled = !allValid;
    }

    showError(elementId, message) {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
    }

    hideError(elementId) {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.classList.remove('show');
        }
    }

    openWidget() {
        this.elements.bubble.style.display = 'none';
        this.elements.widget.classList.add('open');
        
        setTimeout(() => {
            const firstInput = this.elements.widget.querySelector('.form-input');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    closeWidget() {
        this.elements.widget.classList.remove('open');
        setTimeout(() => {
            this.elements.bubble.style.display = 'flex';
        }, 300);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.elements.agreementCheckbox.checked) {
            alert('Please agree to the terms before submitting.');
            return;
        }

        // Show loading state
        this.elements.submitBtn.classList.add('loading');
        this.elements.submitBtn.disabled = true;

        try {
            const formData = new FormData(this.elements.form);
            const data = this.prepareSubmissionData(formData);
            
            await this.submitToN8n(data);
            this.showSuccess();
            
            setTimeout(() => {
                this.closeWidget();
                this.resetForm();
            }, 3000);

        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong. Please try again or contact us directly.');
            this.elements.submitBtn.classList.remove('loading');
            this.elements.submitBtn.disabled = false;
        }
    }

    prepareSubmissionData(formData) {
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Add metadata
        data.submitted_at = new Date().toISOString();
        data.user_agent = navigator.userAgent;
        data.referrer = document.referrer;
        data.screen_resolution = `${screen.width}x${screen.height}`;
        data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        return data;
    }

    async submitToN8n(data) {
        // UPDATE THIS URL WITH YOUR ACTUAL N8N WEBHOOK
        const webhookUrl = 'https://n8n.flowforgelab.com/webhook/universal-chat-widget';
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Token': data.webhook_token
            },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('n8n submission successful:', result);
        return result;
    }

    showSuccess() {
        const chatContent = this.elements.widget.querySelector('.chat-content');
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `<strong>${this.config.content.success_message}</strong>`;
        chatContent.insertBefore(successDiv, chatContent.firstChild);
    }

    resetForm() {
        if (this.elements.form) {
            this.elements.form.reset();
            
            // Remove validation classes
            this.elements.phoneInput.classList.remove('error', 'valid');
            this.elements.emailInput.classList.remove('error', 'valid');
            
            // Hide error messages
            this.hideError('phoneError');
            this.hideError('emailError');
            
            // Reset button state
            this.elements.submitBtn.classList.remove('loading');
            this.elements.submitBtn.disabled = true;
            
            // Remove success message
            const successMessage = this.elements.widget.querySelector('.success-message');
            if (successMessage) {
                successMessage.remove();
            }
            
            // Re-check form validity
            this.validateForm();
        }
    }
}

// Initialize the widget when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new WineMembersWidget());
} else {
    new WineMembersWidget();
}