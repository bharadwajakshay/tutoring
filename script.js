// Booking requests are sent to this address via the visitor's email app.
// Replace it with the inbox you want trial requests to land in.
const CONTACT_EMAIL = "you@example.com";

document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  }
});

// Subject level tabs
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll("[data-panel]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", t === tab);
    });
    panels.forEach((p) => (p.hidden = p.dataset.panel !== tab.dataset.level));
  });
});

// Booking form -> prefilled email
const form = document.getElementById("book-form");
const status = form.querySelector(".form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstInvalid = null;
  form.querySelectorAll("[required]").forEach((el) => {
    const bad = !el.checkValidity();
    el.classList.toggle("invalid", bad);
    if (bad && !firstInvalid) firstInvalid = el;
  });

  if (firstInvalid) {
    status.className = "form-status error";
    status.textContent = "Please fill in your name, a valid email, level and subject.";
    firstInvalid.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  const subject = `Free trial class request: ${data.subject}, ${data.level}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Level: ${data.level}`,
    `Subject: ${data.subject}`,
    "",
    "What I need help with:",
    data.message || "(not specified)",
  ].join("\n");

  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  status.className = "form-status ok";
  status.textContent = "Your email app should open with your request ready to send. Thanks!";
});
