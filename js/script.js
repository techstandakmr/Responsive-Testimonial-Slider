window.onload = function () {
    let rating_card_view;
    let rating_cards_container = document.querySelector('.rating_cards')
    let rating_cards_qty = rating_cards_container.getAttribute('totalCards')
    function cards_slides_setup(cards_container, card_view, totalCards) {
        let cards = [...cards_container.children]
        let view_card = cards.slice(0, card_view)
        view_card.forEach(async (item) => {
            cards_container.innerHTML += item.outerHTML
            cards = [...cards_container.children]
        })

        let all_cards = parseInt(totalCards) + parseInt(card_view)
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
    let resizeTimer;

    let rating_card_position_num = 0;
    function handleResize() {
        setTimeout(() => {
            let rating_cards = [...rating_cards_container.children]
            let rating_card_width = rating_cards_container.children[0].offsetWidth
            // Clear the previous interval if it exists
            clearInterval(resizeTimer);
            // Set a new interval
            resizeTimer = setInterval(function () {
                rating_card_position_num++
                rating_cards.forEach((item) => {
                    let item_css = getComputedStyle(item)
                    let item_padding = parseInt(item_css.paddingRight) / 2
                    let item_width = rating_card_width + item_padding
                    let rating_card_moving_position = item.style.transform
                    rating_card_moving_position = rating_card_moving_position.replace(/[^\d.]/g, '')
                    item.style.transform = `translatex(-${item_width * rating_card_position_num}px)`
                    item.style.transitionDuration = '0.5s'
                    if (rating_card_position_num - 1 == rating_cards_qty) {
                        rating_card_position_num = 0;
                        rating_cards.forEach((item) => {
                            item.style.transitionDuration = `0.0s`
                            item.style.transform = `translatex(0px)`
                        })
                    }
                })

            }, 3000); // Change 500 to your desired interval time
        }, 1000)
    }
    handleResize()

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

        handleResize()
        cards_slides_setup(rating_cards_container, rating_card_view, rating_cards_qty)
    }
}