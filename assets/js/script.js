$(document).ready(function() {
    'use strict';

    // Initialize loading animations
    initLoadingAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize button interactions
    initButtonInteractions();
    
    // Initialize newsletter subscription
    initNewsletterSubscription();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize mobile menu (if needed)
    initMobileMenu();
    
    // Initialize form modal
    initFormModal();
    
    // Initialize voucher modal
    initVoucherModal();
    
    // Initialize country selectors
    initCountrySelectors();

    /**
     * Initialize loading animations for page elements
     */
    function initLoadingAnimations() {
        // Add loading class to elements
        $('.hero-text, .hero-visual, .step, .provider-card, .voucher-card').addClass('loading');
        
        // Trigger loading animation after page load
        setTimeout(function() {
            $('.loading').each(function(index) {
                var $element = $(this);
                setTimeout(function() {
                    $element.addClass('loaded');
                }, index * 100);
            });
        }, 300);
    }

    /**
     * Initialize smooth scrolling for navigation links
     */
    function initSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            
            var target = $(this.getAttribute('href'));
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800, 'easeInOutQuart');
            }
        });
    }

    /**
     * Initialize button interactions
     */
    function initButtonInteractions() {
        // Guthaben aufladen button
        $('#guthabenBtn').on('click', function() {
            openFormModal();
        });

        // Gutscheine kaufen button
        $('#gutscheineBtn').on('click', function() {
            openVoucherModal();
        });
    }

    /**
     * Initialize newsletter subscription
     */
    function initNewsletterSubscription() {
        $('#sendBtn').on('click', function() {
            var email = $('#newsletterEmail').val().trim();
            
            if (!email) {
                showNotification('Fehler', 'Bitte geben Sie eine E-Mail-Adresse ein.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Fehler', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
                return;
            }
            
            // Simulate newsletter subscription
            var $btn = $(this);
            var originalText = $btn.text();
            $btn.text('Senden...').prop('disabled', true);
            
            setTimeout(function() {
                $btn.text(originalText).prop('disabled', false);
                $('#newsletterEmail').val('');
                showNotification('Erfolg', 'Newsletter-Anmeldung erfolgreich!', 'success');
            }, 1500);
        });

        // Allow Enter key to submit
        $('#newsletterEmail').on('keypress', function(e) {
            if (e.which === 13) {
                $('#sendBtn').click();
            }
        });
    }

    /**
     * Initialize hover effects for cards
     */
    function initHoverEffects() {
        // Provider cards hover effect
        $('.provider-card').hover(
            function() {
                $(this).find('.provider-logo').css('transform', 'scale(1.1)');
            },
            function() {
                $(this).find('.provider-logo').css('transform', 'scale(1)');
            }
        );

        // Voucher cards hover effect
        $('.voucher-card').hover(
            function() {
                $(this).css('transform', 'translateY(-10px) scale(1.02)');
            },
            function() {
                $(this).css('transform', 'translateY(0) scale(1)');
            }
        );

        // Step icons hover effect
        // $('.step-icon').hover(
        //     function() {
        //         $(this).css('transform', 'scale(1.1) rotate(5deg)');
        //     },
        //     function() {
        //         $(this).css('transform', 'scale(1) rotate(0deg)');
        //     }
        // );
    }

    /**
     * Initialize scroll effects
     */
    function initScrollEffects() {
        $(window).on('scroll', function() {
            var scrollTop = $(window).scrollTop();
            
            // Header background opacity
            if (scrollTop > 100) {
                $('.header').addClass('scrolled');
            } else {
                $('.header').removeClass('scrolled');
            }
            
            // Parallax effect for hero section
            $('.hero-visual').css('transform', 'translateY(' + (scrollTop * 0.1) + 'px)');
            
            // Animate elements on scroll
            $('.step, .provider-card, .voucher-card').each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = scrollTop;
                var viewportBottom = scrollTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('animate-in');
                }
            });
        });
    }

    /**
     * Initialize mobile menu functionality
     */
    function initMobileMenu() {
        const $mobileMenuToggle = $('#mobileMenuToggle');
        const $mobileMenu = $('#mobileMenu');
        const $mobileMenuOverlay = $('#mobileMenuOverlay');
        const $mobileMenuClose = $('#mobileMenuClose');
        const $body = $('body');
        


        // Open mobile menu
        $mobileMenuToggle.on('click', function() {
            openMobileMenu();
        });

        // Close mobile menu
        $mobileMenuClose.on('click', function() {
            closeMobileMenu();
        });

        // Close on overlay click
        $mobileMenuOverlay.on('click', function() {
            closeMobileMenu();
        });

        // Close on escape key
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $mobileMenu.hasClass('active')) {
                closeMobileMenu();
            }
        });

        // Handle mobile menu link clicks
        $('.mobile-nav-link').on('click', function(e) {
            const section = $(this).data('section');
            
            // Close menu first
            closeMobileMenu();
            
            // Handle special sections
            if (section === 'guthaben') {
                e.preventDefault();
                setTimeout(function() {
                    openFormModal();
                }, 300);
            } else if (section === 'gutscheine') {
                e.preventDefault();
                setTimeout(function() {
                    openVoucherModal();
                }, 300);
            }
        });

        function openMobileMenu() {
            $mobileMenu.addClass('active');
            $mobileMenuOverlay.addClass('active');
            $mobileMenuToggle.addClass('active');
            $body.addClass('mobile-menu-open');
        }

        function closeMobileMenu() {
            $mobileMenu.removeClass('active');
            $mobileMenuOverlay.removeClass('active');
            $mobileMenuToggle.removeClass('active');
            $body.removeClass('mobile-menu-open');
        }

        // Handle window resize
        $(window).on('resize', function() {
            if ($(window).width() > 768 && $mobileMenu.hasClass('active')) {
                closeMobileMenu();
            }
        });
    }

    /**
     * Show notification message
     */
    function showNotification(title, message, type) {
        // Remove existing notifications
        $('.notification').remove();
        
        // Create notification element
        var notification = $('<div class="notification notification-' + type + '">' +
            '<div class="notification-content">' +
            '<h4>' + title + '</h4>' +
            '<p>' + message + '</p>' +
            '<button class="notification-close"><i class="fas fa-times"></i></button>' +
            '</div>' +
            '</div>');
        
        // Add to body
        $('body').append(notification);
        
        // Show notification
        setTimeout(function() {
            notification.addClass('show');
        }, 100);
        
        // Auto hide after 5 seconds
        setTimeout(function() {
            hideNotification(notification);
        }, 5000);
        
        // Close button functionality
        notification.find('.notification-close').on('click', function() {
            hideNotification(notification);
        });
    }

    /**
     * Hide notification
     */
    function hideNotification(notification) {
        notification.removeClass('show');
        setTimeout(function() {
            notification.remove();
        }, 300);
    }

    /**
     * Validate email format
     */
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Add custom easing for smooth animations
     */
    $.easing.easeInOutQuart = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    };

    // Add CSS for notifications
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                padding: 20px;
                max-width: 350px;
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                position: relative;
            }
            
            .notification h4 {
                margin: 0 0 10px 0;
                color: #2c3e50;
            }
            
            .notification p {
                margin: 0;
                color: #666;
                line-height: 1.4;
            }
            
            .notification-close {
                position: absolute;
                top: -10px;
                right: -10px;
                background: #e74c3c;
                color: white;
                border: none;
                border-radius: 50%;
                width: 25px;
                height: 25px;
                cursor: pointer;
                font-size: 12px;
            }
            
            .notification-success {
                border-left: 4px solid #27ae60;
            }
            
            .notification-error {
                border-left: 4px solid #e74c3c;
            }
            
            .notification-info {
                border-left: 4px solid #3498db;
            }
            
            .header.scrolled {
                background: rgba(102, 126, 234, 0.95);
                backdrop-filter: blur(10px);
            }
            
            .animate-in {
                animation: slideInUp 0.6s ease forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .mobile-nav {
                
                left: 0;
                right: 0;
               
                flex-direction: column;
                padding: 1rem;
              
                transition: all 0.3s ease;
            }
            
            .mobile-nav.active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .mobile-toggle {
                display: none;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .mobile-toggle {
                    display: block;
                }
            }
        `)
        .appendTo('head');

    // Handle window resize
    $(window).on('resize', function() {
        initMobileMenu();
    });

    // Add loading indicator for better UX
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Add some interactive features
    $('.provider-card, .voucher-card').on('click', function() {
        var cardType = $(this).hasClass('provider-card') ? 'Provider' : 'Voucher';
        var cardName = $(this).find('.provider-logo, .voucher-logo').text().trim();
        
        showNotification(
            cardType + ' ausgewählt', 
            'Sie haben ' + cardName + ' ausgewählt. Weiterleitung...', 
            'info'
        );
    });



    /**
     * Initialize form modal functionality
     */
    function initFormModal() {
        // Form data storage
        window.formData = {
            phoneNumber: '',
            provider: '',
            amount: '',
            paymentMethod: '',
            country: 'germany',
            countryCode: 'GER',
            phonePrefix: '+49'
        };
        
        // Close modal functionality
        $('#closeModal, #closeForm').on('click', function() {
            closeFormModal();
        });
        
        // Close modal when clicking outside
        $('body').on('click', function(e) {
            if (e.target === this) {
                closeFormModal();
            }
        });
        
                 // Next step functionality
         $('.next-step').on('click', function() {
             var nextStep = $(this).data('next');
             var currentStep = $(this).closest('.form-step').data('step');
             
             console.log('Next button clicked - Current step:', currentStep, 'Next step:', nextStep);
             
             if (validateCurrentStep(currentStep)) {
                 goToStep(nextStep);
             }
         });
        
                 // Previous step functionality
         $('.prev-step').on('click', function() {
             var prevStep = $(this).data('prev');
             console.log('Prev button clicked - Going to step:', prevStep);
             goToStep(prevStep);
         });
        
        // Provider selection
        $('.provider-radio').on('change', function() {
            $('.provider-option').removeClass('selected');
            $(this).closest('.provider-option').addClass('selected');
            window.formData.provider = $(this).val();
        });
        
        // Amount selection
        $('.amount-radio').on('change', function() {
            $('.amount-option').removeClass('selected');
            $(this).closest('.amount-option').addClass('selected');
            window.formData.amount = $(this).val();
        });
        
        // Payment method selection
        $('.payment-radio').on('change', function() {
            $('.payment-option').removeClass('selected');
            $(this).closest('.payment-option').addClass('selected');
            window.formData.paymentMethod = $(this).val();
        });
        
        // Phone number input
        $('#phoneNumber').on('input', function() {
            window.formData.phoneNumber = $(this).val();
        });
    }
    
    /**
     * Open form modal
     */
    function openFormModal() {
        $('#formModal').addClass('show');
        $('body').addClass('modal-open');
        resetForm();
        goToStep(1);
    }
    
    /**
     * Close form modal
     */
    function closeFormModal() {
        $('#formModal, #voucherModal').removeClass('show');
        $('body').removeClass('modal-open');
        resetForm();
    }
    
         /**
      * Go to specific step
      */
     function goToStep(stepNumber) {
         console.log('Going to step:', stepNumber);
         
         // Hide all steps
         $('.form-step').removeClass('active');
         
         // Show target step
         $('.form-step[data-step="' + stepNumber + '"]').addClass('active');
         
         // Update progress indicator
         updateProgressIndicator(stepNumber);
         
         // Update step circles
         updateStepCircles(stepNumber);
         
         // Update summary if on step 5
         if (stepNumber === 5) {
             updateOrderSummary();
         }
         
         // Generate order number if on step 6
         if (stepNumber === 6) {
             generateOrderNumber();
         }
     }
    
    /**
     * Update progress indicator
     */
    function updateProgressIndicator(stepNumber) {
        var progressPercentage = (stepNumber / 7) * 100;
        $('#progressFill').css('width', progressPercentage + '%');
    }
    
    /**
     * Update step circles
     */
    function updateStepCircles(stepNumber) {
        $('.step-circle').removeClass('active completed');
        
        for (var i = 1; i <= 6; i++) {
            if (i < stepNumber) {
                $('.step-circle[data-step="' + i + '"]').addClass('completed');
            } else if (i === stepNumber) {
                $('.step-circle[data-step="' + i + '"]').addClass('active');
            }
        }
    }
    
    /**
     * Validate current step
     */
    function validateCurrentStep(stepNumber) {
        switch(stepNumber) {
            case 1:
                if (!window.formData.phoneNumber || window.formData.phoneNumber.length < 10) {
                    showNotification('Fehler', 'Bitte geben Sie eine gültige Telefonnummer ein.', 'error');
                    return false;
                }
                break;
            case 2:
                if (!window.formData.provider) {
                    showNotification('Fehler', 'Bitte wählen Sie einen Anbieter aus.', 'error');
                    return false;
                }
                break;
            case 3:
                if (!window.formData.amount) {
                    showNotification('Fehler', 'Bitte wählen Sie einen Betrag aus.', 'error');
                    return false;
                }
                break;
            case 4:
                if (!window.formData.paymentMethod) {
                    showNotification('Fehler', 'Bitte wählen Sie eine Zahlungsmethode aus.', 'error');
                    return false;
                }
                break;
        }
        return true;
    }
    
    /**
     * Update order summary
     */
    function updateOrderSummary() {
        $('#summaryPhone').text('+49 ' + window.formData.phoneNumber);
        $('#summaryProvider').text(window.formData.provider);
        $('#summaryAmount').text(window.formData.amount);
        $('#summaryPayment').text(window.formData.paymentMethod);
    }
    
    /**
     * Generate order number
     */
    function generateOrderNumber() {
        var orderNumber = 'ORD-' + Date.now().toString().slice(-8);
        $('#orderNumber').text(orderNumber);
    }
    
    /**
     * Reset form
     */
    function resetForm() {
        window.formData = {
            phoneNumber: '',
            provider: '',
            amount: '',
            paymentMethod: '',
            country: 'germany',
            countryCode: 'GER',
            phonePrefix: '+49'
        };
        
        // Reset form elements
        $('#phoneNumber').val('');
        $('.provider-option').removeClass('selected');
        $('.provider-radio').prop('checked', false);
        $('.amount-option').removeClass('selected');
        $('.amount-radio').prop('checked', false);
        $('.payment-option').removeClass('selected');
        $('.payment-radio').prop('checked', false);
        
                 // Reset progress
         updateProgressIndicator(1);
         updateStepCircles(1);
     }
     
     /**
      * Initialize voucher modal functionality
      */
     function initVoucherModal() {
         // Voucher form data storage
         window.voucherData = {
             phoneNumber: '',
             voucher: '',
             amount: '',
             paymentMethod: '',
             verificationPhone: '',
             country: 'germany',
             countryCode: 'GER',
             phonePrefix: '+49'
         };
         
         // Close voucher modal functionality
         $('#closeVoucherModal, #closeVoucherForm').on('click', function() {
             closeVoucherModal();
         });
         
         // Close modal when clicking outside
         $('#voucherModal').on('click', function(e) {
             if (e.target === this) {
                 closeVoucherModal();
             }
         });
         
         // Next step functionality for voucher modal
         $('#voucherModal .next-step').on('click', function() {
             var nextStep = $(this).data('next');
             var currentStep = $(this).closest('.form-step').data('step');
             
             if (validateVoucherStep(currentStep)) {
                 goToVoucherStep(nextStep);
             }
         });
         
         // Previous step functionality for voucher modal
         $('#voucherModal .prev-step').on('click', function() {
             var prevStep = $(this).data('prev');
             goToVoucherStep(prevStep);
         });
         
         // Voucher selection
         $('.voucher-radio').on('change', function() {
             $('.voucher-option').removeClass('selected');
             $(this).closest('.voucher-option').addClass('selected');
             window.voucherData.voucher = $(this).val();
             console.log('Voucher selected:', window.voucherData.voucher);
         });
         
         // Amount selection for voucher modal
         $('#voucherModal .amount-option').on('click', function() {
             $('#voucherModal .amount-option').removeClass('selected');
             $(this).addClass('selected');
             window.voucherData.amount = $(this).find('.amount').text();
         });
         
                   // Payment method selection for voucher modal
          $('#voucherModal .payment-radio').on('change', function() {
              $('#voucherModal .payment-option').removeClass('selected');
              $(this).closest('.payment-option').addClass('selected');
              window.voucherData.paymentMethod = $(this).val();
          });
         
         // Phone number input for voucher modal
         $('#voucherPhoneNumber').on('input', function() {
             window.voucherData.phoneNumber = $(this).val();
         });
         
         // Verification phone input
         $('#verificationPhone').on('input', function() {
             window.voucherData.verificationPhone = $(this).val();
         });
     }
     
     /**
      * Open voucher modal
      */
     function openVoucherModal() {
         $('#voucherModal').addClass('show');
         $('body').addClass('modal-open');
         resetVoucherForm();
         goToVoucherStep(1);
     }
     
     /**
      * Close voucher modal
      */
     function closeVoucherModal() {
         $('#voucherModal').removeClass('show');
         $('body').removeClass('modal-open');
         resetVoucherForm();
     }
     
     /**
      * Go to specific voucher step
      */
     function goToVoucherStep(stepNumber) {
         // Hide all steps
         $('#voucherModal .form-step').removeClass('active');
         
         // Show target step
         $('#voucherModal .form-step[data-step="' + stepNumber + '"]').addClass('active');
         
         // Update progress indicator
         updateVoucherProgressIndicator(stepNumber);
         
         // Update step circles
         updateVoucherStepCircles(stepNumber);
         
         // Update summary if on step 6
         if (stepNumber === 6) {
             updateVoucherOrderSummary();
         }
     }
     
     /**
      * Update voucher progress indicator
      */
     function updateVoucherProgressIndicator(stepNumber) {
         var progressPercentage = (stepNumber / 7) * 100;
         $('#voucherProgressFill').css('width', progressPercentage + '%');
     }
     
     /**
      * Update voucher step circles
      */
     function updateVoucherStepCircles(stepNumber) {
         $('#voucherModal .step-circle').removeClass('active completed');
         
         for (var i = 1; i <= 7; i++) {
             if (i < stepNumber) {
                 $('#voucherModal .step-circle[data-step="' + i + '"]').addClass('completed');
             } else if (i === stepNumber) {
                 $('#voucherModal .step-circle[data-step="' + i + '"]').addClass('active');
             }
         }
     }
     
     /**
      * Validate voucher step
      */
     function validateVoucherStep(stepNumber) {
         switch(stepNumber) {
             case 1:
                 if (!window.voucherData.phoneNumber || window.voucherData.phoneNumber.length < 10) {
                     showNotification('Fehler', 'Bitte geben Sie eine gültige Telefonnummer ein.', 'error');
                     return false;
                 }
                 break;
             case 2:
                 if (!window.voucherData.voucher) {
                     showNotification('Fehler', 'Bitte wählen Sie einen Gutschein aus.', 'error');
                     return false;
                 }
                 break;
             case 3:
                 if (!window.voucherData.amount) {
                     showNotification('Fehler', 'Bitte wählen Sie einen Betrag aus.', 'error');
                     return false;
                 }
                 break;
             case 4:
                 if (!window.voucherData.paymentMethod) {
                     showNotification('Fehler', 'Bitte wählen Sie eine Zahlungsmethode aus.', 'error');
                     return false;
                 }
                 break;
             case 5:
                 if (!window.voucherData.verificationPhone || window.voucherData.verificationPhone.length < 10) {
                     showNotification('Fehler', 'Bitte geben Sie eine gültige Verifikationsnummer ein.', 'error');
                     return false;
                 }
                 break;
         }
         return true;
     }
     
     /**
      * Update voucher order summary
      */
     function updateVoucherOrderSummary() {
         $('#voucherSummaryPhone').text('+49 ' + window.voucherData.phoneNumber);
         $('#voucherSummaryAmount').text(window.voucherData.amount);
         $('#voucherSummaryPayment').text(window.voucherData.paymentMethod);
         $('#voucherSummaryTotal').text(window.voucherData.amount);
     }
     
     /**
      * Reset voucher form
      */
     function resetVoucherForm() {
         window.voucherData = {
             phoneNumber: '',
             voucher: '',
             amount: '',
             paymentMethod: '',
             verificationPhone: '',
             country: 'germany',
             countryCode: 'GER',
             phonePrefix: '+49'
         };
         
         // Reset form elements
         $('#voucherPhoneNumber').val('');
         $('#verificationPhone').val('');
         $('#smsCode').val('');
         $('.voucher-option').removeClass('selected');
         $('.voucher-radio').prop('checked', false);
         $('#voucherModal .amount-option').removeClass('selected');
         $('#voucherModal .amount-radio').prop('checked', false);
         $('#voucherModal .payment-option').removeClass('selected');
         $('#voucherModal .payment-radio').prop('checked', false);
         
         // Reset progress
         updateVoucherProgressIndicator(1);
         updateVoucherStepCircles(1);
     }
     
         /**
     * Initialize country selectors with FlagCDN integration
     */
    function initCountrySelectors() {
        // Simple map of ISO -> flag image URL (using FlagCDN 24px height variant)
        const flagUrl = iso => `https://flagcdn.com/w40/${iso}.png`; // 40px wide PNG (approx 24px tall)
        
        function initializeCountrySelector(selectorId, flagId, phoneId, fullPhoneId) {
            const countryEl = document.getElementById(selectorId);
            const flagEl = document.getElementById(flagId);
            const phoneEl = document.getElementById(phoneId);
            const fullEl = document.getElementById(fullPhoneId);
            
            if (!countryEl || !flagEl || !phoneEl || !fullEl) return;
            
            function setFlagFromSelect() {
                const iso = countryEl.options[countryEl.selectedIndex].dataset.iso;
                if (iso) {
                    flagEl.style.backgroundImage = `url("${flagUrl(iso)}")`;
                }
            }
            
            function updateHidden() {
                const dial = countryEl.value.trim();
                const local = phoneEl.value.replace(/^\s+|\s+$/g, '');
                // Normalize: keep a single space between code and local number (no double +)
                const localClean = local.replace(/^\+?\d*/, (m) => m.startsWith('+') ? '' : m); // drop accidental code
                fullEl.value = `${dial} ${localClean}`;
            }
            
            function updatePlaceholder() {
                const prefix = countryEl.options[countryEl.selectedIndex].dataset.prefix;
                phoneEl.placeholder = `Handynummer eingeben (${prefix})`;
            }
            
            // Initialize
            setFlagFromSelect();
            updatePlaceholder();
            updateHidden();
            
            // Events
            countryEl.addEventListener('change', () => {
                setFlagFromSelect();
                updatePlaceholder();
                // Optionally prefill code visually if user started empty
                if (!phoneEl.value.trim().length) {
                    phoneEl.value = '';
                }
                updateHidden();
            });
            
            phoneEl.addEventListener('input', updateHidden);
            
            // Optional: prevent users from typing a '+' country code in local field
            phoneEl.addEventListener('beforeinput', (e) => {
                if (e.data === '+') e.preventDefault();
            });
        }
        
        // Initialize all country selectors
        initializeCountrySelector('countrySelector1', 'flag1', 'phoneNumber', 'full_phone1');
        initializeCountrySelector('countrySelector5', 'flag5', 'phone-verify', 'full_phone5');
        initializeCountrySelector('countrySelector2', 'flag2', 'voucherPhoneNumber', 'full_phone2');
        initializeCountrySelector('countrySelector5', 'flag5-voucher', 'voucher-phone-verify', 'full_phone5-voucher');
        
        // If used inside a form, ensure hidden full number is synced on submit
        document.addEventListener('submit', () => {
            document.querySelectorAll('.country-select').forEach(select => {
                const phoneInput = select.closest('.phone-input-group').querySelector('.phone-input');
                const fullInput = select.closest('.phone-input-group').querySelector('input[type="hidden"]');
                if (phoneInput && fullInput) {
                    const dial = select.value.trim();
                    const local = phoneInput.value.replace(/^\s+|\s+$/g, '');
                    const localClean = local.replace(/^\+?\d*/, (m) => m.startsWith('+') ? '' : m);
                    fullInput.value = `${dial} ${localClean}`;
                }
            });
        }, true);
    }

 });
