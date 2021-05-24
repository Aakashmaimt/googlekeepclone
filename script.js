const addButton = document.getElementById('addNote');

const updateLSData = () =>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    })

    localStorage.setItem('notes',JSON.stringify(notes));
}

const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = ` <div class="operation">
    <button class="edit"><i class="fa fa-edit fa-2x"></i></button>
    <button class="delete"><i class="fa fa-trash fa-2x"></i></button>
    </div>
    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class = "${text ? 'hidden' : ''}" ></textarea > `;

    note.insertAdjacentHTML('afterbegin', htmlData);

    // console.log(note);


    // getting the references

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting the note

    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    })

    //toggle using edit button

    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    //alredy there is a data
    textArea.value=text;
    mainDiv.innerHTML=text;

    textArea.addEventListener('change',(event)=>{
        // mainDiv.innerHTML=textArea.value;
        // or
        const value = event.target.value;
        mainDiv.innerHTML=value;

        updateLSData();
    })

    document.body.appendChild(note);

}

//getting data from local storage

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note)=>{
        addNewNote(note);
    })
}

addButton.addEventListener('click', () => addNewNote());