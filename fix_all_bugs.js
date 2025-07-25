const fs = require('fs');
const path = require('path');

// Function to fix all bugs based on Operator's analysis
function fixAllBugs() {
    console.log('Fixing all demo bugs based on Operator analysis...');
    
    // 1. Fix header logo positioning and remove debugging styles
    const stylePath = path.join(__dirname, 'public', 'style.css');
    let css = fs.readFileSync(stylePath, 'utf8');
    
    // Fix logo positioning back to left and remove debugging styles
    css = css.replace(
        /\.logo\s*{\s*position:\s*absolute;\s*top:\s*0;\s*right:\s*20px;[^}]*}/,
        `.logo {
    position: absolute;
    top: 0;
    left: 20px;
    display: flex;
    align-items: center;
    height: 70px;}`
    );
    
    // 2. Re-add Sign In button to all pages
    const htmlFiles = ['index.html', 'calculator.html', 'products.html', 'contact.html'];
    htmlFiles.forEach(file => {
        const htmlPath = path.join(__dirname, 'public', file);
        let html = fs.readFileSync(htmlPath, 'utf8');
        // Uncomment the sign in button
        html = html.replace(
            /<!-- DEMO BUG: Sign In button removed\s*<button id="signin-btn" class="btn-signin">Sign In<\/button> -->/,
            '<button id="signin-btn" class="btn-signin">Sign In</button>'
        );
        fs.writeFileSync(htmlPath, html);
    });
    
    // 3. Fix calculator heading
    const calcPath = path.join(__dirname, 'public', 'calculator.html');
    let calcHtml = fs.readFileSync(calcPath, 'utf8');
    calcHtml = calcHtml.replace(
        /<h1 class="error-heading" style="background: red; color: yellow; border: 2px solid blue; padding: 20px;">BROKEN CALCULATOR PAGE - HEADING MISSING<\/h1>/,
        '<h1>Contract Calculator</h1>'
    );
    
    // 4. Re-add contract title field
    calcHtml = calcHtml.replace(
        /<div style="background: red; color: white; padding: 15px; border: 2px solid yellow;">\s*ERROR: Contract Title input field is MISSING!\s*<\/div>/,
        `<label for="contract-title">Contract Title</label>
                                <input type="text" id="contract-title" name="contractTitle" placeholder="Enter contract title">`
    );
    
    // 5. Fix hourly rate default and remove error styling
    calcHtml = calcHtml.replace(
        'value="999" style="background: red; color: white; border: 2px solid yellow;"',
        'value="150"'
    );
    
    fs.writeFileSync(calcPath, calcHtml);
    
    // 6. Fix calculate function - remove alert
    const scriptPath = path.join(__dirname, 'public', 'script.js');
    let js = fs.readFileSync(scriptPath, 'utf8');
    
    // Remove the demo bug alert and return statement
    js = js.replace(
        /function calculate\(\) {\s*\/\/ DEMO BUG: Alert prevents calculation\s*alert\('DEMO ERROR: Calculate button broken - results panel will not appear!'\);\s*return;\s*const hourlyRate/,
        `function calculate() {
        const hourlyRate`
    );
    
    fs.writeFileSync(scriptPath, js);
    
    // 7. Fix button hover effects - remove flashy styles
    css = css.replace(
        /\/\* DEMO BUG: Flashy button hover effects \*\/\s*.btn-primary:hover\s*{[^}]*}/,
        ''
    );
    
    // Uncomment the proper primary button hover state
    css = css.replace(
        /\/\* INTENTIONALLY BROKEN: Primary button hover state missing for test failure \*\/\s*\/\* \.btn-primary:hover {[^}]*} \*\//,
        `.btn-primary:hover {
    background: #0056b3;
    transform: translateY(-1px);
}`
    );
    
    // Fix dropdown hover that was intentionally broken
    css = css.replace(
        /\.dropdown:hover \.dropdown-menu\s*{\s*\/\*[^*]*\*\/\s*opacity:\s*0;\s*visibility:\s*hidden;\s*}/,
        `.dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}`
    );
    
    fs.writeFileSync(stylePath, css);
    
    console.log('All bugs fixed successfully!');
}

// Run the fixes
fixAllBugs();