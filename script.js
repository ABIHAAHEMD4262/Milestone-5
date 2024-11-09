var _a;
// Access form and display section with type assertions
var form = document.getElementById("resume-form");
var resumeDisplay = document.getElementById("resume-display");
function generateResume() {
    // Retrieve input values with type assertions
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var work = document.getElementById("work").value;
    var skills = document.getElementById("skills").value.split(',');
    // Clear previous resume display content
    resumeDisplay.innerHTML = "<h2>Your Resume</h2>";
    // Array of sections with titles and content for dynamic display
    var sections = [
        {
            title: "Personal Information",
            content: "<strong>Name:</strong> ".concat(name, "<br><strong>Email:</strong> ").concat(email, "<br><strong>Phone:</strong> ").concat(phone),
        },
        {
            title: "Education",
            content: education,
        },
        {
            title: "Work Experience",
            content: work,
        },
        {
            title: "Skills",
            content: "<ul class=\"skill-list\">".concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "</ul>"),
        },
    ];
    // Append each section dynamically to the resume display
    sections.forEach(function (section) {
        var sectionElement = document.createElement("div");
        sectionElement.classList.add("resume-section");
        sectionElement.innerHTML = "<h3>".concat(section.title, "</h3><div class=\"editable\" contenteditable=\"true\">").concat(section.content, "</div>");
        // Event listener to save edits instantly
        var editableElement = sectionElement.querySelector('.editable');
        if (editableElement) {
            editableElement.addEventListener('blur', function (e) {
                var updatedContent = e.target.innerHTML;
                // Reflect changes instantly (no page reload)
                e.target.innerHTML = updatedContent;
            });
        }
        resumeDisplay.appendChild(sectionElement);
    });
}
// Button event listener with optional chaining
(_a = document.getElementById("generate-resume")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", generateResume);
