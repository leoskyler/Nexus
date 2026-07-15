// --- Tab Switcher Logic ---
function switchTab(tab) {
    const terminal = document.getElementById('terminalTab');
    const editor = document.getElementById('editorTab');
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => btn.classList.remove('active'));

    if (tab === 'terminal') {
        terminal.classList.remove('hidden');
        editor.classList.add('hidden');
        tabBtns[0].classList.add('active');
        document.getElementById('terminalInput').focus();
    } else {
        terminal.classList.add('hidden');
        editor.classList.remove('hidden');
        tabBtns[1].classList.add('active');
        document.getElementById('codeEditor').focus();
    }
}

// --- Live Line Numbers Generator ---
const textarea = document.getElementById('codeEditor');
const lineNums = document.getElementById('lineNums');

textarea.addEventListener('input', () => {
    const lines = textarea.value.split('\n').length;
    let numHTML = '';
    for (let i = 1; i <= Math.max(lines, 9); i++) {
        numHTML += i + '<br>';
    }
    lineNums.innerHTML = numHTML;
});

// --- Idea Engine Database ---
const ideas = [
    {
        title: "🌌 Spatial Audio Workspace",
        desc: "A browser-based focus platform that lets developers drag-and-drop environmental noise nodes in an interactive 3D virtual room to craft personalized background soundscapes."
    },
    {
        title: "🔮 Web3 Digital Ledger Sandbox",
        desc: "An educational visual playground that shows exactly how transactions are chained, block-by-block, in real-time, completely client-side in beautiful 3D canvases."
    },
    {
        title: "⚡ Ultra-Light Markdown Compiler",
        desc: "A distraction-free, elegant text compiler designed for authors that translates raw markdown drafts directly into production-ready web booklets using single-file layouts."
    },
    {
        title: "🎨 CSS Color Palette Morphist",
        desc: "A generator that creates color systems from organic physics. Dropping droplets of virtual paint into an interactively flowing liquid canvas that computes custom hex maps."
    }
];

const sphere = document.getElementById('sphere');
const ideaText = document.getElementById('ideaText');
const ideaTitle = document.querySelector('.idea-title');

sphere.addEventListener('click', () => {
    sphere.style.transform = "scale(0.85)";
    setTimeout(() => sphere.style.transform = "", 150);

    const randomIdx = Math.floor(Math.random() * ideas.length);
    const chosenIdea = ideas[randomIdx];

    ideaText.style.opacity = '0';
    ideaTitle.style.opacity = '0';
    
    setTimeout(() => {
        ideaTitle.textContent = chosenIdea.title;
        ideaText.textContent = chosenIdea.desc;
        ideaTitle.style.opacity = '1';
        ideaText.style.opacity = '1';
    }, 250);
});

// --- Command Console Processing ---
const termInput = document.getElementById('terminalInput');
const termOutput = document.getElementById('terminalOutput');

termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = termInput.value.trim().toLowerCase();
        termInput.value = '';

        const logRow = document.createElement('div');
        logRow.innerHTML = `<span class="prompt-symbol">nexus$</span> <span>${cmd}</span>`;
        termOutput.insertBefore(logRow, termInput.parentElement);

        const response = document.createElement('div');
        response.style.color = '#10b981';

        if (cmd === 'help') {
            response.innerHTML = `Available commands:<br> - <span style="color:var(--secondary)">bio</span>: Read my introduction<br> - <span style="color:var(--secondary)">tech</span>: View my developer stack<br> - <span style="color:var(--secondary)">clear</span>: Wipe clean the console`;
        } else if (cmd === 'bio') {
            response.textContent = "A young and ambitious developer crafting high-performance user spaces, leveraging raw web engineering to bring dynamic utilities to life.";
        } else if (cmd === 'tech') {
            response.textContent = "Stack Profile: HTML5, CSS3, JavaScript (ES6+), and modern layout frameworks.";
        } else if (cmd === 'clear') {
            termOutput.innerHTML = '';
            termOutput.appendChild(termInput.parentElement);
            return;
        } else if (cmd === '') {
            return;
        } else {
            response.style.color = '#ef4444';
            response.textContent = `Error: command "${cmd}" unrecognized. Try typing "help".`;
        }

        termOutput.insertBefore(response, termInput.parentElement);
        termOutput.scrollTop = termOutput.scrollHeight;
    }
});
// --- JavaScript Code Runner Logic ---
const runBtn = document.getElementById('runCodeBtn');
const consoleOutputText = document.getElementById('consoleOutputText');

runBtn.addEventListener('click', () => {
    const userCode = textarea.value;
    consoleOutputText.innerHTML = ""; // Clear output

    // Capture user console.log actions
    let logs = [];
    const customConsole = {
        log: (...args) => {
            logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' '));
        },
        error: (...args) => {
            logs.push(`<span style="color: #ef4444;">Error: ${args.join(' ')}</span>`);
        }
    };

    try {
        // Run the code safely by wrapping it in a function with our custom console
        const runner = new Function('console', userCode);
        runner(customConsole);
        
        if (logs.length === 0) {
            consoleOutputText.innerHTML = "<span style='color: var(--text-muted);'>Code executed successfully, but nothing was printed to console.log().</span>";
        } else {
            consoleOutputText.innerHTML = logs.join('<br>');
        }
    } catch (err) {
        consoleOutputText.innerHTML = `<span style="color: #ef4444;">Runtime Error: ${err.message}</span>`;
    }
});
// --- Sliding Drawer Navigation & Accordion Logic ---
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Open Sidebar
menuBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('visible');
});

// Close Sidebar via Close Button
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
});

// Close Sidebar by tapping on background overlay
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
});

// Accordion Expanding/Collapsing Logic
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        const isActive = item.classList.contains('active');

        // Close all other active sections (optional, clean UX)
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            }
        });

        // Toggle self
        if (isActive) {
            item.classList.remove('active');
            content.style.maxHeight = null;
        } else {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px"; // Expand accurately based on inner content height
        }
    });
});
