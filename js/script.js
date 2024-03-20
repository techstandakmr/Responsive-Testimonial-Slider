window.onload = function () {
    // alert(window.innerWidth)
    let navToggleBtn = document.querySelector('.navToggleBtn')
    let navBar = document.querySelector('nav')
    // let navOverlay = document.querySelector('.navOverlay')
    let navBtnBar = document.querySelectorAll('.navBtnBar')
    let topBar1 = document.querySelector('.topBar')
    let topBar2 = document.querySelector('.topBar2')
    // let navBarContainer = document.querySelector('.NavBar')
    let navBarContainer = document.querySelector('header')
    let navBtnBar1 = navBtnBar[0];
    let navBtnBar2 = navBtnBar[1];
    let navBtnBar3 = navBtnBar[2];
    let navBarshow = true;
    function controlNavbAr() {
        if (document.documentElement.scrollTop > navBarContainer.scrollHeight) {
            navBarContainer.style.position = 'fixed'
            navBarContainer.style.top = '0px'
            navBarContainer.style.left = '0px'
            navBarContainer.style.right = '0px'
            navBarContainer.style.background = "white";
            navBarContainer.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px";
            navBarContainer.style.zIndex = '9999999999'
            navBarContainer.style.padding = '18px 14px'
        }
        else {
            navBarContainer.style.position = 'relative'
            navBarContainer.style.background = 'transparent'
            navBarContainer.style.boxShadow = "0px 0px";
        }
        if (window.innerWidth <= 768) {
            navBar.style.transform = 'translate(-100%)'
            document.body.style.overflowY = "auto";
            navBar.style.boxShadow = "0px 0px";
            // navOverlay.style.display = "none";
            navBtnBar.forEach((btn) => {
                btn.style.height = '2px';
                btn.style.transform = "rotate(0deg)";
                btn.style.top = '0px';
                btn.style.left = '0px';
            })
        }
        else {
            navBar.style.transform = 'translate(0px)'
            navBar.style.boxShadow = "0px 0px";
        }
    }
    controlNavbAr()
    navToggleBtn.addEventListener('click', function () {
        navBarshow = !navBarshow
        if (!navBarshow) {
            document.body.style.overflowY = "hidden";
            navBar.style.transform = 'translate(0px)'
            navBar.style.overflowY = 'auto'
            navBar.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px";
            // navOverlay.style.display = "block";

            navBtnBar1.style.height = '2px';
            navBtnBar1.style.transform = "rotate(-45deg)";
            navBtnBar1.style.top = '10px';
            navBtnBar1.style.left = '0px';

            navBtnBar2.style.height = '0px';
            navBtnBar2.style.transform = "scale(0)";
            navBtnBar2.style.top = '0px';
            navBtnBar2.style.left = '0px';

            navBtnBar3.style.height = '2px';
            navBtnBar3.style.transform = "rotate(45deg)";
            navBtnBar3.style.top = '-6px';
            navBtnBar3.style.left = '0px';
        }
        else {
            controlNavbAr()
        }
    })


    let property_card_view;
    let rating_card_view;
    // alert(window.innerWidth)
    async function cards_slides_setup(cards_container, card_view, totalCards) {
        // let property_card_css = getComputedStyle(property_cards[0])
        // let property_card_padding = parseInt(property_card_css.paddingRight) / 2
        // let property_card_width = property_cards[0].offsetWidth + property_card_padding        
        // let property_card_view = Math.ceil(property_cards_container.offsetWidth / property_card_width)

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
            // console.log('zydah hai', property_cards.length)
            for (let i = 0; i < extra_cards_unes; i++) {
                cards_container.removeChild(cards_container.lastElementChild);
                cards = [...cards_container.children]
            }
            console.log(cards.length)
        }
    }
    //card view - start
    if (window.innerWidth > 991) {
        property_card_view = 4
        rating_card_view = 3
    } else if (window.innerWidth <= 991 && window.innerWidth >= 769) {
        property_card_view = 3
        rating_card_view = 2
    } else if (window.innerWidth <= 768 && window.innerWidth >= 577) {
        property_card_view = 2
        rating_card_view = 1
    } else if (window.innerWidth <= 576) {
        property_card_view = 1
        rating_card_view = 1
    }

    let property_cards_container = document.querySelector('.property_boxes')
    let rating_cards = document.querySelector('.rating_cards')
    let property_cards_qty = property_cards_container.getAttribute('totalCards')
    let rating_cards_qty = rating_cards.getAttribute('totalCards')
    cards_slides_setup(property_cards_container, property_card_view, property_cards_qty)
    cards_slides_setup(rating_cards, rating_card_view, rating_cards_qty)

    let property_card_width = property_cards_container.children[0].offsetWidth
    let rating_card_width = rating_cards.children[0].offsetWidth

    let resizeTimer;

    // Function to be called when the window is resized
    function handleResize(card_width) {
        // console.log(property_card_width)
        // console.log(rating_card_width)
        // console.log(card_width)
        // Clear the previous interval if it exists
        clearInterval(resizeTimer);

        // Set a new interval
        resizeTimer = setInterval(function () {
            // Your code here
            console.log('Hi');
        }, 1000); // Change 500 to your desired interval time
    }
    handleResize(property_card_width)
    handleResize(rating_card_width)
    // Add an event listener for the window resize event

    window.onscroll = function () {
        controlNavbAr()
    }
    window.onresize = function () {
        controlNavbAr()
        let property_cards_container = document.querySelector('.property_boxes')
        let rating_cards = document.querySelector('.rating_cards')
        if (window.innerWidth > 991) {
            console.log('screen 991 se zyadah')
            property_card_view = 4
            property_card_width = 281;
            rating_card_view = 3
            rating_card_width = 380;
        } else if (window.innerWidth <= 991 && window.innerWidth > 769) {
            console.log('screen 991')
            property_card_view = 3
            property_card_width = 310;
            rating_card_view = 2
            rating_card_width = 465;
        } else if (window.innerWidth <= 768 && window.innerWidth > 577) {
            console.log('screen 768')
            property_card_view = 2
            property_card_width = 354;
            rating_card_view = 1
            rating_card_width = 708;
        } else if (window.innerWidth <= 576 && window.innerWidth > 360) {
            console.log('screen 576')
            property_card_view = 1
            property_card_width = 528;
            rating_card_view = 1
            rating_card_width = 528;
        } else if (window.innerWidth <= 360) {
            console.log('screen 360')
            property_card_view = 1
            property_card_width = 316;
            rating_card_view = 1
            rating_card_width = 308;
        }

        handleResize(property_card_width)
        handleResize(rating_card_width)

        cards_slides_setup(property_cards_container, property_card_view, property_cards_qty)
        cards_slides_setup(rating_cards, rating_card_view, rating_cards_qty)
    }
}