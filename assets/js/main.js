const entrance = document.getElementById('entrance');
const main = document.getElementById('main');
const validate = document.getElementById('validate-entrance');
const illus = document.getElementById('entrance-illus');

validate.onclick = e => {
    document.body.style.overflow = 'hidden';
    illus.style.display = 'none';

    slideUp(entrance, 750).then(() => {
        slideDown(main, 500).then(() => {
            document.body.style.overflow = 'auto';
        });
    });
}

/////////////////
// ANIMATIONS //
///////////////


// HIDE
let slideUp = async (target, duration = 500) => {
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

    return true;
}

// SHOW
const slideDown = async (target, duration = 500) => {
    target.style.display = 'flex';
    target.style.overflow = 'hidden';
    target.style.height = '0px';
    target.style.paddingTop = '0px';
    target.style.paddingBottom = '0px';
    target.style.marginTop = '0px';
    target.style.marginBottom = '0px';
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');

    window.setTimeout( () => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, 250);

    return true;
}
