const entrance = document.getElementById('entrance');
const main = document.getElementById('main');
const validate = document.getElementById('validate-entrance');
const illus = document.getElementById('entrance-illus');

validate.onclick = async e => {
    document.body.style.overflow = 'hidden';
    illus.style.display = 'none';

    await slideUp(entrance, 1200);
    document.body.style.overflow = 'auto';
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
