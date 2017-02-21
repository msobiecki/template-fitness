(function () {
  var navigation = {
    init: function () {
      this.catchDOM();
      if (isElement(this.$el)) {
        this.bindEvents();
        //this.setHeader();
      }
    },
    catchDOM: function () {
      this.$el = $('.js-navigation');
      this.$button = this.$el.find('.navigation-toggle');
      this.$wrapper = $('.js-wrapper')
    },
    bindEvents: function () {
      this.$button.on('click', this.toggleMenu.bind(this))
    },
    toggleMenu: function (e) {
      var _this = $(e.currentTarget)

      if (_this.hasClass('is-active')) {
        this.$wrapper.css('transform', 'translate(0,0)');
        _this.removeClass('is-active')
      } else {
        this.$wrapper.css('transform', 'translate(250px,0)');
        _this.addClass('is-active')
      }
    },
    setHeader: function () {
      console.log('test')
      console.log(elementWidth(this.$el));
      if (elementWidth(this.$el) > (elementWidth($(window)) / 2)) {
        this.$el.addClass('-navigation-mobile')
      }
    }
  };


  function elementWidth(item) {
    return item.width();
  }

  function isElement(item) {
    return item.length > 0
  }

  navigation.init();
})();