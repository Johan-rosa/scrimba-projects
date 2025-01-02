class APP {
    constructor() {
        console.log("app works");
        this.notes = [];

        this.$form = document.querySelector("#form");
        this.$noteTitle = document.querySelector("#note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$formButtons = document.querySelector("#form-buttons");
        this.$placeholder = document.querySelector("#placeholder");
        this.$notes = document.querySelector("#notes");

        this.addEventListeners();
    }

    addEventListeners() {
        document.body.addEventListener("click", event => {
            this.handleFormClick(event);
        });

        this.$form.addEventListener("submit", event => {
            event.preventDefault();
            const text = this.$noteText.value;
            const title = this.$noteTitle.value;

            const hasNote = title || text;
            if (hasNote) {
                this.addNote({ title, text });
            }

            this.clearForm();
            this.closeForm();
        });
    }

    handleFormClick(event) {
        const isFormClicked = this.$form.contains(event.target);
        isFormClicked ? this.openForm() : this.closeForm();
    }

    openForm() {
        this.$form.classList.add("form-open");
        this.$noteTitle.style.display = "block";
        this.$formButtons.style.display = "block";
    }

    closeForm() {
        this.$form.classList.remove("form-open");
        this.$noteTitle.style.display = "none";
        this.$formButtons.style.display = "none";
    }

    clearForm() {
        this.$noteTitle.value = "";
        this.$noteText.value = "";
    }

    addNote(note) {
        const notesCount = this.notes.length;
        const newNote = {
            title: note.title,
            text: note.text,
            date: new Date(),
            color: "white",
            id: notesCount > 0 ? this.notes[notesCount - 1].id + 1 : 1
        };

        this.notes = [...this.notes, newNote];
        this.displayNotes();
    }

    displayNotes() {
        const hasNotes = this.notes.length > 0;
        this.$placeholder.style.display = hasNotes ? "none" : "flex";
        
        this.$notes.innerHTML = this.notes.map(note => `
            <div style="background: ${note.color};" class="note">
                <div class="${note.title && 'note-title'}">${note.title}</div>
                <div class="note-text">${note.text}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                        <img class="toolbar-color" src="https://icon.now.sh/palette">
                        <img class="toolbar-delete" src="https://icon.now.sh/delete">
                    </div>
                </div>
            </div>
        `).join("");
    }
}

new APP()