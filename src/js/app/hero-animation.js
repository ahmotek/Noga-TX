// --start-rotation


// Select specific element to assign custom property new value (can be assigned to document.documentElement)
const hero = document.getElementById('hero');

// get and storage --start-rotation initial value (0deg)
const startAngleProperty = parseFloat(getComputedStyle(hero).getPropertyValue('--start-rotation'));
const startAngle = parseFloat(startAngleProperty);

// console.log(window.innerHeight); // window available height
// console.log(document.documentElement.scrollHeight); // document height
console.log(startAngleProperty);

window.addEventListener('scroll', () => {
  // scrollable area || amount of scrollable pxs' = document height - window height
  requestAnimationFrame(heroAnimation);
})

function heroAnimation() {
  const scrolled = window.scrollY;

  let animAngle = startAngle + scrolled/44;

  if(animAngle >= 0) {
    console.log('animAngle if = ' + animAngle);

    hero.style.setProperty('--start-rotation', - animAngle + 'deg');
    // hero.classList.remove('hero--show');

  } else { // if animAngle < 0 => --start-rotation = 0;
    console.log('animAngle else = ' + animAngle);

    hero.style.setProperty('--start-rotation', 0 + 'deg');
    // hero.classList.add('hero--show');
  }

  requestAnimationFrame(heroAnimation);
}