// Function to capture click events and page views
function activity(event) {
    const timestamp = new Date().toLocaleString(); // Current timestamp
    const eventtype = event.type === 'click' ? 'click' : 'view';
    const target = event.target.tagName.toLowerCase();
    const obj = event.target.type || event.target.alt || 'text';

    console.log(`Timestamp: ${timestamp}`);
    console.log(`Type of event: ${eventtype}`);
    console.log(`Event object: ${obj}`);
}

document.addEventListener('click', activity);

window.addEventListener('load', function() {
    activity({ type: 'view', target: document.body });
});

// Function to analyze text
function analyseText() {
    const text = document.getElementById('text-input').value; // Fixed: Changed from ariaValueMax to value
    const words = text.trim().split(/\s+/);
    if (words.length < 10000) {
        document.getElementById('output').innerHTML = "Error: More than 10,000 words are required!";
        return;
    }

    // Calculate letters, words, spaces, newlines, and special symbols
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^a-zA-Z\s\n]/g) || []).length; // Fixed: Removed invalid \h

    // Tokenize and count pronouns
    const pronouns = ['i', 'me', 'you', 'she', 'he', 'it', 'we', 'us', 'they', 'them'];
    const pronounCount = {};
    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        if (pronouns.includes(lowerWord)) {
            pronounCount[lowerWord] = (pronounCount[lowerWord] || 0) + 1;
        }
    });

    // Tokenize and count prepositions
    const prepositions = ['in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'of', 'about'];
    const prepositionCount = {}; // Fixed: Consistent variable name
    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        if (prepositions.includes(lowerWord)) {
            prepositionCount[lowerWord] = (prepositionCount[lowerWord] || 0) + 1;
        }
    });

    // Tokenize and count indefinite articles
    const indefiniteArticles = ['a', 'an'];
    const articleCount = {};
    words.forEach(word => {
        const lowerWord = word.toLowerCase();
        if (indefiniteArticles.includes(lowerWord)) {
            articleCount[lowerWord] = (articleCount[lowerWord] || 0) + 1;
        }
    });

    // Generate output
    let output = `
        <strong>Text Analysis Results:</strong><br>
        <span class="output-item">- Letters: ${letters}</span><br>
        <span class="output-item">- Words: ${words.length}</span><br>
        <span class="output-item">- Spaces: ${spaces}</span><br>
        <span class="output-item">- Newlines: ${newlines}</span><br>
        <span class="output-item">- Special Symbols: ${specialSymbols}</span><br>

        <div class="section-break"></div>
        <strong>Pronoun Counts:</strong><br>
        ${Object.entries(pronounCount).length ? Object.entries(pronounCount).map(([key, value]) => `<span class="output-item">- ${key}: ${value}</span><br>`).join('') : '<span class="output-item">No pronouns found</span><br>'}

        <div class="section-break"></div>
        <strong>Preposition Counts:</strong><br>
        ${Object.entries(prepositionCount).length ? Object.entries(prepositionCount).map(([key, value]) => `<span class="output-item">- ${key}: ${value}</span><br>`).join('') : '<span class="output-item">No prepositions found</span><br>'}

        <div class="section-break"></div>
        <strong>Indefinite Article Counts:</strong><br>
        ${Object.entries(articleCount).length ? Object.entries(articleCount).map(([key, value]) => `<span class="output-item">- ${key}: ${value}</span><br>`).join('') : '<span class="output-item">No indefinite articles found</span><br>'}
    `;
    document.getElementById('output').innerHTML = output;
}