//A helper method for running a function on each item with a certain class:
const forEachOfClass = (className, cb) => {
    Array.from(document.getElementsByClassName(className))
    .forEach(element => cb(element));
}

//For each view button...
forEachOfClass('view-button', (button) => {
    const articleId = button.dataset.articleid;
    const notesSection = document.querySelector(`#notes-for-${articleId}`);
    //If the article has notes, toggle their display:
    if(notesSection.childElementCount) {
        button.addEventListener('click', () => notesSection.classList.toggle('hidden'));
    //If not, disable the button:
    } else {
        button.setAttribute('disabled', true);
    }
});

forEachOfClass('comment-button', button => {
    const articleId = button.dataset.articleid;
    button.addEventListener('click', () => {
        const noteFormModal = document.querySelector(`#modal-${articleId}`);
        noteFormModal.classList.add('is-active');
        const closeModalButton = document.querySelector(`#close-modal-${articleId}`);
        closeModalButton.addEventListener('click', () => noteFormModal.classList.remove('is-active'));
    });
});

forEachOfClass('delete-note', button => {
    const noteId = button.dataset.noteid;
    const articleId = button.dataset.articleid;
    button.addEventListener('click', () =>  {
        console.log('clicked')
        axios.delete(`/notes/${noteId}`);
        document.querySelector(`#note-${noteId}`).remove();
        const notesSection = document.querySelector(`#notes-for-${articleId}`);
        notesSection.classList.toggle('hidden');
        const viewButton = document.querySelector(`#view-notes-for-${articleId}`);
        viewButton.setAttribute('disabled', true);
    });
});