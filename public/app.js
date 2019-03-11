/********************************************************************************************
*                      Front-End Javascript for Tucson FoodScraper                          *
********************************************************************************************/

//A helper method for running a function on each item with a certain class:
const forEachOfClass = (className, cb) => {
    Array.from(document.getElementsByClassName(className))
    .forEach(element => cb(element));
}

//For each view button...
forEachOfClass('view-button', (button) => {
    //Get the matching article:
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

//For each comment button:
forEachOfClass('comment-button', button => {
    //Get the matching article:
    const articleId = button.dataset.articleid;
    //Wait for a click:
    button.addEventListener('click', () => {
        //Find the appropriate modal and display it:
        const noteFormModal = document.querySelector(`#modal-${articleId}`);
        noteFormModal.classList.add('is-active');
        //Enable the close modal button:
        const closeModalButton = document.querySelector(`#close-modal-${articleId}`);
        closeModalButton.addEventListener('click', () => noteFormModal.classList.remove('is-active'));
    });
});

//For each delete button:
forEachOfClass('delete-note', button => {
    //Get the appropriate note and article:
    const noteId = button.dataset.noteid;
    const articleId = button.dataset.articleid;
    //Wait for a click:
    button.addEventListener('click', () =>  {
        //Delete the note:
        axios.delete(`/notes/${noteId}`);
        document.querySelector(`#note-${noteId}`).remove();
        //Find the notes section:
        const notesSection = document.querySelector(`#notes-for-${articleId}`);
        //If it's now empty:
        if(notesSection.children.length === 0) {
            //Hide it and disable the view button:
            notesSection.classList.toggle('hidden');
            const viewButton = document.querySelector(`#view-notes-for-${articleId}`);
            viewButton.setAttribute('disabled', true);
        }
    });
});