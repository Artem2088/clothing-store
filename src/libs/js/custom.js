$(document).ready(function () {
    const popupError = $('.popup-error');
    const inputLoginEmail = $('#form-email [name="email"]');
    const inputRegisterEmail = $('#form-register [name="email"]');
    const emailSubmit = $('.login-container__submit');
    const descWidthMediaQuery = window.matchMedia('(min-width: 991px)');

    $('#mobile-menu').on('show', function() {
        $(':root').addClass('modal-open');
      });
      $('#mobile-menu').on('hide', function() {
        $(':root').removeClass('modal-open');
    });

    $('.header-mobile__button-menu').click(function () {
        if ($('.uk-offcanvas').hasClass('uk-open')) {
            $('.header-mobile__button').addClass('d-none');
            $('.header-mobile__button_close').removeClass('d-none');
        } else {
            $('.header-mobile__button').removeClass('d-none');
            $('.header-mobile__button_close').addClass('d-none');
        }
    });

    // Images lazyload
    new LazyLoad({
        callback_loaded: (img) => {
            //console.log('image loaded', img);
        },
    });

    // Обработка инпутов в формах, для отображения плашки вверху
	const initFormInputs = () => {
		try {
			const doc = document,
				inputs = doc.querySelectorAll('.js-form-field--input-text'),
				inputsNumber = doc.querySelectorAll('.js-input-number'),
                inputsPhone = doc.querySelectorAll('.js-input-phone'),
                inputsPassword = doc.querySelectorAll('.js-input-password'),
                inputsEmail = doc.querySelectorAll('.js-input-email'),
                inputsDate = doc.querySelectorAll('.js-input-date'),
                inputsTextarea = doc.querySelectorAll('.js-input-textarea-autogrow'),
                inputsVerificationCode= doc.querySelectorAll('.js-input-verificationCode');

            if (inputs.length) {
                inputs.forEach((input) => {
                    const title = input.querySelector('.js-input-title'),
                        field = input.querySelector('.js-input-text');

                    if (
                        input.classList.contains('.js-input-select') &&
                        input.querySelector('select').selectedIndex
                    ) {
                        title.classList.add('has-value');
                    } else {
                        if (
                            field &&
                            field.value &&
                            field.value.trim().length > 0
                        ) {
                            title.classList.add('has-value');
                        } else {
                            title.classList.remove('has-value');
                        }

                        field?.addEventListener('input', function () {
                            if (this.value.trim().length > 0) {
                                title.classList.add('has-value');
                            } else {
                                title.classList.remove('has-value');
                            }
                        });
                    }
                });
            }
            if (inputsNumber.length) {
                inputsNumber.forEach((input) => {
                    IMask(input, {
                        mask: Number,
                        min: 0,
                        max: Infinity,
                        thousandsSeparator: input.dataset.price === 'Y' ? ' ' : '',
                    });
                });
            }
            if (inputsPhone.length) {
                inputsPhone.forEach((input) => {
                    IMask(
                        input,
                        {
                            mask: '+{7} (000) 000-00-00',
                        }
                    )
                })

            }
            if (inputsTextarea.length) {
                inputsTextarea.forEach((textarea) => {
                    textarea?.addEventListener('input', function () {
                        textarea.style.height = '5px';
                        textarea.style.height = textarea.scrollHeight + 'px';
                    });
                });
            }

            if (inputsPassword.length) {
                inputsPassword.forEach((input) => {
                    let eye = input.parentElement.querySelector('.js-show-password')

                    eye.addEventListener('click', function () {
                        const use = this.querySelector('use');
                        if (use.href.baseVal.includes('off')) {
                            input.type = 'password'
                            use.href.baseVal = '/images/icons.svg#eye';
                        } else {
                            use.href.baseVal = '/images/icons.svg#eye-off';
                            input.type = 'text'
                        }

                    })

                });
            }

            if (inputsEmail.length) {
                inputsEmail.forEach((input) => {
                    // TODO
                })
            }

            if (inputsVerificationCode.length) {
                inputsVerificationCode.forEach((input) => {
                    IMask(
                        input,
                        {
                            mask: '00-00-00',
                        }
                    )
                })
            }

            if (inputsDate.length) {
                let year = new Date().getFullYear()
                inputsDate.forEach((input) => {
                    IMask(
                        input,
                        {
                            mask: Date,
                            lazy: false,
                                blocks: {
                                    d: {mask: IMask.MaskedRange, placeholderChar: 'д', from: 1, to: 31, maxLength: 2},
                                    m: {mask: IMask.MaskedRange, placeholderChar: 'м', from: 1, to: 12, maxLength: 2},
                                    Y: {mask: IMask.MaskedRange, placeholderChar: 'г', from: 1950, to: year, maxLength: 4}
                                }
                        }
                    )
                })
            }
        } catch (e) {
            console.warn('Error initFormInputs()', e);
        }
    };
    initFormInputs();

    const initFilepond = () => {
        try {
            FilePond.registerPlugin(
                FilePondPluginImagePreview,
                FilePondPluginFileValidateSize,
                FilePondPluginFilePoster
            );
            const inputs = document.querySelectorAll('.js-filepond');

            if (inputs.length) {
                window.PondObjects = [];
                inputs.forEach((input) => {
                    const inputParent = input.closest('.js-filepond-field'),
                        pondObj = FilePond.create(input, {
                            storeAsFile: true,
                            instantUpload: false,
                            allowMultiple: true,
                            labelIdle: input.getAttribute('data-label'),
                            styleButtonRemoveItemPosition: 'right',
                            allowProcess: false,
                            itemInsertLocation: 'after',
                        });
                    window.PondObjects[$(input).attr('name')] = pondObj;

                    pondObj.on('addfile', () => {
                        if (pondObj.getFiles().length > 0) {
                            inputParent.querySelector(
                                '.js-filepond-label-text'
                            ).textContent = 'Загрузить ещё фотографии';
                        }
                    });

                    pondObj.on('removefile', () => {
                        if (pondObj.getFiles().length === 0) {
                            inputParent.querySelector(
                                '.js-filepond-label-text'
                            ).textContent =
                                'Загрузите не менее одной фотографии вещи';
                        }
                    });
                });
            }
        } catch (e) {
            console.warn('Error initFilepond()', e);
        }
    };
    initFilepond();

    const initChosenPlugin = () => {
        try {
            $('.chosen-select.no-search')
                .chosen({ disable_search_threshold: 20 })
                .change(function () {
                    this.closest('.js-form-field--input-select')
                        .querySelector('.js-input-title')
                        .classList.add('has-value');
                });
            $('.chosen-select')
                .chosen({ no_results_text: 'Ничего не найдено...' })
                .change(function () {
                    this.closest('.js-form-field--input-select')
                        .querySelector('.js-input-title')
                        .classList.add('has-value');
                });
            $('.chosen-select-chips')
                .chosen({ no_results_text: 'Ничего не найдено...', placeholder_text_multiple:' ' })
                .ready(function () {
                    let select = document.querySelectorAll('.js-input-select.chosen-select-chips');
                    select.forEach(item => {
                        let buttonHtml = item.closest('.js-form-field--input-select-chips').querySelector('.js-chips-button-add') || `<div class="form-field__chips-button-add js-chips-button-add">${item.dataset.buttonText}</div>`;

                        item.closest('.js-form-field--input-select-chips').querySelector('.chosen-choices').insertAdjacentHTML('beforeend', buttonHtml);
                        buttonHtml = item.closest('.js-form-field--input-select-chips').querySelector('.js-chips-button-add');
                        item.classList.add('button-was-add')
                    })


                })
                .change(function () {
                    let buttonHtml = this.closest('.js-form-field--input-select-chips').querySelector('.js-chips-button-add');
                    let isOptions = Array.from(this.options).filter(option => option.selected).length

                    if (isOptions) {
                        buttonHtml.classList.add('has-options')
                    } else {
                        buttonHtml.classList.remove('has-options')
                    }
                });
        } catch (error) {
            console.warn('Error initChosenPlugin()', error);
        }
    };
    initChosenPlugin();

    // Обработчик событий для навигационных ссылок
    $('.header-nav__link').hover(function(e) {
        e.preventDefault();
        var dataNav = $(this).data('nav');
        closeModalWindows();
        console.log(e.currentTarget)

        var $targetModal = $('.modal[data-modal="' + dataNav + '"]');
        if ($targetModal.length) {
          $targetModal.closest('.modal-wrap').show();
          $targetModal.css('visibility', 'visible');
        }
      });

      $('.header-nav, .modal-wrap, .modal').on('mouseenter', function(e) {
            $(this).closest('.modal-wrap').show();
            $(this).closest('.modal').css('visibility', 'visible');
        }).on('mouseleave', function(e) {
            if (e.currentTarget.classList.value === 'modal modal-global-search') {
                return false;
            }
            $('.modal-wrap').hide();
            $('.modal').css('visibility', 'hidden');
      });


    // Обработчик событий для кнопок пользователя
    $('.header-main__button').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var dataUser = $(this).data('user');

        var $targetModal = $('.modal[data-modal="' + dataUser + '"]');
        if ($targetModal.length) {
            $targetModal.closest('.modal-wrap').show();
            $targetModal.css('visibility', 'visible');
            $('.root').css('overflow', 'hidden');
        }
    });

    // Функция для закрытия всех модальных окон
    function closeModalWindows() {
        $('.modal-wrap').hide();
        $('.modal').css('visibility', 'hidden');
        $('.root').removeAttr('style');
      }

    // Обработчик событий для клика вне модального окна
    $(document).on('click', function (e) {
        if (
            !$(e.target).closest('.modal').length &&
            !$(e.target).is('.header-nav__link, .header-main__button')
        ) {
            closeModalWindows();
        }
    });

    $('.global-search__container input').each(function () {
        if (!$(this).val().length) {
            $(this).next().addClass('d-flex');
        }
    });

    $('body').on('input', '.global-search__container input', function () {
        if ($(this).val().length) {
            $(this).next().removeClass('d-flex');
        } else {
            $(this).next().addClass('d-flex');
        }
    });

    $('.modal-global-search__close-button').on('click', function () {
        $('.global-search__container input').val('');
        $('.global-search__container input').next().addClass('d-flex');
        closeModalWindows();
    });

     // валидация формы на фронте

    // $('#form-phone input').on('keyup', function(){
    //     const phoneButton = $('.login-container__submit_phone');
    //     var inputVal = $(this).val().trim();

    //     if(inputVal.length == 18) {
    //         phoneButton.removeAttr('disabled');
    //     }
    // });

    // $('.login-container__submit_phone').click(function(){
    //     $('#form-phone').addClass('d-none');
    //     $('#form-code').removeClass('d-none');
    // });

    // $('#form-code input').on('keyup', function(){
    //     const codeButton = $('.login-container__submit_code');
    //     var inputVal = $(this).val().trim();

    //     if(inputVal.length == 8) {
    //         codeButton.removeAttr('disabled');
    //     }
    // });

    // $('.login-container__submit_code').click(function(){
    //     closeModalWindows();
    // });

    // $('#form-email input, #register input').on('keyup', function(){
    //     var inputVal = $(this).val();
    //     const regex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

    //     if (regex.test(inputVal)) {
    //         emailSubmit.removeAttr('disabled');
    //     }

    // });

    // $('.login-container__submit, .register-container__submit').on('click', function(){
    //     popupError.addClass('validation-error');
    //     inputLoginEmail.addClass('validation-error');
    //     inputRegisterEmail.addClass('validation-error');
    // });

    $('.popup-error__btn-close').on('click', function(){
        popupError.removeClass('validation-error');
        inputLoginEmail.removeClass('validation-error');
        inputRegisterEmail.removeClass('validation-error');
        emailSubmit.attr('disabled', true);
    });

    // function initAndClearInputs(modalSelector) {
    //     $(modalSelector).find('input').val('');
    //     $('.js-input-title').removeClass('has-value');
    //     emailSubmit.attr('disabled', true);
    //     popupError.removeClass('validation-error');
    //     inputLoginEmail.removeClass('validation-error');
    //     inputRegisterEmail.removeClass('validation-error');

    //     $(modalSelector).on('hidden.bs.modal', function () {
    //         $(this).find('input').val('');
    //         $('.js-input-title').removeClass('has-value');
    //         emailSubmit.attr('disabled', true);
    //         popupError.removeClass('validation-error');
    //         inputLoginEmail.removeClass('validation-error');
    //         inputRegisterEmail.removeClass('validation-error');
    //     });
    // }

    // initAndClearInputs('#login-email');
    // initAndClearInputs('#login-phone');
    // initAndClearInputs('#register');

    $('.commission__link').on('click', function () {
        let text = $('.js-display-block');
        if (text.hasClass('d-none')) {
            text.removeClass('d-none');
            $(this).addClass('d-none')
        }
    })


    $('.form-field__input').on('change', function() {
        // Добавляем класс только к метке связанной с выбранным чекбоксом
        if (this.checked) {
            $(this).next('.form-field__label').addClass('default-link active');
        } else {
            $(this).next('.form-field__label').removeClass('default-link active');
        }
    });

    $('.current__like-btn').on('click', function() {
        $(this).find('svg').toggleClass('icon-active')
    });

    $('.filter-catalog__lists .filter-catalog__button').on('click', function() {
        $('.filter-catalog__lists .filter-catalog__button').removeClass('active-tab');
        $(this).addClass('active-tab');
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('.filter-catalog__lists .filter-catalog__button').length) {
            $('.filter-catalog__lists .filter-catalog__button').removeClass('active-tab');
        }
    });

    const dataPathWidthMenu = ['/main.html', '/catalog.html', '/page-brands.html', '/page-brand-Bottega_Veneta.html', '/search-list.html'];
    const pathName = window.location.pathname;

    const checkPath = (data) => {
        let found = false;

        for (let i = 0; i < dataPathWidthMenu.length; i++) {
            if (data === dataPathWidthMenu[i]) {
                found = true;
                break;
            }
        };

        if (found) {
          $('.main').removeAttr('style');
        } else {
          $('.mobile-nav').toggleClass('d-none');
            if (descWidthMediaQuery.matches == false) {
                $('.main').css('padding-top', '2.9375rem');
            } else {
                $('.main').removeAttr('style');
            }
        }
      };

    checkPath(pathName);

    const initZoomImage = () => {
        try {
            $('.js-zoom-image').each(function () {
                $(this)
                    .wrap('<span style="display:inline-block;cursor: crosshair;"></span>')
                    .css('display', 'block')
                    .parent()
                    .zoom({url: $(this).data().bigImgSrc});
            })

            $('.js-zoom-image-mobile').each(function () {
                $(this)
                    .wrap('<span style="display:inline-block;cursor: crosshair; height:100%"></span>')
                    .css('display', 'block')
                    .parent()
                    .zoom({url: $(this).data().bigImgSrc});
            })

            if ($('#images-modal').length) {
                let loaderWrap = $('.js-images-modal-loader-wrap');
                function showImg() {

                }
                // Находим приёмник фотки
                let imgReceiver = $('.js-zoom-image-receiver-mobile');
                imgReceiver
                        .wrap('<span style="display:inline-block;cursor: crosshair; height:100%"></span>')
                        .css('display', 'block')

                UIkit.util.on('#images-modal', 'beforeshow', function () {
                    // Находим исходник фотки (текущий активный слайд)
                    let imgSource = $('.js-card-mobile-gallery').find('.uk-slide-active .js-zoom-image-source-mobile');

                    imgReceiver.data('big-img-src', imgSource.data().bigImgSrc)
                    imgReceiver.attr("src", imgSource.attr("src"));
                    imgReceiver
                        .parent()
                        .zoom({ url: imgReceiver.data().bigImgSrc, callback: function () {loaderWrap.fadeOut()} })
                });

                // При скрытии окна уничтожаем зум
                UIkit.util.on('#images-modal', 'hide', function (e) {
                    imgReceiver.trigger('zoom.destroy');
                    loaderWrap.css('display', 'block')
                });
            }

        } catch (error) {
            console.warn('Error initZoomImage()', error);
        }
    };
    initZoomImage();
});
