(function (window) {
  // Define a local copy of $
  var $ = function (callback) {
      readyBound = false;
      $.isReady = false;
      if (typeof callback == 'function') {
        DOMReadyCallback = callback;
      }
      bindReady();
    },
    // Use the correct document accordingly with window argument (sandbox)
    document = window.document,
    readyBound = false,
    DOMReadyCallback = function () {},
    // The ready event handler
    DOMContentLoaded;
  // Is the DOM ready to be used? Set to true once it occurs.
  $.isReady = false;
  // Handle when the DOM is ready
  var DOMReady = function () {
    // Make sure that the DOM is not already loaded
    if (!$.isReady) {
      // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
      if (!document.body) {
        setTimeout(DOMReady, 13);
        return;
      }
      // Remember that the DOM is ready
      $.isReady = true;
      // If there are functions bound, to execute
      DOMReadyCallback();
      // Execute all of them
    }
  } // /ready()
  var bindReady = function () {
    if (readyBound) {
      return;
    }
    readyBound = true;
    // Catch cases where $ is called after the
    // browser event has already occurred.
    if (document.readyState === "complete") {
      DOMReady();
    }
    // Mozilla, Opera and webkit nightlies currently support this event
    if (document.addEventListener) {
      // Use the handy event callback
      document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
      // A fallback to window.onload, that will always work
      window.addEventListener("load", DOMContentLoaded, false);
      // If IE event model is used
    } else if (document.attachEvent) {
      // ensure firing before onload,
      // maybe late but safe also for iframes
      document.attachEvent("onreadystatechange", DOMContentLoaded);
      // A fallback to window.onload, that will always work
      window.attachEvent("onload", DOMContentLoaded);
      // If IE and not a frame
      // continually check to see if the document is ready
      var toplevel = false;
      try {
        toplevel = window.frameElement == null;
      } catch (e) {}
      if (document.documentElement.doScroll && toplevel) {
        doScrollCheck();
      }
    }
  }; // /bindReady()
  // The DOM ready check for Internet Explorer
  var doScrollCheck = function () {
    if ($.isReady) {
      return;
    }
    try {
      // If IE is used, use the trick by Diego Perini
      // http://javascript.nwbox.com/IEContentLoaded/
      document.documentElement.doScroll("left");
    } catch (error) {
      setTimeout(doScrollCheck, 1);
      return;
    }
    // and execute any waiting functions
    DOMReady();
  } // /doScrollCheck()
  // Cleanup functions for the document ready method
  if (document.addEventListener) {
    DOMContentLoaded = function () {
      document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
      DOMReady();
    };
  } else if (document.attachEvent) {
    DOMContentLoaded = function () {
      // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
      if (document.readyState === "complete") {
        document.detachEvent("onreadystatechange", DOMContentLoaded);
        DOMReady();
      }
    };
  } // /if()
  // Expose $ to the global object
  window.$ = $;
})(window);

$(function () {
  var btnsModal = document.querySelectorAll('.button--modal');
  var btnsModalClose = document.querySelectorAll('.modal-close');

  btnsModal.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var kindModal = e.target.dataset.modal;
      var modal = document.querySelector(`.modal[data-modal=${kindModal}]`);
      modal.classList.add('is-active')
    });
  });

  btnsModalClose.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var modal = e.target.closest('.modal');
      modal.classList.remove('is-active');
    });
  });

  $(".form-order").on('submit', function () {
    var formID = $(this).attr('id');
    var formNm = $('#' + formID);
    var message = $(formNm).find(".form-order__msgs");
    $.ajax({
      type: "POST",
      url: 'action.php',
      data: formNm.serialize(),

      success: function (data) {
        let messageData = 'Благодарим за заказ! В скором времени с Вами свяжется наш менеджер. Пожалуйста, ожидайте!';

        message.text(messageData);
        message.addClass('active');
        setTimeout(function () {
          message.removeClass('active');
          $('input').not(':input[type=submit], :input[type=hidden]').val('');
        }, 3000);
      },

      error: function (jqXHR, text, error) {
        message.html('Упс...Письмо не отправилось');
        message.addClass('error');
        setTimeout(function () {
          message.removeClass('error');
          $('input').not(':input[type=submit], :input[type=hidden]').val('');
        }, 3000);
      }

    });
    return false;
  })

});


