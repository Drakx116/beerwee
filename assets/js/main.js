const entrance = document.getElementById('entrance');
const main = document.getElementById('main');
const validate = document.getElementById('validate-entrance');
const illus = document.getElementById('entrance-illus');
const presentation = document.getElementById('presentation');
const steps = document.getElementById('steps');
const circles = document.getElementsByClassName('circle');
const rafters = document.getElementById('presentation-rafters');

const anchors = [
    { target: document.getElementById('navbar'), offset: 0 },
    { target: document.getElementById('slogan-text'), offset: 48 },
    { target: document.getElementById('recipe'), offset: 48 },
    { target: document.getElementById('article'), offset: 16  }
];

// ENTRANCE - FIRES ANIMATIONS
validate.onclick = async () => {
    illus.style.display = 'none';

    await slideUp(entrance, 1200);
    await bottomReveal(presentation, 1200);
    await slideLeft(steps, 800);
};


// STEPS MANAGEMENTS
for (let i = 0; i < circles.length; i++) {
    const circle = circles[i];
    circle.onclick = async e => {
        e.preventDefault();

        // Unused anymore - Already triggered by window scroll event
        // updateSelectedCircle(i);
        await slideToAnchor(i);
    }
}

// SCROLL EVENT
window.onscroll = async () => {
    const current = getCurrentVisibleStep();
    updateSelectedCircle(current);
};


// RAFTERS SCROLL
rafters.onclick = async () => {
    await slideToAnchor(1);
};



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


function updateSelectedCircle(selected) {
    for (let j = 0; j < circles.length; j++) {
        circles[j].classList.remove('current');
    }

    circles[selected].classList.add('current');
}

function getCurrentVisibleStep() {
    // Ignores first scroll event on page load (entrance section)
    if (!window.pageYOffset) return 0;

    // Current user position (middle screen)
    const position = window.pageYOffset + window.innerHeight / 2;

    const slogan  = anchors[1]['target'].offsetTop - anchors[1]['offset'];
    const recipe  = anchors[2]['target'].offsetTop - anchors[2]['offset'];
    const article = anchors[3]['target'].offsetTop - anchors[3]['offset'];

    if (position <= slogan)  return 0;
    if (position > slogan && position <= recipe)  return 1;
    if (position > recipe && position <= article) return 2;
    return 3;
}
