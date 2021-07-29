const values = document.querySelectorAll('[data-toggle]');

let modal = document.querySelector('#values-modal')
let modalWrapper = document.querySelector('.modal__wrapper');


values.forEach(value => {
  value.addEventListener('mouseover', event => {
    // Find x to position the popup horizontally
    let x;
    if(document.body.clientWidth < 600) {
      x = 20;
    } else {
      x = value.offsetLeft / (document.body.clientWidth / value.offsetLeft);
    }

    // Find where the element is in relation the the screen
    let height = value.getBoundingClientRect().top / window.screen.height * 100;

    // Add the content to the modal
    modalWrapper.firstElementChild.innerHTML = value.dataset.title;
    modalWrapper.lastElementChild.innerHTML = value.dataset.content;
    modal.style.display = "block";

    // Find Y to position the popup vertically, based on where in the screen the element is
    let y;
    if (height > 40) {
      y = value.offsetTop - modal.offsetHeight - 35;
    } else {
      y = value.offsetTop + value.clientHeight + 25;
    }

    // Position the modal in the page
    modal.style.left = x + 'px';
    modal.style.top = y + 'px';
  });
  value.addEventListener('mouseout', event => {
    modal.style.display = "none";
  })
});