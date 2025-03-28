// Initialize DOM elements
document.addEventListener("DOMContentLoaded", () => {
    const editorText = document.getElementById("editor-textarea");
    const previewText = document.getElementById("preview");
    const clearButton = document.getElementById("clear-button");

    // Validate DOM elements
    if (!editorText || !previewText || !clearButton) {
        console.error("One or more elements not found. Check your HTML IDs.");
        return;
    }

    // Clear text handler
    clearButton.addEventListener("click", () => {
        editorText.value = "";
        previewText.innerHTML = "";
    });

    // Convert markdown to HTML
    const parseMarkdown = (text) => {
        let html = text
            .replace(/^######\s*(.*)$/gm, "<h6>$1</h6>") // H6 tags
            .replace(/^#####\s*(.*)$/gm, "<h5>$1</h5>") // H5 tags
            .replace(/^####\s*(.*)$/gm, "<h4>$1</h4>") // H4 tags
            .replace(/^###\s*(.*)$/gm, "<h3>$1</h3>") // H3 tags
            .replace(/^##\s*(.*)$/gm, "<h2>$1</h2>") // H2 tags
            .replace(/^#\s*(.*)$/gm, "<h1>$1</h1>") // H1 tags
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold text
            .replace(/\*(.*?)\*/g, "<i>$1</i>") // Italic text
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>') // Link tags
            .replace(/(?:^|\n)- (.*?)(?:\n|$)/g, "<ul><li>$1</li></ul>") // List items
            .replace(/\n\n/g, "</p><p>") // Paragraph breaks
            .replace(/\n/g, "<br>"); // Line breaks
        
        previewText.innerHTML = `<p>${html}</p>`; 
    };

    // Live preview handler
    editorText.addEventListener("input", () => parseMarkdown(editorText.value));
});