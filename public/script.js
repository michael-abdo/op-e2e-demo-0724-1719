// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeModalFunctionality();
    initializeFormHandlers();
    initializeCalculator();
    initializeSearch();
    initializeNavigation();
    console.log('🚀 Demo app JavaScript initialized');
});

// Modal Management
function initializeModalFunctionality() {
    const signinModal = document.getElementById('signin-modal');
    const searchModal = document.getElementById('search-modal');
    const signinBtn = document.getElementById('signin-btn');
    const signinForm = document.getElementById('signin-form');
    
    // Sign In Modal
    if (signinBtn && signinModal) {
        signinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(signinModal);
        });
    }
    
    // Modal close handlers
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            hideModal(this.closest('.modal'));
        });
    });
    
    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideModal(this);
            }
        });
    });
    
    // Cancel login button
    const cancelLogin = document.getElementById('cancel-login');
    if (cancelLogin) {
        cancelLogin.addEventListener('click', function() {
            hideModal(signinModal);
        });
    }
    
    // Sign In Form Handling
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignIn();
        });
    }
}

function showModal(modal) {
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modal) {
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clear any error messages
        const errorDiv = modal.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
        
        // Reset forms
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

function handleSignIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    
    // Clear previous errors
    errorDiv.style.display = 'none';
    
    // Validation
    if (!email) {
        showError(errorDiv, 'Email is required');
        return;
    }
    
    if (!password) {
        showError(errorDiv, 'Password is required');
        return;
    }
    
    // Simulate login success
    setTimeout(() => {
        hideModal(document.getElementById('signin-modal'));
        
        // Show success notification instead of alert
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            font-weight: 500;
        `;
        notification.textContent = 'Login successful! (Demo mode)';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }, 500);
}

function showError(errorDiv, message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Form Handlers
function initializeFormHandlers() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }
}

function handleContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        showFormError('All fields are required');
        return;
    }
    
    // Simulate form submission
    const formData = { name, email, message };
    
    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showFormSuccess();
            document.getElementById('contact-form').reset();
        } else {
            showFormError('Failed to send message. Please try again.');
        }
    })
    .catch(() => {
        showFormError('Network error. Please try again.');
    });
}

function showFormSuccess() {
    hideFormError();
    const successDiv = document.getElementById('form-success');
    if (successDiv) {
        successDiv.style.display = 'block';
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth' });
        
        // Hide after 5 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    }
}

function showFormError(message) {
    hideFormSuccess();
    const errorDiv = document.getElementById('form-error');
    if (errorDiv) {
        errorDiv.querySelector('p').textContent = message;
        errorDiv.style.display = 'block';
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

function hideFormSuccess() {
    const successDiv = document.getElementById('form-success');
    if (successDiv) {
        successDiv.style.display = 'none';
    }
}

function hideFormError() {
    const errorDiv = document.getElementById('form-error');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Calculator Functionality
function initializeCalculator() {
    const calculatorForm = document.getElementById('calculator-form');
    const resetBtn = document.getElementById('reset-btn');
    const taxBreakdownToggle = document.getElementById('tax-breakdown-toggle');
    
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCalculation();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetCalculator();
        });
    }
    
    if (taxBreakdownToggle) {
        taxBreakdownToggle.addEventListener('click', function() {
            toggleTaxBreakdown();
        });
    }
}

function handleCalculation() {
    const contractTitle = document.getElementById('contract-title').value || 'Untitled Contract';
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 150;
    const hoursPerWeek = parseFloat(document.getElementById('hours-per-week').value) || 40;
    const weeksPerYear = parseFloat(document.getElementById('weeks-per-year').value) || 52;
    
    // Calculate totals
    const grossPay = hourlyRate * hoursPerWeek * weeksPerYear;
    const federalTax = grossPay * 0.22;
    const stateTax = grossPay * 0.08;
    const socialSecurity = grossPay * 0.062;
    const medicare = grossPay * 0.0145;
    const totalTax = federalTax + stateTax + socialSecurity + medicare;
    const netPay = grossPay - totalTax;
    
    // Update UI
    document.getElementById('gross-pay-amount').textContent = `$${Math.round(grossPay).toLocaleString()}`;
    document.getElementById('net-pay-amount').textContent = `$${Math.round(netPay).toLocaleString()}`;
    document.getElementById('federal-tax').textContent = `$${Math.round(federalTax).toLocaleString()}`;
    document.getElementById('state-tax').textContent = `$${Math.round(stateTax).toLocaleString()}`;
    document.getElementById('social-security').textContent = `$${Math.round(socialSecurity).toLocaleString()}`;
    document.getElementById('medicare').textContent = `$${Math.round(medicare).toLocaleString()}`;
    document.getElementById('total-tax').textContent = `$${Math.round(totalTax).toLocaleString()}`;
    
    // Show results panel
    const resultsPanel = document.getElementById('calculation-results');
    if (resultsPanel) {
        resultsPanel.style.display = 'block';
        resultsPanel.scrollIntoView({ behavior: 'smooth' });
    }
    
    console.log('✅ Calculation completed:', {
        contractTitle,
        hourlyRate,
        grossPay: Math.round(grossPay),
        netPay: Math.round(netPay)
    });
}

function resetCalculator() {
    // Reset form fields to defaults
    document.getElementById('contract-title').value = '';
    document.getElementById('hourly-rate').value = '150';
    document.getElementById('hours-per-week').value = '40';
    document.getElementById('weeks-per-year').value = '52';
    
    // Hide results panel
    const resultsPanel = document.getElementById('calculation-results');
    if (resultsPanel) {
        resultsPanel.style.display = 'none';
    }
    
    // Collapse tax breakdown if open
    const taxContent = document.getElementById('tax-breakdown-content');
    const taxToggle = document.getElementById('tax-breakdown-toggle');
    if (taxContent && taxToggle) {
        taxContent.style.display = 'none';
        taxToggle.classList.remove('active');
    }
    
    console.log('🔄 Calculator reset');
}

function toggleTaxBreakdown() {
    const content = document.getElementById('tax-breakdown-content');
    const toggle = document.getElementById('tax-breakdown-toggle');
    
    if (content && toggle) {
        const isVisible = content.style.display === 'block';
        
        if (isVisible) {
            content.style.display = 'none';
            toggle.classList.remove('active');
        } else {
            content.style.display = 'block';
            toggle.classList.add('active');
        }
        
        console.log('📊 Tax breakdown toggled:', !isVisible ? 'expanded' : 'collapsed');
    }
}

// Search Functionality
function initializeSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const searchModal = document.getElementById('search-modal');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            handleSearch();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // Search modal close
    const searchModalClose = document.getElementById('search-modal-close');
    if (searchModalClose) {
        searchModalClose.addEventListener('click', function() {
            hideModal(searchModal);
        });
    }
}

function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchModal = document.getElementById('search-modal');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchModal || !searchResults) return;
    
    const query = searchInput.value.trim();
    
    if (!query) {
        alert('Please enter search term');
        searchInput.focus();
        return;
    }
    
    // Simulate search results
    const mockResults = [
        {
            title: 'Premium Wireless Headphones',
            description: 'High-quality wireless headphones with noise cancellation.'
        },
        {
            title: 'Smart Fitness Tracker',
            description: 'Track your fitness goals with this smart wearable device.'
        },
        {
            title: 'Ultra-Portable Laptop',
            description: 'Powerful laptop computer perfect for work and entertainment.'
        }
    ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    
    // Update search results
    if (mockResults.length > 0) {
        searchResults.innerHTML = mockResults.map(result => `
            <div class="search-result">
                <h4>${result.title}</h4>
                <p>${result.description}</p>
            </div>
        `).join('');
    } else {
        searchResults.innerHTML = '<p>No results found for "' + query + '"</p>';
    }
    
    // Show search modal
    showModal(searchModal);
    
    console.log('🔍 Search performed:', query, 'Results:', mockResults.length);
}

// Navigation
function initializeNavigation() {
    // Dropdown menu handling (even though CSS hover is broken)
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Click to toggle dropdown (fallback for broken hover)
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.style.opacity = '0';
                            otherMenu.style.visibility = 'hidden';
                        }
                    }
                });
                
                // Toggle current dropdown
                const isVisible = menu.style.opacity === '1';
                if (isVisible) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                } else {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                }
            });
        }
    });
}

// Button interaction feedback
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn') && !e.target.disabled) {
        // Add click feedback for buttons
        e.target.style.transform = 'translateY(1px)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Development helpers
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Development mode detected');
    window.demoApp = {
        showModal,
        hideModal,
        handleCalculation,
        resetCalculator,
        handleSearch
    };
}