function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // slider

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;
    
    if(slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol'),
          arrDots = [];
    dots.classList.add('carousel-dot');
    slider.append(dots);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if(i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        arrDots.push(dot);
    }

    slidesWrapper.style.overflow = 'hidden';

    function arrDotsOpacity() {
        arrDots.forEach(dot => dot.style.opacity = '.5');
        arrDots[slideIndex - 1].style.opacity = 1;
    }
    function currentTextContent() {
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }
    function slidesFieldTransform() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if(offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesFieldTransform();

        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentTextContent();
        arrDotsOpacity();
    });

    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesFieldTransform();

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        currentTextContent();
        arrDotsOpacity();
    });

    arrDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesFieldTransform();

            currentTextContent();
            arrDotsOpacity();
        });
    });
}
export default slider;