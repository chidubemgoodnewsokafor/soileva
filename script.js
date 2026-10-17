(() => {

  // HERO CAROUSEL

  const slides = [...document.querySelectorAll(".slide")];
  const dots = [...document.querySelectorAll(".dot")];

  const previousButton = document.querySelector(".arrow.prev");
  const nextButton = document.querySelector(".arrow.next");

  let activeSlide = 0;
  let carouselTimer;


  function showSlide(index) {

    if (!slides.length) return;

    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === activeSlide);
    });

    dots.forEach((dot, i) => {

      dot.classList.toggle("active", i === activeSlide);

      dot.setAttribute(
        "aria-pressed",
        String(i === activeSlide)
      );

    });

  }


  function resetCarouselTimer() {

    clearInterval(carouselTimer);

    if (slides.length > 1) {

      carouselTimer = setInterval(() => {
        showSlide(activeSlide + 1);
      }, 6000);

    }

  }


  previousButton?.addEventListener("click", () => {

    showSlide(activeSlide - 1);
    resetCarouselTimer();

  });


  nextButton?.addEventListener("click", () => {

    showSlide(activeSlide + 1);
    resetCarouselTimer();

  });


  dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

      showSlide(index);
      resetCarouselTimer();

    });

  });


  showSlide(0);
  resetCarouselTimer();


  // MOBILE NAVIGATION

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");


  menuButton?.addEventListener("click", () => {

    const isOpening =
      menuButton.getAttribute("aria-expanded") !== "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpening)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpening ? "Close menu" : "Open menu"
    );

    navigation?.classList.toggle("open", isOpening);

  });


  // Close the mobile menu after selecting a link.

  navigation?.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      menuButton?.setAttribute("aria-expanded", "false");

      menuButton?.setAttribute("aria-label", "Open menu");

      navigation?.classList.remove("open");

    });

  });


  // AUTOMATIC COPYRIGHT YEAR

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

})();
