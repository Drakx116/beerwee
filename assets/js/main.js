const entrance = document.getElementById('entrance');
const main = document.getElementById('main');
const validate = document.getElementById('validate-entrance');
const illus = document.getElementById('entrance-illus');
const presentation = document.getElementById('presentation');
const steps = document.getElementById('steps');
const circles = document.getElementsByClassName('circle');

const anchors = [
    { target: document.getElementById('navbar'), offset: 0 },
    { target: document.getElementById('slogan-text'), offset: 48 },
    { target: document.getElementById('recipe'), offset: 48 },
    { target: document.getElementById('article'), offset: 16  }
];

validate.onclick = async e => {
    illus.style.display = 'none';

    await slideUp(entrance, 1200);
    await bottomReveal(presentation, 1200);
    await slideLeft(steps, 800);
}

for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    circle.onclick = async e => {
        e.preventDefault();

        updateSelectedCircle(i);
        await slideToAnchor(i);
    }
}



/////////////////
// ANIMATIONS //
///////////////

async function slideUp(target, duration = 500) {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.style.overflow = 'hidden';
    target.style.height = 0 + 'px';
    target.style.paddingTop = 0 + 'px';
    target.style.paddingBottom = 0 + 'px';
    target.style.marginTop = 0 + 'px';
    target.style.marginBottom = 0 + 'px';

    // Immediately displays the main section
    main.style.display = 'flex';

    window.setTimeout( () => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);

    return new Promise(resolve => { setTimeout(resolve, duration) });
}

async function bottomReveal(target, duration = 500) {
    target.style.opacity = "1";
    target.style.transform = "translateY(0)";
    target.style.transitionDuration = duration + 'ms';

    return new Promise(resolve => { setTimeout(resolve, duration) });
}

async function slideLeft(target, duration = 5000) {
    target.style.transform = "translateX(0)";
    target.style.transitionDuration = duration + 'ms';

    return new Promise(resolve => { setTimeout(resolve, duration) });
}

async function slideToAnchor(id, duration = 500) {
    const anchor = anchors[id]['target'];
    const offset = anchors[id]['offset'];

    window.scrollTo({
        top: anchor.offsetTop - offset,
        left: 0,
        behavior: 'smooth'
    });

    return new Promise(resolve => { setTimeout(resolve, duration) });
}




////////////
// UTILS //
///////////


function updateSelectedCircle(i) {
    for (let j = 0; j < circles.length; j++) {
        circles[j].classList.remove('current');
    }

    circles[i].classList.add('current');
}
