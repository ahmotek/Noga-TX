// Select specific element to assign custom property new value (can be assigned to document.documentElement)
const header = document.getElementById('header');

// get and storage --start-position initial value (-16.66vw)
const startPositionProperty = parseFloat(getComputedStyle(header).getPropertyValue('--start-position'));
const startPosition = parseFloat(startPositionProperty);

// console.log(window.innerHeight); // window available height
// console.log(document.documentElement.scrollHeight); // document height
// console.log(startPosition);

window.addEventListener('scroll', () => {
  // scrollable area || amount of scrollable pxs' = document height - window height
  requestAnimationFrame(headerAnimation);
})

function headerAnimation() {
  const scrolled = window.scrollY;

  let animPosition = startPosition + scrolled/44;

  if(animPosition <= 0) {
    // console.log('animPosition if = ' + animPosition);

    header.style.setProperty('--start-position', animPosition + 'vw');
    header.classList.remove('header--show');

  } else { // if animPosition > 0 => --start-position = 0;
    // console.log('animPosition else = ' + animPosition);

    header.style.setProperty('--start-position', 0 + 'vw');
    header.classList.add('header--show');
  }

  requestAnimationFrame(headerAnimation);
}