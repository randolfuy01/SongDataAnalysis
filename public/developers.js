document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Greeting
    const greetingElement = document.createElement('h2');
    greetingElement.textContent = getGreeting();
    document.body.insertBefore(greetingElement, document.body.firstChild);

    // More Info Toggle
    const developers = document.querySelectorAll('.developer');
    developers.forEach(developer => {
        const moreInfoButton = document.createElement('button');
        moreInfoButton.textContent = 'My Socials';
        moreInfoButton.addEventListener('click', () => {
            const moreInfo = developer.querySelector('.more-info');
            if (moreInfo) {
                moreInfo.style.display = moreInfo.style.display === 'none' ? 'block' : 'none';
            }
        });
        developer.appendChild(moreInfoButton);
    });

    // Theme Toggle Button
    const themeToggleButton = document.createElement('button');
    themeToggleButton.textContent = 'Toggle Theme';
    themeToggleButton.style.position = 'fixed';
    themeToggleButton.style.right = '20px';
    themeToggleButton.style.bottom = '20px';
    themeToggleButton.style.zIndex = '1000';
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
    document.body.appendChild(themeToggleButton);
    
});

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 18) return 'Good Afternoon!';
    return 'Good Evening!';
}


