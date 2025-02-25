// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
});

// Mouse move event for interactive elements
document.querySelectorAll('.interactive').forEach(element => {
    element.addEventListener('mousemove', () => {
        element.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
        element.classList.remove('active');
    });
});

// Nobel Prize API functionality
document.getElementById('quote-button').addEventListener('click', async () => {
    try {
        // Fetch Nobel Prize laureates
        const response = await fetch('https://api.nobelprize.org/v1/prize.json');
        const data = await response.json();
        
        // Get all laureates from the prizes array
        const prizes = data.prizes;
        const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
        
        // Get a random laureate from the selected prize
        const laureates = randomPrize.laureates;
        if (!laureates) {
            throw new Error('No laureate found for this prize');
        }
        
        const randomLaureate = laureates[Math.floor(Math.random() * laureates.length)];
        
        // Update table cells
        document.getElementById('laureate-name').textContent = 
            `${randomLaureate.firstname} ${randomLaureate.surname || ''}`;
        document.getElementById('laureate-year').textContent = randomPrize.year;
        document.getElementById('laureate-category').textContent = randomPrize.category;
        document.getElementById('laureate-motivation').textContent = 
            randomLaureate.motivation.replace(/"/g, '');

        // Show and animate the table
        const table = document.getElementById('nobel-table');
        table.classList.remove('hidden');
        setTimeout(() => {
            table.classList.add('visible');
        }, 10);

    } catch (error) {
        document.getElementById('quote-text').textContent = 
            'Failed to fetch Nobel Prize information. Please try again.';
    }
}); 