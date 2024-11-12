// Access form and display section with type assertions
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplay = document.getElementById("resume-display") as HTMLElement;

function generateResume(): void {
  // Retrieve input values with type assertions
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLInputElement).value;
  const work = (document.getElementById("work") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value.split(',');

  // Clear previous resume display content
  resumeDisplay.innerHTML = `<h2>Your Resume</h2>`;

  // Array of sections with titles and content for dynamic display
  const sections: { title: string; content: string }[] = [
    {
      title: "Personal Information",
      content: `<strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Phone:</strong> ${phone}`,
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
      content: `<ul class="skill-list">${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>`,
    },
  ];

  // Append each section dynamically to the resume display
  sections.forEach((section) => {
    const sectionElement = document.createElement("div");
    sectionElement.classList.add("resume-section");
    sectionElement.innerHTML = `<h3>${section.title}</h3><div class="editable" contenteditable="true">${section.content}</div>`;
    
    // Event listener to save edits instantly
    const editableElement = sectionElement.querySelector('.editable');
    if (editableElement) {
      editableElement.addEventListener('blur', (e) => {
        const updatedContent = (e.target as HTMLElement).innerHTML;
        // Reflect changes instantly (no page reload)
        (e.target as HTMLElement).innerHTML = updatedContent;
      });
    }

    resumeDisplay.appendChild(sectionElement);
  });
}

// Button event listener with optional chaining
document.getElementById("generate-resume")?.addEventListener("click", generateResume);

// Function to download the resume as a text file
function downloadResume(): void {
  const resumeContent = resumeDisplay.innerHTML; // Get the HTML content of the resume
  const blob = new Blob([resumeContent], { type: "text/html" }); // Create a Blob object with the content
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "resume.html"; // Set the filename for download
  link.click();
}

// Function to generate a shareable link
function generateShareableLink(): void {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLInputElement).value;
  const work = (document.getElementById("work") as HTMLTextAreaElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value;

  // Create an object with resume data
  const resumeData = { name, email, phone, education, work, skills };
  const encodedData = encodeURIComponent(JSON.stringify(resumeData)); // Encode resume data

  // Generate a link with encoded data
  const link = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;
  const linkText = document.getElementById("link-text") as HTMLSpanElement;
  linkText.textContent = link;

  // Display the link for sharing
  document.getElementById("shareable-link")!.style.display = "block";
}

// Parse URL to load data if it exists (for shared link)
function loadSharedData(): void {
  const params = new URLSearchParams(window.location.search);
  if (params.has("data")) {
    const decodedData = JSON.parse(decodeURIComponent(params.get("data")!));
    (document.getElementById("name") as HTMLInputElement).value = decodedData.name;
    (document.getElementById("email") as HTMLInputElement).value = decodedData.email;
    (document.getElementById("phone") as HTMLInputElement).value = decodedData.phone;
    (document.getElementById("education") as HTMLInputElement).value = decodedData.education;
    (document.getElementById("work") as HTMLTextAreaElement).value = decodedData.work;
    (document.getElementById("skills") as HTMLInputElement).value = decodedData.skills;
    generateResume(); // Automatically generate the resume with loaded data
  }
}

// Event listeners
document.getElementById("generate-resume")?.addEventListener("click", generateResume);
document.getElementById("download-resume")?.addEventListener("click", downloadResume);
document.getElementById("generate-link")?.addEventListener("click", generateShareableLink);

// Load shared data if available in URL
window.addEventListener("load", loadSharedData);

