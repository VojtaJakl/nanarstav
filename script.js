(() => {

    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('#main-nav');


    if (menuButton && navigation) {

        const closeMenu = () => {

            header?.classList.remove('menu-open');

            menuButton.setAttribute(
                'aria-expanded',
                'false'
            );

            menuButton.setAttribute(
                'aria-label',
                'OtevĹ™Ă­t navigaci'
            );

        };


        menuButton.addEventListener('click', () => {

            const isOpen =
                menuButton.getAttribute('aria-expanded') !== 'true';


            menuButton.setAttribute(
                'aria-expanded',
                String(isOpen)
            );


            menuButton.setAttribute(
                'aria-label',
                isOpen
                    ? 'ZavĹ™Ă­t navigaci'
                    : 'OtevĹ™Ă­t navigaci'
            );


            header?.classList.toggle(
                'menu-open',
                isOpen
            );

        });


        navigation
            .querySelectorAll('a')
            .forEach(link => {

                link.addEventListener(
                    'click',
                    closeMenu
                );

            });


        document.addEventListener(
            'keydown',
            event => {

                if (event.key === 'Escape') {
                    closeMenu();
                }

            }
        );


        window.addEventListener(
            'resize',
            () => {

                if (window.innerWidth > 760) {
                    closeMenu();
                }

            },
            { passive: true }
        );

    }


    if (header) {

        const updateHeader = () => {

            header.classList.toggle(
                'scrolled',
                window.scrollY > 30
            );

        };


        updateHeader();


        window.addEventListener(
            'scroll',
            updateHeader,
            { passive: true }
        );

    }


    if (typeof lucide !== 'undefined') {

        lucide.createIcons();

    }


    const year = document.querySelector('#year');

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


})();


const projectCounter =
    document.querySelector(".projects-heading-number");


if (projectCounter) {

    const target =
        Number(projectCounter.dataset.count) || 0;

    let started = false;


    const animateCounter = () => {

        if (started) return;

        started = true;

        const duration = 1600;
        const startTime = performance.now();


        const update = (currentTime) => {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );


            const eased =
                1 - Math.pow(1 - progress, 3);


            const current =
                Math.floor(target * eased);


            projectCounter.textContent =
                current;


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                projectCounter.textContent =
                    target;

            }

        };


        requestAnimationFrame(update);

    };


    const observer =
        new IntersectionObserver(
            (entries) => {

                if (entries[0].isIntersecting) {

                    animateCounter();

                    observer.disconnect();

                }

            },
            {
                threshold: 0.4
            }
        );


    observer.observe(projectCounter);

}


const projectGallery =
    document.querySelector('.projects-gallery');

const projectItems =
    document.querySelectorAll('.project-item');

const projectPreview =
    document.querySelector('.project-preview');

const projectPreviewImage =
    projectPreview?.querySelector('img');


if (
    projectGallery &&
    projectItems.length &&
    projectPreview &&
    projectPreviewImage
) {

    projectItems.forEach(item => {

        const image =
            item.dataset.image;


        item.addEventListener(
            'mouseenter',
            () => {

                projectPreviewImage.src =
                    image;

                projectGallery.classList.add(
                    'has-preview'
                );

            }
        );


        item.addEventListener(
            'mouseleave',
            () => {

                projectGallery.classList.remove(
                    'has-preview'
                );

            }
        );


        item.addEventListener(
            'click',
            () => {

                if (window.innerWidth <= 760) {

                    const isActive =
                        projectGallery.classList.contains(
                            'has-preview'
                        );


                    projectPreviewImage.src =
                        image;


                    projectGallery.classList.toggle(
                        'has-preview',
                        !isActive
                    );

                }

            }
        );

    });

}
