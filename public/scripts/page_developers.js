document.addEventListener('DOMContentLoaded', () => {
   
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

  s
});

