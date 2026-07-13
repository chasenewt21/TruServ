/* TruServ — tiny, dependency-free interactions.
   Sticky-nav state + scroll reveals via IntersectionObserver.
   Everything degrades gracefully if JS is off or motion is reduced. */
(function () {
  "use strict";

  /* 1. Sticky nav background on scroll */
  var nav = document.querySelector(".site-nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* 2. Fixture options pop-up */
  var modal = document.getElementById("fixture-modal");
  if (modal && typeof modal.showModal === "function") {
    document.querySelectorAll("[data-open-fixtures]").forEach(function (btn) {
      btn.addEventListener("click", function () { modal.showModal(); });
    });
    modal.querySelectorAll("[data-close-fixtures]").forEach(function (btn) {
      btn.addEventListener("click", function () { modal.close(); });
    });
    /* Click on the backdrop (outside the panel) closes it. */
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.close();
    });
  }

  /* 3. Scroll reveals */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in-view"); });
    return;
  }

  /* stagger children inside [data-stagger] groups */
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    var step = parseInt(group.getAttribute("data-stagger"), 10) || 90;
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty("--d", (i * step) + "ms");
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

  items.forEach(function (el) { io.observe(el); });
})();
