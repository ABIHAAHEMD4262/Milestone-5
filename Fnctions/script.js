var _a, _b, _c, _d;
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
// Function to download the resume as a text file
function downloadResume() {
    var resumeContent = resumeDisplay.innerHTML; // Get the HTML content of the resume
    var blob = new Blob([resumeContent], { type: "text/html" }); // Create a Blob object with the content
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.html"; // Set the filename for download
    link.click();
}
// Function to generate a shareable link
function generateShareableLink() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var work = document.getElementById("work").value;
    var skills = document.getElementById("skills").value;
    // Create an object with resume data
    var resumeData = { name: name, email: email, phone: phone, education: education, work: work, skills: skills };
    var encodedData = encodeURIComponent(JSON.stringify(resumeData)); // Encode resume data
    // Generate a link with encoded data
    var link = "".concat(window.location.origin).concat(window.location.pathname, "?data=").concat(encodedData);
    var linkText = document.getElementById("link-text");
    linkText.textContent = link;
    // Display the link for sharing
    document.getElementById("shareable-link").style.display = "block";
}
// Parse URL to load data if it exists (for shared link)
function loadSharedData() {
    var params = new URLSearchParams(window.location.search);
    if (params.has("data")) {
        var decodedData = JSON.parse(decodeURIComponent(params.get("data")));
        document.getElementById("name").value = decodedData.name;
        document.getElementById("email").value = decodedData.email;
        document.getElementById("phone").value = decodedData.phone;
        document.getElementById("education").value = decodedData.education;
        document.getElementById("work").value = decodedData.work;
        document.getElementById("skills").value = decodedData.skills;
        generateResume(); // Automatically generate the resume with loaded data
    }
}
// Event listeners
(_b = document.getElementById("generate-resume")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", generateResume);
(_c = document.getElementById("download-resume")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", downloadResume);
(_d = document.getElementById("generate-link")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", generateShareableLink);
// Load shared data if available in URL
window.addEventListener("load", loadSharedData);
