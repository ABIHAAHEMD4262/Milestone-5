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
