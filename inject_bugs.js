const fs = require('fs');
const path = require('path');

// Function to inject bugs based on Operator's analysis
function injectBugs() {
    console.log('Injecting demo bugs based on Operator analysis...');
    
    // 1. Fix header logo positioning and add debugging styles
    const stylePath = path.join(__dirname, 'public', 'style.css');
    let css = fs.readFileSync(stylePath, 'utf8');
    
    // Update logo positioning to right with red/yellow styling
    css = css.replace(
        /\.logo\s*{\s*position:\s*absolute;\s*top:\s*0;\s*left:\s*20px;/,
        `.logo {
    position: absolute;
    top: 0;
    right: 20px; /* DEMO BUG: Logo on right instead of left */
    float: right;
    background: red; /* DEMO BUG: Debugging style */
    border: 2px solid yellow; /* DEMO BUG: Debugging style */`
    );
    
    // 2. Remove Sign In button from all pages
    const htmlFiles = ['index.html', 'calculator.html', 'products.html', 'contact.html'];
    htmlFiles.forEach(file => {
        const htmlPath = path.join(__dirname, 'public', file);
        let html = fs.readFileSync(htmlPath, 'utf8');
        // Comment out the sign in button
        html = html.replace(
            /<button id="signin-btn" class="btn-signin">Sign In<\/button>/,
            '<!-- DEMO BUG: Sign In button removed\n                <button id="signin-btn" class="btn-signin">Sign In</button> -->'
        );
        fs.writeFileSync(htmlPath, html);
    });
    
    // 3. Replace calculator heading with error message
    const calcPath = path.join(__dirname, 'public', 'calculator.html');
    let calcHtml = fs.readFileSync(calcPath, 'utf8');
    calcHtml = calcHtml.replace(
        '<h1>Contract Calculator</h1>',
        '<h1 class="error-heading" style="background: red; color: yellow; border: 2px solid blue; padding: 20px;">BROKEN CALCULATOR PAGE - HEADING MISSING</h1>'
    );
    
    // 4. Remove contract title field and add error div
    calcHtml = calcHtml.replace(
        /<div class="form-group">\s*<label for="contract-title">Contract Title<\/label>\s*<input type="text" id="contract-title" name="contractTitle" placeholder="Enter contract title">\s*<\/div>/,
        `<div class="form-group">
                                <div style="background: red; color: white; padding: 15px; border: 2px solid yellow;">
                                    ERROR: Contract Title input field is MISSING!
                                </div>
                            </div>`
    );
    
    // 5. Change hourly rate default to 999 with error styling
    calcHtml = calcHtml.replace(
        'value="150"',
        'value="999" style="background: red; color: white; border: 2px solid yellow;"'
    );
    
    fs.writeFileSync(calcPath, calcHtml);
    
    // 6. Add alert to calculate button
    const scriptPath = path.join(__dirname, 'public', 'script.js');
    let js = fs.readFileSync(scriptPath, 'utf8');
    
    // Find the calculate function and add alert at the beginning
    js = js.replace(
        /function calculate\(\) {\s*const hourlyRate/,
        `function calculate() {
        // DEMO BUG: Alert prevents calculation
        alert('DEMO ERROR: Calculate button broken - results panel will not appear!');
        return;
        
        const hourlyRate`
    );
    
    fs.writeFileSync(scriptPath, js);
    
    // 7. Add flashy button hover effects
    css = css + `\n\n/* DEMO BUG: Flashy button hover effects */
.btn-primary:hover {
    background: magenta !important;
    color: yellow !important;
    transform: scale(1.3) !important;
    border: 2px solid red !important;
    transition: all 0.3s ease !important;
}`;
    
    fs.writeFileSync(stylePath, css);
    
    console.log('All demo bugs injected successfully!');
}

// Run the injection
injectBugs();