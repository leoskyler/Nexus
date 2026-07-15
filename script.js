// --- Idea Board Generation Logic ---
const sphere = document.getElementById('sphere');
const ideaText = document.getElementById('ideaText');

const projectIdeas = [
    "Build a localized command-line script to automate database backups with instant webhook notifications.",
    "Design a secure, lightweight personal portfolio with a terminal interface and a built-in interactive playground.",
    "Develop a responsive task tracking app with integrated offline support and local storage syncing.",
    "Create an API status dashboard that monitors your web projects and pings you when a service goes down.",
    "Develop a micro-learning web app that presents a single high-impact cybersecurity or cloud concept every day."
];

sphere.addEventListener('click', () => {
    // Pick a random idea from the list
    const randomIndex = Math.floor(Math.random() * projectIdeas.length);
    ideaText.innerText = projectIdeas[randomIndex];
    
    // Add a quick visual pop animation to the sphere on click
    sphere.style.transform = "scale(0.9)";
    setTimeout(() => {
        sphere.style.transform = "";
    }, 150);
});

// --- Tab Switching Logic ---
function switchTab(tabName) {
    const terminalTab = document.getElementById('terminalTab');
    const editorTab = document.getElementById('editorTab');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Toggle active classes on tab buttons
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    if (tabName === 'terminal') {
        terminalTab.classList.remove('hidden');
        editorTab.classList.add('hidden');
        document.querySelector("button[onclick=\"switchTab('terminal')\"]").classList.add('active');
    } else {
        terminalTab.classList.add('hidden');
        editorTab.classList.remove('hidden');
        document.querySelector("button[onclick=\"switchTab('editor')\"]").classList.add('active');
    }
}

// --- Terminal Simulator Logic ---
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        terminalInput.value = ''; // Clear input field

        // Create elements to show command history
        const userRow = document.createElement('div');
        userRow.innerHTML = `<span class="prompt-symbol">nexus$</span> <span>${command}</span>`;
        
        const responseRow = document.createElement('div');
        responseRow.style.color = 'var(--text-muted)';

        // Process simple commands
        if (command === 'help') {
            responseRow.innerHTML = "Available commands:<br>- <strong>help</strong>: Show this menu<br>- <strong>clear</strong>: Clean the screen<br>- <strong>about</strong>: Quick background bio<br>- <strong>skills</strong>: My primary engineering fields";
        } else if (command === 'clear') {
            terminalOutput.innerHTML = '';
            // Re-append the prompt row so we don't lose the interface
            addNewPromptRow();
            return;
        } else if (command === 'about') {
            responseRow.innerText = "I'm Leoskyler, an adaptable developer crafting solutions at the intersection of performance, security, and interface design.";
        } else if (command === 'skills') {
            responseRow.innerText = "Tech Stack: JavaScript, Python, Web & App Development, Cybersecurity Fundamentals, Cloud & Database Management.";
        } else if (command === "") {
            // Do nothing on empty command
            userRow.remove();
            return;
        } else {
            responseRow.innerHTML = `<span style="color: #ef4444;">Command not found: "${command}". Type "help" for options.</span>`;
        }

        // Insert command and response above the input row
        const inputContainer = terminalInput.closest('.terminal-row');
        terminalOutput.insertBefore(userRow, inputContainer);
        terminalOutput.insertBefore(responseRow, inputContainer);

        // Auto-scroll to bottom of the terminal screen
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// Helper function to restore the input line after a clear command
function addNewPromptRow() {
    terminalOutput.innerHTML = `
        <div class="terminal-row">
            <span class="prompt-symbol">nexus$</span>
            <input type="text" class="terminal-input" id="terminalInput" placeholder="..." autofocus autocomplete="off">
        </div>
    `;
    // Re-bind listener to the freshly created input element
    const newInput = document.getElementById('terminalInput');
    newInput.addEventListener('keydown', arguments.callee);
    newInput.focus();
}

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

        // Close all other active sections (clean accordion UX)
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            }
        });

        // Toggle current clicked item
        if (isActive) {
            item.classList.remove('active');
            content.style.maxHeight = null;
        } else {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px"; // Dynamic expansion
        }
    });
});

