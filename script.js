document.addEventListener("DOMContentLoaded", () => {
    const editorText = document.getElementById("editor-textarea");
    const previewText = document.getElementById("preview");
    const clearButton = document.getElementById("clear-button");

    if (!editorText || !previewText || !clearButton) {
        console.error("One or more elements not found. Check your HTML IDs.");
        return;
    }

    clearButton.addEventListener("click", () => {
        editorText.value = "";
        previewText.innerHTML = "";
    });

    const parseMarkdown = (text) => {
        let html = text
            .replace(/^######\s*(.*)$/gm, "<h6>$1</h6>") // H6
            .replace(/^#####\s*(.*)$/gm, "<h5>$1</h5>") // H5
            .replace(/^####\s*(.*)$/gm, "<h4>$1</h4>") // H4
            .replace(/^###\s*(.*)$/gm, "<h3>$1</h3>") // H3
            .replace(/^##\s*(.*)$/gm, "<h2>$1</h2>") // H2
            .replace(/^#\s*(.*)$/gm, "<h1>$1</h1>") // H1
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold
            .replace(/\*(.*?)\*/g, "<i>$1</i>") // Italics
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>') // Links
            .replace(/(?:^|\n)- (.*?)(?:\n|$)/g, "<ul><li>$1</li></ul>") // Lists
            .replace(/\n\n/g, "</p><p>") // Paragraphs
            .replace(/\n/g, "<br>"); // Single line breaks
        
        previewText.innerHTML = `<p>${html}</p>`; 
    };

    editorText.addEventListener("input", () => parseMarkdown(editorText.value));
});