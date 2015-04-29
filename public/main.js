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
      if (analytics) {
        analytics.event("question chosen", {
          label: "question " + index + " chosen",
          value: type
        });
      }

      var yesFound = 0;
      answers[index-1] = type;
      for (var i = 0; i < answers.length; i++) {
        if (answers[i] === "yes") {
          yesFound++;
        }
      }
      if (yesFound >= 2) {
        cta1.classList.add("hidden");
        cta2.classList.remove("hidden");
      } else {
        cta1.classList.remove("hidden");
        cta2.classList.add("hidden");
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

  var
  rectangle,
    radius = 7.5,
    iris = document.querySelector('.iris'),
    center;

  function measureThings() {
    rectangle = iris.getBoundingClientRect();
    center = {
      x: (rectangle.width / 2) + (rectangle.left),
      y: (rectangle.height / 2) + (rectangle.top)
    };
  }

  function doMaths(x, y, radius) {
    var
    pythagoras = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
      coordinates = {
        x: x,
        y: y
      };
    if (pythagoras !== 0) {
      coordinates.x = x * radius / pythagoras;
      coordinates.y = y * radius / pythagoras;
    }
    return coordinates;
  }

  function translatePupil(coords) {
    var transform = 'translate(' + Math.round(coords.x) + 'px, ' + Math.round(coords.y) + 'px)';
    iris.style.transform = transform;
  }

  var mousemoveTime = Date.now();
  var eye = document.querySelector('.privacy-eye');

  function checkMovement() {
    var nowTime = Date.now();
    var diffTime = (nowTime - mousemoveTime) / 1000;
    if (diffTime > 3 && !eye.classList.contains('focus')) {
      iris.style.transform = 'translate(0, 0)';
      eye.classList.add('smooth');
      eye.classList.add('wander');
    }

    setTimeout(checkMovement, 1000);
  }

  checkMovement();

  function onMouseMove(e) {
    var pageY = e.pageY - window.pageYOffset;
    mousemoveTime = Date.now();
    eye.classList.remove('wander');
    eye.classList.remove('smooth');
    measureThings();
    translatePupil(doMaths(e.pageX - center.x, pageY - center.y, radius));
  }

  function onMouseEnter() {
    eye.classList.add('smooth');
    eye.classList.add('focus');
    iris.style.transform = 'translate(0, 0)';
    window.removeEventListener("mousemove", onMouseMove);
  }

  function onMouseLeave() {
    eye.classList.remove('focus');
    eye.classList.remove('smooth');
    window.addEventListener("mousemove", onMouseMove);
  }

  if (iris) {
    eye.addEventListener("mouseenter", onMouseEnter);
    eye.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousemove", onMouseMove);
  }
});
