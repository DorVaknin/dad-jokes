document.addEventListener('DOMContentLoaded', () => {
    const jokeText = document.getElementById('joke-text');
    const newJokeBtn = document.getElementById('new-joke-btn');
    
    // Function to fetch a new joke from the API
    async function fetchJoke() {
        try {
            jokeText.textContent = 'Loading...';
            
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            const data = await response.json();
            displayJoke(data.joke);
        } catch (error) {
            jokeText.textContent = 'Oops! Failed to fetch a joke. Try again later.';
            console.error('Error fetching joke:', error);
        }
    }
    
    // Function to display the joke with a typing effect
    function displayJoke(joke) {
        jokeText.textContent = '';
        let i = 0;
        
        // Add a slight delay before typing starts
        setTimeout(() => {
            const typingEffect = setInterval(() => {
                if (i < joke.length) {
                    jokeText.textContent += joke.charAt(i);
                    i++;
                } else {
                    clearInterval(typingEffect);
                }
            }, 30); // Speed of typing effect
        }, 300);
    }
    
    // Add click event listener to the button
    newJokeBtn.addEventListener('click', () => {
        fetchJoke();
        
        // Add a small animation to the button when clicked
        newJokeBtn.classList.add('clicked');
        setTimeout(() => {
            newJokeBtn.classList.remove('clicked');
        }, 200);
    });
    
    // Fetch a joke when the page loads
    fetchJoke();
});