/* File Name: queue-manager.js */

// Core Data (Stored in LocalStorage)
let patients = JSON.parse(localStorage.getItem('patientList')) || [];

const regForm = document.getElementById('regForm');
if(regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const category = document.getElementById('category').value;
        const name = document.getElementById('fname').value;
        const prefix = (category === "Emergency") ? "E-" : "N-";
        const token = prefix + Math.floor(100 + Math.random() * 900);

        patients.push({ token, name, category, status: 'Waiting', time: Date.now() });
        saveAndRender();
        
        document.getElementById('tokenOutput').innerHTML = `
            <div class="display-box" style="margin-top:20px; border-color: green;">
                <h3>Registration Successful!</h3>
                <p>Your Token is: <b>${token}</b></p>
            </div>`;
        regForm.reset();
    });
}

// Data integrity and concurrency protection
function safeUpdateLocalStorage(updateFn) {
    const lockKey = 'pqms_lock';
    const lockTimeout = 5000; // 5 seconds
    
    if (localStorage.getItem(lockKey)) {
        const lockTime = parseInt(localStorage.getItem(lockKey));
        if (Date.now() - lockTime < lockTimeout) {
            setTimeout(() => safeUpdateLocalStorage(updateFn), 100);
            return;
        }
    }
    
    localStorage.setItem(lockKey, Date.now().toString());
    try {
        updateFn();
    } finally {
        localStorage.removeItem(lockKey);
    }
}

function saveAndRender() {
    safeUpdateLocalStorage(() => {
        // SORTING TRIAGE LOGIC:
        // 1. Emergency patients jump to top.
        // 2. Then sort by registration time.
        patients.sort((a, b) => {
            if (a.category === b.category) return a.time - b.time;
            return a.category === "Emergency" ? -1 : 1;
        });

        // Storage management
        try {
            const data = JSON.stringify(patients);
            if (data.length > 5000000) { // ~5MB limit
                patients = patients.slice(-100);
            }
            localStorage.setItem('patientList', JSON.stringify(patients));
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('Storage full. Clearing old data...');
                patients = patients.slice(-50);
                localStorage.setItem('patientList', JSON.stringify(patients));
            }
        }
    });
    
    renderQueue();
}

function renderQueue() {
    const listBody = document.getElementById('queueListBody');
    const servingEl = document.getElementById('servingNo');
    const nextEl = document.getElementById('nextNo');

    const waiting = patients.filter(p => p.status === 'Waiting');
    const current = patients.find(p => p.status === 'Serving');

    // Update displays only if they exist on the current page
    if (servingEl) servingEl.innerText = current ? current.token : "---";
    if (nextEl) nextEl.innerText = waiting[0] ? waiting[0].token : "None";

    if(!listBody) return;

    listBody.innerHTML = '';
    
    // Build Table with wait times
    patients.forEach(p => {
        const row = document.createElement('tr');
        if(p.category === 'Emergency') row.className = 'emerg-row';
        
        // Calculate wait time
        const waitTime = p.status === 'Waiting' ? 
            `${Math.floor((Date.now() - p.time) / 60000)} min` : 
            p.status === 'Serving' ? 'Being Served' : 'Completed';
        
        row.innerHTML = `
            <td>${p.token}</td>
            <td>${p.name}</td>
            <td><span class="badge ${p.category === 'Emergency' ? 'badge-emerg' : 'badge-normal'}">${p.category}</span></td>
            <td><b>${p.status}</b></td>
            <td>${waitTime}</td>`;
        listBody.appendChild(row);
    });
}

// Unified function for both "Update Queue" and "Call Next" buttons
window.callNextPatient = window.updateQueue = function() {
    // Mark serving as completed
    const servingIdx = patients.findIndex(p => p.status === 'Serving');
    if(servingIdx !== -1) patients.splice(servingIdx, 1);

    // Get next waiting patient
    const nextIdx = patients.findIndex(p => p.status === 'Waiting');
    if(nextIdx !== -1) patients[nextIdx].status = 'Serving';
    
    saveAndRender();
}

renderQueue();