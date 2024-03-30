window.onload = function () {
    let rating_card_view;
    let rating_cards_container = document.querySelector('.rating_cards')
    let rating_cards_qty = rating_cards_container.getAttribute('totalCards')
    function cards_slides_setup(cards_container, card_view, totalCards) {
        let cards = [...cards_container.children]
        let view_card = cards.slice(0, card_view)
        cards
            .slice(-view_card)
            .reverse()
            .forEach((card) => {
                cards_container.insertAdjacentHTML("afterbegin", card.outerHTML);
            });
        view_card.forEach(async (item) => {
            cards_container.innerHTML += item.outerHTML
            cards = [...cards_container.children]
        })

        let all_cards = parseInt(totalCards) + parseInt(card_view) * 2
        let extra_cards_unes = cards.length - all_cards
        if (cards.length > all_cards) {
            extra_cards_unes = cards.length - all_cards
            for (let i = 0; i < extra_cards_unes; i++) {
                cards_container.removeChild(cards_container.lastElementChild);
                cards = [...cards_container.children]
            }
        }
    }
    //card view - start
    if (window.innerWidth > 991) {
        rating_card_view = 3
    } else if (window.innerWidth <= 991 && window.innerWidth >= 769) {
        rating_card_view = 2
    } else if (window.innerWidth <= 768 && window.innerWidth >= 577) {
        rating_card_view = 1
    } else if (window.innerWidth <= 576) {
        rating_card_view = 1
    }

    cards_slides_setup(rating_cards_container, rating_card_view, rating_cards_qty)

    // Function to be called when the window is resized
    let isDragging = false,
        isAutoPlay = true,
        startX,
        startScrollLeft,
        timeoutId;
    function handleResize(cards_container) {
        setTimeout(() => {
            let all_cards = [...cards_container.children]
            let card_width = all_cards[0].offsetWidth
            cards_container.classList.add("no_transition");
            cards_container.scrollLeft = cards_container.offsetWidth;
            cards_container.classList.remove("no_transition");

            const dragStart = (e) => {
                isDragging = true;
                cards_container.classList.add("card_dragging");
                startX = e.pageX;
                startScrollLeft = carousel.scrollLeft;
                let d = startScrollLeft - (e.pageX - startX);
            };

            const dragging = (e) => {
                if (!isDragging) return; // if isDragging is false return from here
                // Updates the scroll position of the carousel based on the cursor movement
                cards_container.scrollLeft = startScrollLeft - (e.pageX - startX);
            };

            const dragStop = () => {
                isDragging = false;
                cards_container.classList.remove("card_dragging");
            };

            const infiniteScroll = () => {
                if (cards_container.scrollLeft === 0) {
                    cards_container.classList.add("no_transition");
                    cards_container.scrollLeft = cards_container.scrollWidth - 2 * cards_container.offsetWidth;
                    cards_container.classList.remove("no_transition");
                }
                else if (
                    Math.ceil(cards_container.scrollLeft) ===
                    cards_container.scrollWidth - cards_container.offsetWidth
                ) {
                    cards_container.classList.add("no_transition");
                    cards_container.scrollLeft = cards_container.offsetWidth;
                    cards_container.classList.remove("no_transition");
                }

                clearTimeout(timeoutId);
                if (!cards_container.matches(":hover")) autoPlay();
            };
            const autoPlay = () => {
                timeoutId = setTimeout(
                    () => (cards_container.scrollLeft += card_width),
                    2500
                );
            };
            autoPlay();

            cards_container.addEventListener("mousedown", dragStart);
            cards_container.addEventListener("mousemove", dragging);
            document.addEventListener("mouseup", dragStop);
            cards_container.addEventListener("scroll", infiniteScroll);
        }, 1000)
    }

    handleResize(rating_cards_container)

    window.onresize = function () {
        let rating_cards_container = document.querySelector('.rating_cards')
        if (window.innerWidth > 991) {
            rating_card_view = 3
        } else if (window.innerWidth <= 991 && window.innerWidth > 769) {
            rating_card_view = 2
        } else if (window.innerWidth <= 768 && window.innerWidth > 577) {
            rating_card_view = 1
        } else if (window.innerWidth <= 576 && window.innerWidth > 360) {
            rating_card_view = 1
        } else if (window.innerWidth <= 360) {
            rating_card_view = 1
        }
        cards_slides_setup(property_cards_container, property_card_view, property_cards_qty)
        cards_slides_setup(rating_cards_container, rating_card_view, rating_cards_qty)
    }
}