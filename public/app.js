const forEachOfClass = (className, cb) => {
    Array.from(document.getElementsByClassName(className))
    .forEach(element => cb(element));
}

forEachOfClass('view-button', function(button) {
    const articleId = button.dataset.articleid;
    const notesSection = document.querySelector(`#notes-${articleId}`);
    if(notesSection) {
        button.addEventListener('click', () => notesSection.classList.toggle('hidden'));
    } else {
        button.setAttribute('disabled', true);
    }
})

// Array.from(document.getElementsByClassName('comment-button'))
// .forEach(commentButton => commentButton.addEventListener('click', function() {
//     const articleId = this.dataset.articleid;
//     const notesSection = document.querySelector(`#notes-${articleId}`);
//     if (notesSection) notesSection.classList.toggle('hidden');
// }));

