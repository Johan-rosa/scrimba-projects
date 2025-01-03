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
        this.$modal = document.querySelector(".modal");
        this.$modalTitle = document.querySelector(".modal-title");
        this.$modalText = document.querySelector(".modal-text");
        this.$modalClose = document.querySelector(".modal-close-button");

        this.addEventListeners();
    }

    addEventListeners() {
        document.body.addEventListener("click", event => {
            this.handleFormClick(event);
        });

        this.$modalClose.addEventListener("click", () => {
            this.closeModal();
        });

        this.$notes.addEventListener("click", event => {
            if (this.$notes.contains(event.target)) {
                const selectedNote = this.selectNote(event);
                const note = this.notes.filter(note => note.id == selectedNote.id);

                this.$modalTitle.value = note[0].title;
                this.$modalText.value = note[0].text;
                this.openModal(event);
            }
        });

        this.$form.addEventListener("submit", event => {
            event.preventDefault();
            this.saveNote();
        });
    }

    handleFormClick(event) {
        const isFormClicked = this.$form.contains(event.target);
        isFormClicked ? this.openForm() : this.closeForm();
        isFormClicked ? null : this.saveNote();
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

    saveNote() {
        const text = this.$noteText.value;
        const title = this.$noteTitle.value;

        const hasNote = title || text;
        if (hasNote) {
            this.addNote({ title, text });
        }

        this.clearForm();
        this.closeForm();
    }

    selectNote(event) {
        const $selectedNote = event.target.closest('.note');
        console.log($selectedNote.id);
        return $selectedNote;
     }

    displayNotes() {
        const hasNotes = this.notes.length > 0;
        this.$placeholder.style.display = hasNotes ? "none" : "flex";

        this.$notes.innerHTML = this.notes.map(note => `
            <div style="background: ${note.color};" class="note" id="${note.id}">
                <div class="${note.title && 'note-title'}">${note.title}</div>
                <div class="note-text">${note.text}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                        <img class="toolbar-color" src="./palette.svg">
                        <img class="toolbar-delete" src="./delete.svg">
                    </div>
                </div>
            </div>
        `).join("");
    }

    openModal(event) {
        if (event.target.closest(".note")) {
            this.$modal.classList.add("open-modal");
        }
    }

    closeModal() {
        this.$modal.classList.remove("open-modal");
    }

}

new APP()