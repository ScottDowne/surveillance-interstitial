document.addEventListener( "DOMContentLoaded", function() {
  var questionYesButtons = document.querySelectorAll(".yes-option");
  var questionNoButtons = document.querySelectorAll(".no-option");
  var answers = ["yes", "yes", "yes"];

  function createClickEvent(element, type, index) {
    var itemContainer = document.querySelector(".step-" + index);
    var cancelButton = itemContainer.querySelector(".cancel-button");
    var unanswered = itemContainer.querySelector(".unanswered");
    var answerContainer = itemContainer.querySelector(".answer-container");
    var answered = answerContainer.querySelector(".answered");
    var infoContainer = itemContainer.querySelector(".info-container");
    var finalStep = document.querySelector(".final-step");
    var cta1 = finalStep.querySelector(".cta-1");
    var cta2 = finalStep.querySelector(".cta-2");
    cancelButton.addEventListener("click", function() {
      answered.classList.remove("fadein");
      itemContainer.classList.remove("expand");
      answerContainer.classList.remove("status-" + type);
    });
    element.addEventListener("click", function(e) {
      var yesFound = 0;
      answers[index-1] = type;
      for (var i = 0; i < answers.length; i++) {
        if (answers[i] === "yes") {
          yesFound++;
        }
      }
      if (yesFound >= 2) {
        cta1.classList.remove("hidden");
        cta2.classList.add("hidden");
      } else {
        cta1.classList.add("hidden");
        cta2.classList.remove("hidden");
      }
      itemContainer.classList.add("expand");
      answered.classList.add("fadein");
      answerContainer.classList.add("status-" + type);
      setTimeout(function() {
        infoContainer.classList.add("expand");
        if (index === 3) {
          finalStep.classList.remove("hidden");
        }
        setTimeout(function() {
          $('html, body').animate({
            scrollTop: itemContainer.offsetTop
          });
        }, 300);
      }, 300);
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
