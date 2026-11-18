
// Get HTML elements
const projectForm = document.getElementById("project-form");
const projectName = document.getElementById("project-name");
const projectBudget = document.getElementById("project-budget");
const projectList = document.getElementById("project-list");

// Load projects from localStorage
let projects = JSON.parse(localStorage.getItem("projects")) || [];

// Add project
projectForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const project = {
        id: Date.now(),
        name: projectName.value.trim(),
        budget: Number(projectBudget.value),
        status: "Active",
        paid: false
    };

    projects.push(project);

    saveProjects();

    projectForm.reset();
});

// Save projects
function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
    displayProjects();
    updateDashboard();
}

// Display projects
function displayProjects() {

    projectList.innerHTML = "";

    projects.forEach(function (project) {

        const div = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = project.name;

        const budget = document.createElement("p");
        budget.textContent = "Budget: ₹" + project.budget;

        const status = document.createElement("p");
        status.textContent = "Status: " + project.status;

        const payment = document.createElement("p");
        payment.textContent = project.paid ? "Paid" : "Unpaid";

        const statusBtn = document.createElement("button");
        statusBtn.textContent = "Change Status";

        statusBtn.addEventListener("click", function () {
            project.status =
                project.status === "Active" ? "Completed" : "Active";

            saveProjects();
        });

        const paymentBtn = document.createElement("button");
        paymentBtn.textContent = project.paid ? "Mark Unpaid" : "Mark Paid";

        paymentBtn.addEventListener("click", function () {
            project.paid = !project.paid;
            saveProjects();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {

            projects = projects.filter(function (p) {
                return p.id !== project.id;
            });

            saveProjects();
        });

        div.append(name, budget, status, payment,
                   statusBtn, paymentBtn, deleteBtn);

        projectList.appendChild(div);
    });
}

// Update dashboard
function updateDashboard() {

    const totalProjects = projects.length;

    const activeProjects = projects.filter(function (project) {
        return project.status === "Active";
    }).length;

    const totalEarnings = projects.reduce(function (total, project) {
        return total + (project.paid ? project.budget : 0);
    }, 0);

    document.getElementById("total-projects").textContent =
        totalProjects;

    document.getElementById("active-projects").textContent =
        activeProjects;

    document.getElementById("total-earnings").textContent =
        "₹" + totalEarnings;

    document.getElementById("earnings-display").textContent =
        "₹" + totalEarnings;
}

// Initial display
displayProjects();
updateDashboard();
