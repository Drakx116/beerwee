const entrance = document.getElementById('entrance');
const main = document.getElementById('main');
const validate = document.getElementById('validate-entrance');
const illus = document.getElementById('entrance-illus');
const presentation = document.getElementById('presentation');
const steps = document.getElementById('steps');
const circles = document.getElementsByClassName('circle');
const rafters = document.getElementById('presentation-rafters');
const bottle = document.getElementById('article-bottle');
const blob = document.getElementById('collage-blob');

const inputNumber = document.getElementById('input-number');
const inputNumberPlus = document.getElementById('input-number-plus');
const inputNumberMinus = document.getElementById('input-number-minus');

const anchors = [
    { target: document.getElementById('navbar'), offset: 0 },
    { target: document.getElementById('slogan-text'), offset: 72 },
    { target: document.getElementById('recipe'), offset: 72 },
    { target: document.getElementById('article'), offset: 72  }
];

// ENTRANCE - FIRES ANIMATIONS
validate.onclick = async () => {
    illus.style.display = 'none';

    await slideUp(entrance, 1200);
    await reveal(blob);
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


// QUANTITY SELECTION
[ inputNumberMinus, inputNumberPlus ].forEach((input, index) => {
    input.onclick = () => updateQuantity(index);
});

// SCROLL EVENT
let bottleIsSpilled = false;

window.onscroll = async () => {
    const current = getCurrentVisibleStep();
    updateSelectedCircle(current);

    if (!bottleIsSpilled && current === 3) {
        await spillBottle(1000);
        await bubble(700);
        bottleIsSpilled = true;
    }
};


// RAFTERS SCROLL
rafters.onclick = async () => {
    await slideToAnchor(1);
};



/////////////////
// ANIMATIONS //
///////////////

function delay(duration = 500) {
    return new Promise(resolve => { setTimeout(resolve, duration) });
}

async function slideUp(target, duration = 500) {
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.style.overflow = 'hidden';
    target.style.height = 0 + 'px';

    // Immediately displays the main section
    main.style.display = 'flex';

    window.setTimeout( () => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);

    return delay(duration);
}

async function bottomReveal(target, duration = 500) {
    target.style.opacity = "1";
    target.style.transform = "translateY(0)";
    target.style.transitionDuration = duration + 'ms';

    return delay(duration);
}

async function slideLeft(target, duration = 5000) {
    target.style.transform = "translateX(0)";
    target.style.transitionDuration = duration + 'ms';

    return delay(duration);
}

async function slideToAnchor(id, duration = 500) {
    const anchor = anchors[id]['target'];
    const offset = anchors[id]['offset'];

    window.scrollTo({
        top: anchor.offsetTop - offset,
        left: 0,
        behavior: 'smooth'
    });

    return delay(duration);
}

async function spillBottle(duration = 500) {
    await delay(800);

    bottle.style.transform = "rotateZ(15deg)";
    bottle.style.transitionDuration = duration + 'ms';

    return delay(duration);
}

async function bubble(duration = 500) {
    bottle.classList.add('bottle-bubbles-hidden');

    await delay(1)
    bottle.classList.add('bottle-bubbles-shown');

    return delay(duration - 1);
}

async function reveal(target, duration = 500) {
    target.style.opacity = "1";
    target.style.transitionDuration = duration + 'ms';

    return delay(duration);
}



////////////
// UTILS //
///////////

function updateQuantity(quantity) {
    if (!quantity) {
        quantity = -1;
    }

    const current = parseInt(inputNumber.value);
    const total = current + quantity;

    if (!total || total > 50) {
        return false;
    }

    inputNumber.value = total;
    return true;
}

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
