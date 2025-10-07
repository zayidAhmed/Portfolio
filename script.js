
const editor = document.getElementById('editor');
const previewFrame = document.getElementById('preview');
const lineNumbers = document.getElementById('lineNumbers');
const clearBtn = document.getElementById('clearBtn');
const sampleBtn = document.getElementById('sampleBtn');
const errorPanel = document.getElementById('errorPanel');
const errorList = document.getElementById('errorList');

let errorLines = new Set();

// Validate HTML syntax
function validateHTML(html) {
    const errors = [];
    const lines = html.split('\n');
    const tagStack = [];
    const selfClosingTags = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr'];

    lines.forEach((line, index) => {
        const lineNum = index + 1;

        // Find all tags in the line
        const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
        let match;

        while ((match = tagRegex.exec(line)) !== null) {
            const fullTag = match[0];
            const tagName = match[1].toLowerCase();

            // Check for malformed tags
            if (!fullTag.endsWith('>')) {
                errors.push({ line: lineNum, message: `Unclosed tag bracket in <${tagName}>` });
                continue;
            }

            // Skip self-closing tags and comments
            if (selfClosingTags.includes(tagName) || fullTag.endsWith('/>') || tagName === '!--') {
                continue;
            }

            // Closing tag
            if (fullTag.startsWith('</')) {
                if (tagStack.length === 0) {
                    errors.push({ line: lineNum, message: `Closing tag </${tagName}> has no matching opening tag` });
                } else {
                    const lastTag = tagStack.pop();
                    if (lastTag.name !== tagName) {
                        errors.push({ line: lineNum, message: `Expected closing tag </${lastTag.name}>, found </${tagName}>` });
                        tagStack.push(lastTag); // Put it back
                    }
                }
            }
            // Opening tag
            else {
                tagStack.push({ name: tagName, line: lineNum });
            }
        }

        // Check for unclosed quotes in attributes
        const quoteRegex = /=["'][^"']*$/;
        if (quoteRegex.test(line) && !line.trim().endsWith('>')) {
            errors.push({ line: lineNum, message: 'Unclosed quote in attribute' });
        }
    });

    // Check for unclosed tags at the end
    while (tagStack.length > 0) {
        const unclosedTag = tagStack.pop();
        errors.push({ line: unclosedTag.line, message: `Unclosed tag <${unclosedTag.name}>` });
    }

    return errors;
}

// Update line numbers with error highlighting
function updateLineNumbers() {
    const lines = editor.value.split('\n').length;
    lineNumbers.innerHTML = '';

    for (let i = 1; i <= lines; i++) {
        const lineSpan = document.createElement('div');
        lineSpan.className = 'line-number';
        lineSpan.textContent = i;

        if (errorLines.has(i)) {
            lineSpan.classList.add('error');
        }

        lineNumbers.appendChild(lineSpan);
    }
}

// Display errors
function displayErrors(errors) {
    errorLines.clear();

    if (errors.length === 0) {
        errorPanel.classList.remove('show');
        return;
    }

    errorPanel.classList.add('show');
    errorList.innerHTML = '';

    errors.forEach(error => {
        errorLines.add(error.line);
        const li = document.createElement('li');
        li.textContent = `Line ${error.line}: ${error.message}`;
        errorList.appendChild(li);
    });
}

// Update preview
function updatePreview() {
    const content = editor.value;
    const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write(content);
    iframeDoc.close();
}

// Sync scroll between line numbers and editor
editor.addEventListener('scroll', () => {
    lineNumbers.scrollTop = editor.scrollTop;
});

// Handle editor input
editor.addEventListener('input', () => {
    const errors = validateHTML(editor.value);
    displayErrors(errors);
    updateLineNumbers();
    updatePreview();
});

// Handle tab key for indentation
editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
        updateLineNumbers();
    }
});

// Load sample code
sampleBtn.addEventListener('click', () => {
    const sample = `
<style>
    body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    h1,
    p,
    .btns {
        text-align: center;
        animation: fadeIn 1s;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    button {
        background: white;
        color: #667eea;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin: 10px 5px;
    }

    button:hover {
        transform: scale(1.05);
        transition: 0.3s;
    }
</style>

<h1>Welcome to Live HTML Editor!</h1>
<p>This is a sample page with interactive elements.</p>
<div class="btns">
    <button onclick="alert('Hello from Live Preview!')">Click Me!</button>
    <button onclick="changeColor()">Change Background</button>
</div>

<script>
    function changeColor() {
        const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.background = 'linear-gradient(135deg, ' + randomColor + ' 0%, #764ba2 100%)';
    }
</script>
`;
    editor.value = sample;
    const errors = validateHTML(editor.value);
    displayErrors(errors);
    updateLineNumbers();
    updatePreview();
});

// Clear editor
clearBtn.addEventListener('click', () => {
    editor.value = '';
    errorLines.clear();
    displayErrors([]);
    updateLineNumbers();
    updatePreview();
});

// Initialize
updateLineNumbers();
