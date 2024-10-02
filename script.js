document.addEventListener('DOMContentLoaded', () => {
    const dealButton = document.getElementById('deal-button');
    const player1Cards = document.querySelectorAll('#player1 .card');
    const balloonContainer = document.getElementById('balloon-container');
    const closeButton = document.getElementById('close-button');
    let dealButtonClicked = false;

    dealButton.addEventListener('click', () => {
        if (!dealButtonClicked) {
            dealCards();
            dealButtonClicked = true;
        }
    });

    closeButton.addEventListener('click', () => {
        const modal = document.getElementById('winner-modal');
        modal.style.display = 'none';
        dealButtonClicked = false; // Reset to allow another deal
    });

    function dealCards() {
        const deck = createDeck();
        shuffleDeck(deck);

        const player1Hand = deck.splice(0, 3);

        displayCards(player1Hand, player1Cards);

        // Rotate cards after a delay
        setTimeout(() => {
            player1Cards.forEach(card => {
                card.classList.add('rotate');
            });
        }, 500);

        setTimeout(() => {
            showWinnerModal();
            triggerConfetti();
            // triggerBalloons();
        }, 1000);
    }

    function createDeck() {
        const suits = ['', '', '', ''];
        const values = [''];
        const deck = [];

        for (let suit of suits) {
            for (let value of values) {
                deck.push({ value, suit });
            }
        }

        return deck;
    }

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function displayCards(hand, cardElements) {
        hand.forEach((card, index) => {
            const cardBack = cardElements[index].querySelector('.card-back');
            cardBack.textContent = `${card.value}${card.suit}`;
        });
    }

    function showWinnerModal() {
        const modal = document.getElementById('winner-modal');
        modal.style.display = 'block';
    }

    function triggerConfetti() {
        confetti({
            particleCount: 800,
            spread: 90,
            origin: { y: 0.6 },
        });
    }

    // function triggerBalloons() {
    //     for (let i = 0; i < 20; i++) {
    //         const balloon = document.createElement('div');
    //         balloon.className = 'balloon';
    //         balloon.style.left = `${Math.random() * 100}%`;
    //         balloon.style.background = getRandomBalloonGradient();
    //         balloonContainer.appendChild(balloon);

    //         setTimeout(() => {
    //             balloon.remove();
    //         }, 7000);
    //     }
    // }

    function getRandomBalloonGradient() {
        const colors = [
            { light: '#ff9999', dark: '#ff4d4d' },
            { light: '#9999ff', dark: '#4d4dff' },
            { light: '#99ff99', dark: '#4dff4d' },
            { light: '#ffff99', dark: '#ffff4d' },
            { light: '#ff99ff', dark: '#ff4dff' },
            { light: '#ffcc99', dark: '#ff9933' }
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return `linear-gradient(145deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4)), linear-gradient(to top, ${color.light}, ${color.dark})`;
    }
});
