$(document).ready((function(){const e=$(".popup-error"),t=$('#form-email [name="email"]'),s=$('#form-register [name="email"]'),l=$(".login-container__submit"),a=window.matchMedia("(min-width: 991px)");$("#mobile-menu").on("show",(function(){$(":root").addClass("modal-open")})),$("#mobile-menu").on("hide",(function(){$(":root").removeClass("modal-open")})),$(".header-mobile__button-menu").click((function(){$(".uk-offcanvas").hasClass("uk-open")?($(".header-mobile__button").addClass("d-none"),$(".header-mobile__button_close").removeClass("d-none")):($(".header-mobile__button").removeClass("d-none"),$(".header-mobile__button_close").addClass("d-none"))})),new LazyLoad({callback_loaded:e=>{}});(()=>{try{const e=document,t=e.querySelectorAll(".js-form-field--input-text"),s=e.querySelectorAll(".js-input-number"),l=e.querySelectorAll(".js-input-phone"),a=e.querySelectorAll(".js-input-password"),o=e.querySelectorAll(".js-input-email"),i=e.querySelectorAll(".js-input-date"),n=e.querySelectorAll(".js-input-textarea-autogrow"),r=e.querySelectorAll(".js-input-verificationCode");if(t.length&&t.forEach((e=>{const t=e.querySelector(".js-input-title"),s=e.querySelector(".js-input-text");e.classList.contains(".js-input-select")&&e.querySelector("select").selectedIndex?t.classList.add("has-value"):(s&&s.value&&s.value.trim().length>0?t.classList.add("has-value"):t.classList.remove("has-value"),s?.addEventListener("input",(function(){this.value.trim().length>0?t.classList.add("has-value"):t.classList.remove("has-value")})))})),s.length&&s.forEach((e=>{IMask(e,{mask:Number,min:0,max:1/0,thousandsSeparator:"Y"===e.dataset.price?" ":""})})),l.length&&l.forEach((e=>{IMask(e,{mask:"+{7} (000) 000-00-00"})})),n.length&&n.forEach((e=>{e?.addEventListener("input",(function(){e.style.height="5px",e.style.height=e.scrollHeight+"px"}))})),a.length&&a.forEach((e=>{e.parentElement.querySelector(".js-show-password").addEventListener("click",(function(){const t=this.querySelector("use");t.href.baseVal.includes("off")?(e.type="password",t.href.baseVal="/images/icons.svg#eye"):(t.href.baseVal="/images/icons.svg#eye-off",e.type="text")}))})),o.length&&o.forEach((e=>{})),r.length&&r.forEach((e=>{IMask(e,{mask:"00-00-00"})})),i.length){let e=(new Date).getFullYear();i.forEach((t=>{IMask(t,{mask:Date,lazy:!1,blocks:{d:{mask:IMask.MaskedRange,placeholderChar:"д",from:1,to:31,maxLength:2},m:{mask:IMask.MaskedRange,placeholderChar:"м",from:1,to:12,maxLength:2},Y:{mask:IMask.MaskedRange,placeholderChar:"г",from:1950,to:e,maxLength:4}}})}))}}catch(e){console.warn("Error initFormInputs()",e)}})();(()=>{try{FilePond.registerPlugin(FilePondPluginImagePreview,FilePondPluginFileValidateSize,FilePondPluginFilePoster);const e=document.querySelectorAll(".js-filepond");e.length&&(window.PondObjects=[],e.forEach((e=>{const t=e.closest(".js-filepond-field"),s=FilePond.create(e,{storeAsFile:!0,instantUpload:!1,allowMultiple:!0,labelIdle:e.getAttribute("data-label"),styleButtonRemoveItemPosition:"right",allowProcess:!1,itemInsertLocation:"after"});window.PondObjects[$(e).attr("name")]=s,s.on("addfile",(()=>{s.getFiles().length>0&&(t.querySelector(".js-filepond-label-text").textContent="Загрузить ещё фотографии")})),s.on("removefile",(()=>{0===s.getFiles().length&&(t.querySelector(".js-filepond-label-text").textContent="Загрузите не менее одной фотографии вещи")}))})))}catch(e){console.warn("Error initFilepond()",e)}})();function o(){$(".modal-wrap").hide(),$(".modal").css("visibility","hidden"),$(".root").removeAttr("style")}(()=>{try{$(".chosen-select.no-search").chosen({disable_search_threshold:20}).change((function(){this.closest(".js-form-field--input-select").querySelector(".js-input-title").classList.add("has-value")})),$(".chosen-select").chosen({no_results_text:"Ничего не найдено..."}).change((function(){this.closest(".js-form-field--input-select").querySelector(".js-input-title").classList.add("has-value")})),$(".chosen-select-chips").chosen({no_results_text:"Ничего не найдено...",placeholder_text_multiple:" "}).ready((function(){document.querySelectorAll(".js-input-select.chosen-select-chips").forEach((e=>{let t=e.closest(".js-form-field--input-select-chips").querySelector(".js-chips-button-add")||`<div class="form-field__chips-button-add js-chips-button-add">${e.dataset.buttonText}</div>`;e.closest(".js-form-field--input-select-chips").querySelector(".chosen-choices").insertAdjacentHTML("beforeend",t),t=e.closest(".js-form-field--input-select-chips").querySelector(".js-chips-button-add"),e.classList.add("button-was-add")}))})).change((function(){let e=this.closest(".js-form-field--input-select-chips").querySelector(".js-chips-button-add");Array.from(this.options).filter((e=>e.selected)).length?e.classList.add("has-options"):e.classList.remove("has-options")}))}catch(e){console.warn("Error initChosenPlugin()",e)}})(),$(".header-nav__link").hover((function(e){e.preventDefault();var t=$(this).data("nav");o(),console.log(e.currentTarget);var s=$('.modal[data-modal="'+t+'"]');s.length&&(s.closest(".modal-wrap").show(),s.css("visibility","visible"))})),$(".header-nav, .modal-wrap, .modal").on("mouseenter",(function(e){$(this).closest(".modal-wrap").show(),$(this).closest(".modal").css("visibility","visible")})).on("mouseleave",(function(e){if("modal modal-global-search"===e.currentTarget.classList.value)return!1;$(".modal-wrap").hide(),$(".modal").css("visibility","hidden")})),$(".header-main__button").on("click",(function(e){e.preventDefault(),e.stopPropagation();var t=$(this).data("user"),s=$('.modal[data-modal="'+t+'"]');s.length&&(s.closest(".modal-wrap").show(),s.css("visibility","visible"),$(".root").css("overflow","hidden"))})),$(document).on("click",(function(e){$(e.target).closest(".modal").length||$(e.target).is(".header-nav__link, .header-main__button")||o()})),$(".global-search__container input").each((function(){$(this).val().length||$(this).next().addClass("d-flex")})),$("body").on("input",".global-search__container input",(function(){$(this).val().length?$(this).next().removeClass("d-flex"):$(this).next().addClass("d-flex")})),$(".modal-global-search__close-button").on("click",(function(){$(".global-search__container input").val(""),$(".global-search__container input").next().addClass("d-flex"),o()})),$(".popup-error__btn-close").on("click",(function(){e.removeClass("validation-error"),t.removeClass("validation-error"),s.removeClass("validation-error"),l.attr("disabled",!0)})),$(".commission__link").on("click",(function(){let e=$(".js-display-block");e.hasClass("d-none")&&(e.removeClass("d-none"),$(this).addClass("d-none"))})),$(".form-field__input").on("change",(function(){this.checked?$(this).next(".form-field__label").addClass("default-link active"):$(this).next(".form-field__label").removeClass("default-link active")})),$(".current__like-btn").on("click",(function(){$(this).find("svg").toggleClass("icon-active")})),$(".filter-catalog__lists .filter-catalog__button").on("click",(function(){$(".filter-catalog__lists .filter-catalog__button").removeClass("active-tab"),$(this).addClass("active-tab")})),$(document).on("click",(function(e){$(e.target).closest(".filter-catalog__lists .filter-catalog__button").length||$(".filter-catalog__lists .filter-catalog__button").removeClass("active-tab")}));const i=["/main.html","/catalog.html","/page-brands.html","/page-brand-Bottega_Veneta.html","/search-list.html"];(e=>{let t=!1;for(let s=0;s<i.length;s++)if(e===i[s]){t=!0;break}t?$(".main").removeAttr("style"):($(".mobile-nav").toggleClass("d-none"),0==a.matches?$(".main").css("padding-top","2.9375rem"):$(".main").removeAttr("style"))})(window.location.pathname);(()=>{try{if($(".js-zoom-image").each((function(){$(this).wrap('<span style="display:inline-block;cursor: crosshair;"></span>').css("display","block").parent().zoom({url:$(this).data().bigImgSrc})})),$(".js-zoom-image-mobile").each((function(){$(this).wrap('<span style="display:inline-block;cursor: crosshair; height:100%"></span>').css("display","block").parent().zoom({url:$(this).data().bigImgSrc})})),$("#images-modal").length){let e=$(".js-images-modal-loader-wrap");let t=$(".js-zoom-image-receiver-mobile");t.wrap('<span style="display:inline-block;cursor: crosshair; height:100%"></span>').css("display","block"),UIkit.util.on("#images-modal","beforeshow",(function(){let s=$(".js-card-mobile-gallery").find(".uk-slide-active .js-zoom-image-source-mobile");t.data("big-img-src",s.data().bigImgSrc),t.attr("src",s.attr("src")),t.parent().zoom({url:t.data().bigImgSrc,callback:function(){e.fadeOut()}})})),UIkit.util.on("#images-modal","hide",(function(s){t.trigger("zoom.destroy"),e.css("display","block")}))}}catch(e){console.warn("Error initZoomImage()",e)}})()}));