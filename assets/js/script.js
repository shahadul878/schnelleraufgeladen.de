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
    
    // Initialize country selector dropdowns
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
        // Add mobile menu toggle if needed
        if ($(window).width() <= 768) {
            $('.nav').addClass('mobile-nav');
            
            // Create mobile menu toggle
            if (!$('.mobile-toggle').length) {
                $('.header .container').append('<button class="mobile-toggle"><i class="fas fa-bars"></i></button>');
            }
            
            $('.mobile-toggle').on('click', function() {
                $('.nav').toggleClass('active');
                $(this).find('i').toggleClass('fa-bars fa-times');
            });
        }
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
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(102, 126, 234, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 1rem;
                transform: translateY(-100%);
                opacity: 0;
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

    // Add floating action button for quick access
    if (!$('.fab').length) {
        $('body').append(`
            <div class="fab">
                <i class="fas fa-phone"></i>
            </div>
        `);
        
        $('.fab').on('click', function() {
            showNotification('Kontakt', 'Sie werden mit unserem Support verbunden...', 'info');
        });
    }

    // Add CSS for floating action button
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .fab {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
                z-index: 1000;
            }
            
            .fab:hover {
                transform: scale(1.1);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
            }
                 `)
         .appendTo('head');
    
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
        $('#formModal').on('click', function(e) {
            if (e.target === this) {
                closeFormModal();
            }
        });
        
        // Next step functionality
        $('.next-step').on('click', function() {
            var nextStep = $(this).data('next');
            var currentStep = $(this).closest('.form-step').data('step');
            
            if (validateCurrentStep(currentStep)) {
                goToStep(nextStep);
            }
        });
        
        // Previous step functionality
        $('.prev-step').on('click', function() {
            var prevStep = $(this).data('prev');
            goToStep(prevStep);
        });
        
        // Provider selection
        $('.provider-option').on('click', function() {
            $('.provider-option').removeClass('selected');
            $(this).addClass('selected');
            window.formData.provider = $(this).find('.provider-logo').text().trim();
        });
        
        // Amount selection
        $('.amount-option').on('click', function() {
            $('.amount-option').removeClass('selected');
            $(this).addClass('selected');
            window.formData.amount = $(this).find('.amount').text();
        });
        
        // Payment method selection
        $('.payment-option').on('click', function() {
            $('.payment-option').removeClass('selected');
            $(this).addClass('selected');
            var paymentText = $(this).find('span').text();
            if (paymentText === '') {
                paymentText = $(this).find('.sofort-text').text();
            }
            window.formData.paymentMethod = paymentText;
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
        $('#formModal').removeClass('show');
        $('body').removeClass('modal-open');
        resetForm();
    }
    
    /**
     * Go to specific step
     */
    function goToStep(stepNumber) {
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
        var progressPercentage = (stepNumber / 6) * 100;
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
        $('.amount-option').removeClass('selected');
        $('.payment-option').removeClass('selected');
        
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
         $('.voucher-option').on('click', function() {
             $('.voucher-option').removeClass('selected');
             $(this).addClass('selected');
             window.voucherData.voucher = $(this).find('.voucher-logo').text().trim();
         });
         
         // Amount selection for voucher modal
         $('#voucherModal .amount-option').on('click', function() {
             $('#voucherModal .amount-option').removeClass('selected');
             $(this).addClass('selected');
             window.voucherData.amount = $(this).find('.amount').text();
         });
         
         // Payment method selection for voucher modal
         $('#voucherModal .payment-option').on('click', function() {
             $('#voucherModal .payment-option').removeClass('selected');
             $(this).addClass('selected');
             var paymentText = $(this).find('span').text();
             if (paymentText === '') {
                 paymentText = $(this).find('.sofort-text').text();
             }
             window.voucherData.paymentMethod = paymentText;
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
         $('#voucherModal .amount-option').removeClass('selected');
         $('#voucherModal .payment-option').removeClass('selected');
         
         // Reset progress
         updateVoucherProgressIndicator(1);
         updateVoucherStepCircles(1);
     }

    /**
     * Initialize country selector dropdowns
     */
    function initCountrySelectors() {
        console.log('Initializing country selectors...');
        
        // Country select change event
        $('.country-select').on('change', function() {
            var $select = $(this);
            var selectedOption = $select.find('option:selected');
            var selectorId = $select.attr('id');
            
            // Get country data
            var country = selectedOption.val();
            var phonePrefix = selectedOption.data('prefix');
            var countryName = selectedOption.text();
            
            // Extract flag emoji from the option text (first emoji character)
            var flagEmoji = selectedOption.text().match(/[\u{1F1E6}-\u{1F1FF}][\u{1F1E6}-\u{1F1FF}]/u);
            if (flagEmoji) {
                flagEmoji = flagEmoji[0];
            } else {
                // Fallback flags if emoji extraction fails
                var flagMap = {
                    'germany': '🇩🇪',
                    'austria': '🇦🇹',
                    'switzerland': '🇨🇭',
                    'netherlands': '🇳🇱',
                    'belgium': '🇧🇪',
                    'france': '🇫🇷',
                    'italy': '🇮🇹',
                    'spain': '🇪🇸'
                };
                flagEmoji = flagMap[country] || '🇩🇪';
            }
            
            // Update flag icon
            var flagIconId = 'flagIcon' + selectorId.replace('countrySelector', '');
            $('#' + flagIconId).text(flagEmoji);
            
            // Extract country code from the option text (e.g., "GER" from "🇩🇪 Deutschland (+49)")
            var countryCode = '';
            switch(country) {
                case 'germany': countryCode = 'GER'; break;
                case 'austria': countryCode = 'AUT'; break;
                case 'switzerland': countryCode = 'CHE'; break;
                case 'netherlands': countryCode = 'NLD'; break;
                case 'belgium': countryCode = 'BEL'; break;
                case 'france': countryCode = 'FRA'; break;
                case 'italy': countryCode = 'ITA'; break;
                case 'spain': countryCode = 'ESP'; break;
                default: countryCode = 'GER';
            }
            
            // Store selected country data
            $select.data('selected-country', {
                country: country,
                code: countryCode,
                prefix: phonePrefix,
                name: countryName
            });
            
            // Update form data if available
            if (selectorId === 'countrySelector1' && window.formData) {
                window.formData.country = country;
                window.formData.countryCode = countryCode;
                window.formData.phonePrefix = phonePrefix;
            } else if ((selectorId === 'countrySelector2' || selectorId === 'countrySelector3') && window.voucherData) {
                window.voucherData.country = country;
                window.voucherData.countryCode = countryCode;
                window.voucherData.phonePrefix = phonePrefix;
            }
            
            console.log('Country selected:', country, 'Prefix:', phonePrefix, 'Code:', countryCode, 'Flag:', flagEmoji);
        });
        
        // Initialize default selected state (Germany is already selected by default in HTML)
        $('.country-select').each(function() {
            $(this).trigger('change');
        });
    }
 });
