document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar when the sidebar toggle button is clicked
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    });

    // Close sidebar when clicking outside of it
    sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    });
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add click handler for CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        // This will be implemented later when we add the chat interface
        console.log('Chat interface will be implemented soon!');
    });
    
    // Model selection dropdown functionality
    const modelSelector = document.querySelector('.model-selector');
    const selectedModelDisplay = document.querySelector('.selected-model');
    const modelDropdown = document.querySelector('.model-dropdown');
    const modelOptions = document.querySelectorAll('.model-option');
    let selectedModel = selectedModelDisplay.textContent.trim();
    
    // Toggle dropdown on click
    selectedModelDisplay.addEventListener('click', (e) => {
        e.stopPropagation();
        modelSelector.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        modelSelector.classList.remove('active');
    });
    
    // Prevent dropdown from closing when clicking inside it
    modelDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Function to update checkmark position
    const updateCheckmark = (selectedOption) => {
        modelOptions.forEach(opt => {
            const checkmark = opt.querySelector('.model-check');
            if (checkmark) {
                checkmark.remove();
            }
        });

        if (!selectedOption.querySelector('.model-badge')) {
            const checkDiv = document.createElement('div');
            checkDiv.className = 'model-check';
            checkDiv.textContent = '✓';
            selectedOption.appendChild(checkDiv);
        }
    };

    // Add click handlers ONLY to actual model options (exclude .more-models)
    document.querySelectorAll('.model-option:not(.more-models)').forEach(option => {
        option.addEventListener('click', () => {
            const modelNameElement = option.querySelector('.model-name');
            if (!modelNameElement) return; // Skip if model name isn't found
            
            const modelName = modelNameElement.textContent;
            
            // Update the display: Set text content and append arrow span
            selectedModelDisplay.textContent = modelName; // Set text content first
            const arrowSpan = document.createElement('span');
            arrowSpan.style.fontSize = '0.65rem';
            arrowSpan.style.opacity = '0.7';
            arrowSpan.style.marginLeft = '0.7rem';
            arrowSpan.innerHTML = '&#9660;';
            selectedModelDisplay.appendChild(arrowSpan); // Append the arrow
            console.log('Updated innerHTML:', selectedModelDisplay.innerHTML);

            selectedModel = modelName;
            updateCheckmark(option);
            // Close the dropdown after selection
            modelSelector.classList.remove('active');
        });
    });

    // Set initial checkmark on the default selected model (excluding .more-models)
    const initialSelectedOption = Array.from(document.querySelectorAll('.model-option:not(.more-models)')).find(
        option => {
            const nameElement = option.querySelector('.model-name');
            return nameElement && nameElement.textContent === selectedModel; // Check if nameElement exists
        }
    );
    if (initialSelectedOption) {
        updateCheckmark(initialSelectedOption);
    }
    
    // Handle the "More models" option
    const moreModelsOption = document.querySelector('.more-models');
    if (moreModelsOption) {
        moreModelsOption.addEventListener('click', () => {
            console.log('More models clicked - would open full model selection page');
            // This would typically open a modal or navigate to a models page
        });
    }
    
    // Search button functionality
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Searching with ${selectedModel}: ${query}`);
            // Here you would implement the actual search functionality
        }
    });
    
    // Allow search on Enter key press
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                console.log(`Searching with ${selectedModel}: ${query}`);
                // Here you would implement the actual search functionality
            }
        }
    });
});