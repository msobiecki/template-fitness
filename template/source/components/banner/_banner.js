/*
 * Banner version v.1.0 (Fullsceen)
 *
 * Components
 * html: _banner.pug
 * css: _banner.sass
 *
 * Init a fullscreen banner
 * @class .js-banner
 *
 * Possible modification
 * # Create a slick-carousel
 * @class .js-banner.js-banner-slick
 * # If Fixed header (modification into .header e.g. [.header.-header-fixed] also [.header.-header-landingPage])
 * @class
 *
 * @author: https://github.com/SaliMike
 */

(function () {
  var banner = {
    init: function () {
      this.catchDOM();
      if (isElement(this.$el)) {
        if (isSlickInited(this.$el)) {
          this.generateSlick();
        }
        this.setHeight();
        this.onResize();
        this.toggleHide();
        this.toggleEvent();
      }
    },
    catchDOM: function () {
      this.$el = $('.js-banner');
      this.$slider = this.$el.find('.banner__slider');
      this.$item = this.$el.find('.banner__item');
      this.$image = this.$el.find('.banner__image');
      this.$toggler = this.$el.find('.banner__toggler');
      this._windowHeight = $(window).height();

      this.$header = $('.js-header');
      this.$headerBox = this.$header.find('.header__box');
      this._headerHeight = this.$header.height();
    },

    //SLICK
    generateSlick: function () {
      this.$slider.slick({
        slide: '.banner__item',
        infinite: true,
        dots: true,
        appendDots: '.banner__dots',
        customPaging: function (slider, i) {
          return '<div class="banner__dot"></div>';
        },
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        //TODO Switch Autoplay on production
        autoplay: false,
        speed: 3000
      });
      this.$item = this.$el.find('.banner__item');
      this.$image = this.$el.find('.banner__image');
      this.onInit();
      this.onChangeSlide();
    },
    onInit: function () {
      this.$slider.find('.slick-current .banner__content').addClass('-banner-content-show animated fadeIn');
    },
    onChangeSlide: function () {
      this.$slider.on('afterChange', function (event) {
        var _this = $(event.target).find('.slick-current .banner__content');
        $(event.target).find('.banner__content').not(_this).removeClass('-banner-content-show animated fadeIn');
        _this.addClass('-banner-content-show animated fadeIn');
      });
    },

    //OnResize
    onResize: function () {
      $(window).resize(this.setNewVariables.bind(this))
    },
    setNewVariables: function () {
      this._windowHeight = $(window).height();
      this._headerHeight = $('header').height();
      this.setHeight();
    },
    setHeight: function () {
      if ($('.header.-header-landingPage.-header-fixed').length > 0) {
        this.$el.css('height', this._windowHeight);
        this.$slider.css('height', this._windowHeight);
        this.$item.css('height', this._windowHeight);
        this.$image.css('height', this._windowHeight);
      } else {
        this.$el.css('height', this._windowHeight - this._headerHeight);
        this.$slider.css('height', this._windowHeight - this._headerHeight);
        this.$item.css('height', this._windowHeight - this._headerHeight);
        this.$image.css('height', this._windowHeight - this._headerHeight);
      }
    },
    toggleHide: function () {
      this.$item.each(function () {
        if ($(this).attr('href')) {
          $(this).find('.banner__toggler').css('display', 'none')
        } else {
          $(this).find('.banner__toggler i').addClass('animated infinite pulse');
        }
      })
    },
    toggleEvent: function () {
      this.$toggler.on('click', this.toggleScroll.bind(this))
    },
    toggleScroll: function (event) {
      event.preventDefault();
      var target = $(event.currentTarget).data('href');
      var height = this.checkHeader();
      $('html, body').animate({
        scrollTop: ($(target).offset().top - height)
      }, 1500);
    },
    checkHeader: function () {
      if (this.$header.length > 0) {
        if (this.$header.hasClass('-header-fixed')) {
          return this.$headerBox.height();
        } else {
          return 0
        }
      }
      else {
        return 0
      }
    }
  };

  function isElement(item) {
    return item.length > 0
  }

  function isSlickInited(item) {
    return item.hasClass('js-banner-slick')
  }

  banner.init();
})();