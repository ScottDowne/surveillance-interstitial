document.addEventListener( "DOMContentLoaded", function() {
  var questionYesButtons = document.querySelectorAll(".yes-option");
  var questionNoButtons = document.querySelectorAll(".no-option");

  function createClickEvent(element, type, index) {
    var itemContainer = document.querySelector(".step-" + index);
    var cancelButton = itemContainer.querySelector(".cancel-button");
    var unanswered = itemContainer.querySelector(".unanswered");
    var answerContainer = itemContainer.querySelector(".answer-container");
    var answered = answerContainer.querySelector(".answered");
    var infoContainer = itemContainer.querySelector(".info-container");
    var finalStep = document.querySelector(".final-step");
    cancelButton.addEventListener("click", function() {
      answered.classList.remove("fadein");
      answerContainer.classList.remove("status-" + type);
    });
    element.addEventListener("click", function(e) {
      answered.classList.add("fadein");
      answerContainer.classList.add("status-" + type);
      infoContainer.classList.remove("hidden");
      if (index === 3) {
        finalStep.classList.remove("hidden");
      }
      $('html, body').animate({
        scrollTop: itemContainer.offsetTop
      });
    });
  }

  for (var i = 0; i < questionYesButtons.length; i++) {
    createClickEvent(questionYesButtons[i], "yes", i+1);
  }

  for (var i = 0; i < questionNoButtons.length; i++) {
    createClickEvent(questionNoButtons[i], "no", i+1);
  }
  $(window).on('beforeunload', function() {
    $('html, body').scrollTop(0);
  });
});
