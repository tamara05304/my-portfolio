// Enhanced recipe data with microbiology focus
const recipes = [
    {
        id: 1,
        title: "Chicken Pizza",
        image: "pizza.jpg",
        category: "fermented",
        time: "2 hours (includes fermentation)",
        servings: 4,
        calories: 285,
        tags: ["Student Favorite", "Fermentation Science"],
        ingredients: [
            "250g wholemeal flour",
            "1 tsp instant yeast (Saccharomyces cerevisiae)",
            "¼ tsp salt",
            "1 tbsp rapeseed oil",
            "3 peppers (mixed colors)",
            "1 large onion",
            "1 tbsp rapeseed oil",
            "1 tsp fennel seeds (Foeniculum vulgare)",
            "2 tbsp barbecue sauce",
            "2 tbsp tomato purée",
            "225g skinless chicken breast",
            "175g baby plum tomatoes",
            "50g Applewood smoked cheese"
        ],
        instructions: [
            "Mix flour, yeast, salt, oil and 200ml warm water to form a soft dough",
            "Knead for 5 mins in mixer (10 mins by hand) - gluten development phase",
            "Cover and let ferment at room temp for 1 hour - yeast activation period",
            "Toss sliced peppers and onions with oil and fennel seeds, roast for 15 mins",
            "Mix barbecue sauce and tomato purée with 5 tbsp water - creating emulsion",
            "Press dough into oiled 25x35cm tin (don't knead first!) - gluten relaxation",
            "Spread with ⅔ sauce, coat chicken with remaining",
            "Top with roasted veggies, tomatoes, chicken, and cheese",
            "Bake at 220°C for 15 mins - Maillard reaction occurs"
        ],
        science: [
            "Yeast fermentation produces CO₂ creating air pockets in the dough",
            "Wholemeal flour provides more nutrients for yeast compared to white flour",
            "Fennel seeds contain antimicrobial compounds that aid digestion",
            "High oven temperature creates Maillard reactions for optimal browning",
            "Resting dough allows gluten strands to relax for better texture"
        ]
    },
    {
        id: 2,
        title: "Bomb Pilau",
        image: "pilau.jpg",
        category: "traditional",
        time: "1 hour 15 mins",
        servings: 6,
        calories: 420,
        tags: ["Family Recipe", "Spice Science"],
        ingredients: [
            "2 cups basmati rice (Oryza sativa)",
            "5 medium potatoes (Solanum tuberosum)",
            "¼ cup vegetable oil",
            "2 red onions (Allium cepa)",
            "4 cloves garlic (Allium sativum)",
            "2 tbsp ginger (Zingiber officinale)",
            "1 serrano chile (Capsicum annuum)",
            "1 tbsp homemade pilau masala",
            "2 beef stock cubes",
            "¼ cup fresh cilantro (Coriandrum sativum)",
            "1 lb beef sirloin",
            "3 Roma tomatoes (Solanum lycopersicum)",
            "4 cups water",
            "2 bay leaves (Laurus nobilis)",
            "Salt to taste"
        ],
        instructions: [
            "Dry roast cumin, black pepper, cinnamon, cardamom and cloves until fragrant",
            "Blend to powder - essential oil extraction phase",
            "Heat oil in pot, fry onions 10-15 mins until golden brown - caramelization",
            "Add garlic, ginger, chile - volatile compound release",
            "Add beef, pilau masala, stock cubes, bay leaves, cilantro, and salt",
            "Cook 8-10 mins until meat is browned - Maillard reaction occurs",
            "Add tomatoes, cook 4-5 mins until they break down - pectin breakdown",
            "Stir in potatoes and water, boil for 10 mins - starch gelatinization",
            "Add rice, cover tightly with foil then lid - steam cooking phase",
            "Cook on low 20 mins until liquid is absorbed - absorption method"
        ],
        science: [
            "Dry roasting spices releases essential oils that enhance flavor",
            "Caramelizing onions creates Maillard reactions for umami flavors",
            "Tight foil seal creates ideal steam environment for rice texture",
            "Cumin and cardamom contain antimicrobial compounds",
            "Slow cooking breaks down collagen into gelatin for tenderness"
        ]
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up recipe cards on menu page
    if (document.querySelector('.recipe-cards')) {
        loadRecipeCards();
        setupFilterButtons();
    }

    // Set up recipe detail pages (kept for compatibility)
    if (document.querySelector('.recipe-content')) {
        const recipeId = getRecipeIdFromUrl();
        const recipe = recipes.find(r => r.id === recipeId);
        if (recipe) {
            displayRecipeDetails(recipe);
        }
    }

    // Set up back to top button
    setupBackToTop();

    // Set up print and share buttons (kept for compatibility)
    setupRecipeActions();
});

// Load recipe cards for menu page
function loadRecipeCards(filter = 'all') {
    const container = document.querySelector('.recipe-cards');
    container.innerHTML = '';
    
    const filteredRecipes = filter === 'all' ? recipes : recipes.filter(recipe => recipe.category === filter);
    
    filteredRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.dataset.id = recipe.id;
        card.innerHTML = `
            <div class="card-image">
                <img src="${recipe.image}" alt="${recipe.title}">
                <span class="recipe-tag">${recipe.tags[0]}</span>
            </div>
            <div class="card-content">
                <h3>${recipe.title}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                    <span><i class="fas fa-users"></i> Serves ${recipe.servings}</span>
                </div>
                <p>${recipe.instructions[0].substring(0, 80)}...</p>
                <span class="view-recipe">View Recipe <i class="fas fa-arrow-right"></i></span>
            </div>
        `;
        
        card.addEventListener('click', () => showRecipeModal(recipe));
        container.appendChild(card);
    });
}

// Show recipe in modal
function showRecipeModal(recipe) {
    const modal = document.getElementById('recipeModal');
    
    // Set basic recipe info
    document.getElementById('modalRecipeTitle').textContent = recipe.title;
    document.getElementById('modalRecipeImage').src = recipe.image;
    document.getElementById('modalRecipeImage').alt = recipe.title;
    document.getElementById('modalRecipeTime').textContent = recipe.time;
    document.getElementById('modalRecipeServings').textContent = recipe.servings;
    
    // Set ingredients
    const ingredientsList = document.getElementById('modalRecipeIngredients');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    
    // Set instructions
    const instructionsList = document.getElementById('modalRecipeInstructions');
    instructionsList.innerHTML = '';
    recipe.instructions.forEach((step, i) => {
        const li = document.createElement('li');
        li.textContent = step;
        instructionsList.appendChild(li);
    });
    
    // Set science tips
    const scienceList = document.getElementById('modalRecipeScience');
    scienceList.innerHTML = '';
    recipe.science.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        scienceList.appendChild(li);
    });
    
    // Show modal
    modal.style.display = 'block';
    
    // Close modal when clicking X
    document.querySelector('.close-modal').onclick = () => {
        modal.style.display = 'none';
    };
    
    // Close modal when clicking outside
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Set up filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-options button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter recipes
            const filter = button.dataset.filter;
            loadRecipeCards(filter);
        });
    });
}

// Display recipe details on recipe pages (kept for compatibility)
function displayRecipeDetails(recipe) {
    // Update header
    document.querySelector('.recipe-header h1').textContent = recipe.title;
    document.querySelector('.recipe-description').textContent = getRecipeDescription(recipe);
    
    // Update hero image
    document.querySelector('.recipe-hero').src = recipe.image;
    document.querySelector('.recipe-hero').alt = recipe.title;
    
    // Update ingredients
    const ingredientsList = document.querySelector('.ingredients ul');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    
    // Update instructions
    const instructionsContainer = document.querySelector('.instructions');
    instructionsContainer.innerHTML = `
        <h2><i class="fas fa-list-ol"></i> Method</h2>
        ${recipe.instructions.map((step, i) => `
            <div class="step">
                <h3>Step ${i+1}</h3>
                <p>${step}</p>
            </div>
        `).join('')}
    `;
    
    // Update science tips
    const scienceList = document.querySelector('.science-tips ul');
    scienceList.innerHTML = '';
    recipe.science.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        scienceList.appendChild(li);
    });
    
    // Update print button
    document.querySelector('.print-recipe').onclick = () => printRecipe(recipe);
}

function getRecipeIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

function getRecipeDescription(recipe) {
    return `Microbiology-inspired ${recipe.category} recipe with ${recipe.tags.join(' and ').toLowerCase()}`;
}

function printRecipe(recipe) {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
        <html>
            <head>
                <title>${recipe.title} Recipe</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
                    h1 { color: #5C0013; border-bottom: 2px solid #5C0013; padding-bottom: 10px; }
                    h2 { color: #7A0025; margin-top: 20px; }
                    ul { margin-left: 20px; }
                    .step { margin-bottom: 15px; }
                    .science-tips { background: #f8f8f8; padding: 15px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <h1>${recipe.title}</h1>
                <p><strong>Preparation Time:</strong> ${recipe.time}</p>
                <p><strong>Serves:</strong> ${recipe.servings}</p>
                
                <h2>Ingredients</h2>
                <ul>
                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
                
                <h2>Instructions</h2>
                ${recipe.instructions.map((step, i) => `
                    <div class="step">
                        <h3>Step ${i+1}</h3>
                        <p>${step}</p>
                    </div>
                `).join('')}
                
                <div class="science-tips">
                    <h2>The Science Behind This Recipe</h2>
                    <ul>
                        ${recipe.science.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
                
                <p style="margin-top: 30px; font-style: italic;">
                    Recipe by Tamara Damaris, Microbiology Student at JKUAT
                </p>
                
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 200);
                    }
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
}

function setupBackToTop() {
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function setupRecipeActions() {
    // Print button
    const printBtn = document.querySelector('.print-recipe');
    if (printBtn) {
        printBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const recipeId = getRecipeIdFromUrl();
            const recipe = recipes.find(r => r.id === recipeId);
            if (recipe) printRecipe(recipe);
        });
    }

    // Share button
    const shareBtn = document.querySelector('.share-recipe');
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const recipeId = getRecipeIdFromUrl();
            const recipe = recipes.find(r => r.id === recipeId);
            if (recipe) {
                if (navigator.share) {
                    navigator.share({
                        title: recipe.title,
                        text: `Check out this microbiology-inspired recipe: ${recipe.title}`,
                        url: window.location.href
                    }).catch(err => {
                        console.log('Error sharing:', err);
                    });
                } else {
                    // Fallback for browsers that don't support Web Share API
                    prompt('Copy this link to share:', window.location.href);
                }
            }
        });
    }
}
