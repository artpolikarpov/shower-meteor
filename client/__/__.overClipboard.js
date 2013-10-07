__.$document
    .on('mouseover mouseout', '.js-over-clipboard', function (e) {
      // При наведении на ссылку, копируем её хреф для копирования
      document.clipboard = e.type === 'mouseover' ? this.href || this.value : '';
    })
    .on('keydown', function (e) {
      // Подставляем document.clipboard в невидимую текстарею,
      // чтобы пользователь мог скопировать значение без выделения текста
      var value = document.clipboard,
          _ref, _ref1;
      if (!value || !(e.ctrlKey || e.metaKey)) {
        return;
      }
      //if ($(e.target).is("input:visible, textarea:visible")) return;
      if (typeof window.getSelection === "function" ? (_ref = window.getSelection()) != null ? _ref.toString() : void 0 : void 0) return;
      if ((_ref1 = document.selection) != null ? _ref1.createRange().text : void 0) return;
      _.defer(function() {
        var $container = $('#clipboard-container');
        $container
            .empty()
            .show();
        $('<textarea id="clipboard"></textarea>')
            .val(value)
            .appendTo($container)
            //.focus()
            .select();
      });
    })
    .on('keyup', function (e) {
      if ($(e.target).is('#clipboard')) {
        $('#clipboard-container')
            .empty()
            .hide();
      }
    });