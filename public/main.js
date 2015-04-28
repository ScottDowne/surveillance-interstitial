document.addEventListener( "DOMContentLoaded", function() {
  var questionYesButtons = document.querySelectorAll(".yes-option");
  var questionNoButtons = document.querySelectorAll(".no-option");

  function createClickEvent(element, type, index) {
    element.addEventListener("click", function(e) {
      var itemContainer = document.querySelector(".step-" + index);
      var unanswered = itemContainer.querySelector(".unanswered");
      var answerContainer = itemContainer.querySelector(".answer-container");
      var answered = answerContainer.querySelector(".answered");
      answered.classList.add("fadein");
      answerContainer.classList.add("status-" + type);
      var infoContainer = itemContainer.querySelector(".info-container");
      infoContainer.classList.remove("hidden");
      var finalStep = document.querySelector(".final-step");
      if (index === 3) {
        finalStep.classList.remove("hidden");
      }
      window.scroll(0, itemContainer.offsetTop);
    });
  }

  for (var i = 0; i < questionYesButtons.length; i++) {
    createClickEvent(questionYesButtons[i], "yes", i+1);
  }

  for (var i = 0; i < questionNoButtons.length; i++) {
    createClickEvent(questionNoButtons[i], "no", i+1);
  }
});
