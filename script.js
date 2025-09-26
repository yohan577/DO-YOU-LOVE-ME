document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const mainContainer = document.getElementById('main-container');
    const messageContainer = document.getElementById('message-container');
    const gifDisplay = document.getElementById('gif-display');
    const headerText = document.querySelector('.header-text');

    // --- Configuration ---
    // The total number of states (and thus clicks) before the No button vanishes is 6.
    const noButtonStates = [
        { text: "Hummm! Are you sure?", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnR3ZXo2YXd6dWVxdHA5NDN6ZGhkeG1qOWhrcWJwMGJ5N3I0dXN2NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/eKfpB6WZeKC1DiGrj8/giphy.gif" },
        { text: "Hummm! Are you sure?", gif: "https://media.tenor.com/9gBUlyc0JYkAAAAM/no-hmph.gif" },
        { text: "REALLY???????????", gif: "https://media.tenor.com/9r3jOGuUtLQAAAAM/milk-and-mocha-pinched.gif" },
        { text: "I'm gonna cry..", gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnR3ZXo2YXd6dWVxdHA5NDN6ZGhkeG1qOWhrcWJwMGJ5N3I0dXN2NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/eKfpB6WZeKC1DiGrj8/giphy.gif" },
        { text: "HA YAHHHHHHHH!!!!!!!!", gif: "https://media.tenor.com/KvpPl8urDHkAAAAM/waka-flocka.gif" },
        { text: "Click YESS!!!!!!!!", gif: "https://media.tenor.com/Q9t8fkTw8EgAAAAM/milk-and-mocha-bear-couple.gif" },
    ];

    let noClickCount = 0;
    // Set to 0 so the button starts moving after the *first* click.
    const START_MOVING_AFTER = 0; 

    // --- Helper Functions ---

    // Function to calculate a new random position for the button
    function moveButton() {
        if (noBtn.style.position !== 'absolute') {
            noBtn.classList.add('moving-btn'); 
        }

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnRect = noBtn.getBoundingClientRect();
        
        const padding = 20;

        const newX = Math.floor(Math.random() * (viewportWidth - btnRect.width - 2 * padding)) + padding;
        const newY = Math.floor(Math.random() * (viewportHeight - btnRect.height - 2 * padding)) + padding;

        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
    }

    // Function to update the text and GIF on "No" interaction
    function updateNoMessage() {
        if (noClickCount < noButtonStates.length) {
            headerText.textContent = noButtonStates[noClickCount].text;
            gifDisplay.src = noButtonStates[noClickCount].gif; // Updates the GIF
        }
    }


    // --- Core Logic for "No" Button ---

    function handleNoClick() {
        noClickCount++; // 1. Increment the counter

        // 2. Update the message and GIF
        updateNoMessage();
        
        // 3. Check if we are still within the defined states for the 'No' button
        if (noClickCount < noButtonStates.length) {
            
            // Start moving the button after the defined threshold
            if (noClickCount > START_MOVING_AFTER) {
                 moveButton();
            }

        } else {
            // --- FINAL STATE LOGIC: This section executes after the last state ---
            
            // A. Make the "No" button disappear
            noBtn.style.display = 'none'; 
            
            // B. Make the "Yes" button bigger by adding a new class
            yesBtn.classList.add('yes-grow');
            
            // C. Stop listening for clicks on the 'No' button
            noBtn.removeEventListener('click', handleNoClick);
        }
    }

    // Attach the initial click event listener
    noBtn.addEventListener('click', handleNoClick);


    // --- Yes Button Logic (Acceptance) ---

    yesBtn.addEventListener('click', () => {
        // Hide the main container
        mainContainer.classList.add('hidden');
        
        // Show the message container
        messageContainer.classList.remove('hidden');

        // Add the final response content
        messageContainer.innerHTML = `
            <h1 class="header-text">Hehehehe, I love you, too. HONEY/MHIE (LYKA ELAINE) &lt;3</h1>
            <img class="gif" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnR3ZXo2YXd6dWVxdHA5NDN6ZGhkeG1qOWhrcWJwMGJ5N3I0dXN2NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Jt5GkWXoLswrgP2Aws/giphy.gif" alt="Happy response GIF">
        `;
    });
});