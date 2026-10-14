document.addEventListener('DOMContentLoaded', function () {

    // 1. Initialize Splide Carousels FIRST
    const academicSlider = new Splide('#academic-slider', {
        type: 'loop', perPage: 3, gap: '2rem', padding: '1rem', pagination: false, arrows: true,
        breakpoints: { 1024: { perPage: 3 }, 768: { perPage: 2 }, 640: { perPage: 1, padding: '2rem' } }
    }).mount();

    const testimonialSlider = new Splide('#testimonial-slider', {
        type: 'loop', perPage: 3, gap: '1.5rem', padding: '0.5rem', pagination: true, arrows: false,
        breakpoints: { 1024: { perPage: 2 }, 640: { perPage: 1, padding: '0rem' } }
    }).mount();

    const programsSlider = new Splide('#programs-slider', {
        type: 'loop', perPage: 3, gap: '1.5rem', padding: '2.5rem', pagination: false, arrows: false,
        breakpoints: { 1024: { perPage: 3, padding: '2rem' }, 768: { perPage: 2, padding: '1.5rem' }, 640: { perPage: 1, padding: '1rem', arrows: true, pagination: true } }
    }).mount();

    // 2. Initialize AOS Animations SECOND
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // 3. Counter Animation Logic
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const animationDuration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(animationDuration / frameDuration);

        counters.forEach(counter => {
            let frame = 0;
            const target = parseInt(counter.getAttribute('data-target'), 10);

            const counterInterval = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                const currentCount = Math.round(target * easeOutProgress);

                counter.innerText = currentCount;

                if (frame === totalFrames) {
                    clearInterval(counterInterval);
                    counter.innerText = target;
                }
            }, frameDuration);
        });
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.getElementById('hero-stats');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    // 4. Force Splide to Refresh on window load just in case AOS messed with widths
    window.addEventListener('load', function () {
        academicSlider.refresh();
        testimonialSlider.refresh();
        programsSlider.refresh();
    });

    // 6. FAQ Accordion Logic (Single Open)
    const faqItems = document.querySelectorAll('.faq-item');
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const faqItem = toggle.closest('.faq-item');
            const content = toggle.nextElementSibling;
            const inner = content.querySelector('.inner');
            const isOpen = faqItem.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const otherContent = item.querySelector('.faq-content');
                    otherContent.style.maxHeight = '0';
                    otherContent.style.paddingBottom = '0';
                }
            });

            // Toggle current FAQ item
            if (isOpen) {
                faqItem.classList.remove('active');
                content.style.maxHeight = '0';
                content.style.paddingBottom = '0';
            } else {
                faqItem.classList.add('active');
                const innerHeight = inner ? inner.scrollHeight : content.scrollHeight;
                content.style.maxHeight = innerHeight + 'px';
                content.style.paddingBottom = '1.25rem';
            }
        });
    });

    // Initialize: ensure all content is hidden
    faqItems.forEach(item => {
        const content = item.querySelector('.faq-content');
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
    });

    // 7. Modal Logic
    const modal = document.getElementById('admission-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementById('close-modal-btn');
    const openBtns = document.querySelectorAll('.open-modal-btn');

    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden', 'modal-open');
        document.body.style.overscrollBehavior = 'none';
        document.body.style.touchAction = 'none';

        setTimeout(() => {
            modalBackdrop.classList.remove('opacity-0');
            modalBackdrop.classList.add('opacity-100');
            modalContent.classList.remove('opacity-0', 'scale-95');
            modalContent.classList.add('opacity-100', 'scale-100');
        }, 10);
    }

    function closeModal() {
        modalBackdrop.classList.remove('opacity-100');
        modalBackdrop.classList.add('opacity-0');
        modalContent.classList.remove('opacity-100', 'scale-100');
        modalContent.classList.add('opacity-0', 'scale-95');
        document.body.classList.remove('overflow-hidden', 'modal-open');
        document.body.style.overscrollBehavior = '';
        document.body.style.touchAction = '';

        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
    
      // Auto-open admission modal after 4 seconds
    if (modal) {
        setTimeout(openModal, 10000);
    }

});
