(function () {
  var navigation = {
    init: function () {
      this.catchDOM();
      if (isElement(this.$el)) {
        this.bindEvents();
        this.resizeEvents();
        this.setMenuPosition();
        this.setCustomScroll();
      }
    },
    catchDOM: function () {
      this.$el = $('.js-navigation');
      this.$button = this.$el.find('.navigation-toggle');
      this.$navigationMenu = this.$el.find('.navigation__menu');
      this.$wrapper = $('.js-wrapper');
      this.$wrapperNavigation = this.$wrapper.find('.wrapper__navigation');
      this.$wrappedMenu = this.$wrapper.find('.wrapper__menu');
      this.$close = this.$wrapper.find('.wrapper__close');

      this.$menu = $('.js-menu');
    },
    bindEvents: function () {
      this.$button.on('click', this.toggleMenu.bind(this));
      this.$close.on('click', this.toggleMenu.bind(this));

      this.$wrapper.hammer({touchAction : 'auto'}).on("swipeleft", this.swipeMenu.bind(this));
    },
    resizeEvents: function () {
      $(window).resize(this.closeMenu.bind(this));
      $(window).resize(this.setMenuPosition.bind(this));
    },
    toggleMenu: function () {
      var _this = this.$button;
      var _wrapper = this.$wrapper;
      if (_this.hasClass('is-active')) {
        _wrapper.find('.wrapper__page').css('transform', '');
        setTimeout(function () {
          _wrapper.find('.wrapper__navigation').css('opacity', '0');
        }, 400);
        _this.removeClass('is-active')
      } else {
        _wrapper.find('.wrapper__navigation').css('opacity', '1');
        _wrapper.find('.wrapper__page').css('transform', 'translate(250px,0)');
        _this.addClass('is-active')
      }
    },
    swipeMenu: function () {
      var _this = this.$button;
      var _wrapper = this.$wrapper;
      if (isMobile() && _this.hasClass('is-active')) {
        _wrapper.find('.wrapper__page').css('transform', '');
        setTimeout(function () {
          _wrapper.find('.wrapper__navigation').css('opacity', '0');
        }, 400);
        _this.removeClass('is-active')
      }
    },
    closeMenu: function () {
      var _this = this.$button;
      var _wrapper = this.$wrapper;
      if (!isMobile() && _this.hasClass('is-active')) {
        _wrapper.find('.wrapper__navigation').css('opacity', '0');
        _wrapper.find('.wrapper__page').css('transform', '');
        _this.removeClass('is-active')
      }
    },
    setMenuPosition: function () {
      if (isMobile()) {
        if (this.$navigationMenu.children().length > 0) {
          var _menu = this.$menu.detach();
          this.$wrappedMenu.append(_menu)
        }
      } else {
        if (this.$wrappedMenu.children().length > 0) {
          var _menu = this.$menu.detach();
          this.$navigationMenu.append(_menu)
        }
      }
    },
    setCustomScroll: function () {
      this.$wrapperNavigation.mCustomScrollbar({scrollbarPosition: "outside"});
    }
  };

  function isElement(item) {
    return item.length > 0
  }

  function isMobile() {
    return $(window).width() <= 1024
  }

  navigation.init();
})();