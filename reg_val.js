/* File Name: register-val.js */
document.getElementById('regForm').addEventListener('submit', function(e) {
    const name = document.getElementById('fname').value.trim();
    const ageValue = document.getElementById('age').value;
    const category = document.getElementById('category').value;
    const age = Number(ageValue);

    if (!name || !ageValue || !category) {
        e.stopImmediatePropagation();
        e.preventDefault();
        alert("Please enter Name, Age and Category!");
        return;
    }

    if (isNaN(age) || age <= 0 || age > 120) {
        e.stopImmediatePropagation();
        e.preventDefault();
        alert("Please enter a valid age (1–120).");
        return;
    }

    // allow queue_val.js handler to continue and register patient
});