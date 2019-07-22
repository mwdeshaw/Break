# [Break!](https://mwdeshaw.github.io/Break/)

![splash page](https://github.com/mwdeshaw/Break/blob/master/dist/style/splash.png)

Break! is a frontend Javascript application that brings new meaning to the traditional coffee break. Break! puts you in control of a paddle, where you have three lives and one goal, to clear the entire area of blocks. Games are fast, but the gameplay is addictive. Do you have what it takes to Break! the cut?

## Features
Break! has many features, all of which contribute to a great user experience:

* #### Interactive user interface: Power up the ui and play the game with the press of a button. 
* #### Fast-paced fun: Single-level design with three lives. Lose all of your lives or win the game? Press start and play again.
* #### Real ball physics: The ball movement will keep you on your toes, guarenteed

## Requirements
* Node ```v10.13.1```

## Run Break! locally:
1. Clone github repo

2. Install the dependencies and packages:
  ```
  npm install
  ```
  
 3. Activate the webpack:
 ```
 npm start
 ```
 
4.  Open the index.html
  ```
  open index.html
  ```
  
 5. Start playing Break!
 
## About the Project
Break was designed and built over the course of five days. A proposal was drafted, which described the idea and the timeline for adding all of the features, from ui design to ball physics. The timeline was then systematically followed to create an aesthetic and functional app. The idea was based on a popular game I played during my childhood, Magic Ball, where the goal was to clear the entire area of blocks.

## The Technology
![game page](https://github.com/mwdeshaw/Break/blob/master/dist/style/gameStart.png)

### Frontend
Notable was built with vanilla Javascript. The user interface is created with pure HTML/CSS, while event listeners are used to make the ui come to life. 

#### User Interface
Break!'s user interface was created to reflect the purpose of the app, to play and to entertain! The design is based off Nintendo's Game Boy Advance. The ui is not only aesthetic, but also functional. One cannot play the game until he or she turns the interface on! The functionality of the interface was created using event listeners.

Here is some of the code that makes the user interface come to life: 

```javascript
    const defScreen = document.getElementById("default");
    const powerBtn = document.getElementById("power-btn");
    powerBtn.onclick = () => {
        defScreen.setAttribute("class", "active");
        const startScreen = document.getElementById('start-screen');
        startScreen.setAttribute("class", "active");

        const light = document.getElementById('power-lt');
        light.setAttribute("class", "active");

        const screenText = document.querySelector(".start-text");
        const instructions = document.querySelector(".instructions");
        const controlsList = document.querySelector(".controls-list");

        screenText.classList.add("end");
        const startBtn = document.getElementById("start-game");
        setTimeout(() => {
            const audio = document.getElementById("gameboySound");
            audio.currentTime = 0;
            audio.play();
            instructions.classList.add("end");
            controlsList.classList.add("end");
            startBtn.setAttribute("class", "active");
        }, 3000);

        startBtn.onclick = () => {
            startScreen.removeAttribute("class");
            instructions.classList.remove("end");
            controlsList.classList.remove("end");
            screenText.classList.remove("end");
            const canvas = document.getElementById("board");
            const ctx = canvas.getContext("2d");
            const game = new Game(ctx);
            new GView(game).start();
        };

```
Note the numerous event listeners. The order, and functions including setTimeout() ensure one can only play the game after the ui is "fired-up." The event listeners also give the ability to start a new game every time the start button is pressed.

#### Gameplay Physics:

picture

Physics drove the creation of the ball and its functionality, from spin and rotation, to direction vectors. Some of the code that allowed for the ball's realistic behavior is here:

```javascript
    constructor(pos) {
        super(pos, { x: 0, y: 0 }, BALL_RADIUS);
        this.dir = { x: 0, y: 0 }
        this.spinSpeed = Math.random() * 60 + 30;
        this.initialFlag = false;
    };
end
```

The ball's initial velocity and direction were placed at { x: 0, y: 0 }, so it would not move until the force of the player acted on it by means of the spacebar. Spin was achieved through this.spinSpeed, and this spin was important in determining the ball's rotation:

```javascript
    rotate(deltaTime) {
        if (this.dir.y !== 0) {
            let angle = -this.spinSpeed * (Math.PI / 180) * deltaTime;
            let vector = [this.dir.x, this.dir.y];

            var cos = Math.cos(angle);
            var sin = Math.sin(angle);

            this.dir.x = Math.round(10000 * (vector[0] * cos - vector[1] * sin)) / 10000;
            this.dir.y = Math.round(10000 * (vector[0] * sin + vector[1] * cos)) / 10000;
        }
    }
```

Another interting element of the ball is that it moves with the player until the spacebar is pressed. This functionality parallels that of Magic Ball, Break!'s predecessor. This functionality was achieved through the creation of an initial flag in the constructor, and key handling logic:

```javascript
    handleBallRelease(input, key) {
        if (!this.initialFlag && key !== "space") {
            this.vel.x += input[0];
            this.vel.y += input[1];
        } else if (key === "space" && this.dir.x === 0 && this.dir.y === 0) {
            this.vel.x += input[0];
            this.vel.y += input[1];
            this.initialRotation();

        }
    };
```

The above conditionals ensure that one has no control of the ball (with the a and d keys) after the spacebar is pressed and the ball is released.

### Collision Logic

![signup](https://github.com/mwdeshaw/Notable/blob/master/read_me_images/Screen%20Shot%202019-07-12%20at%2012.20.54%20PM.png)

To create this page, an HTML table was employed, allowing for orangization, responsivness, and hover effects:

```javascript
                <table className='notebooks-table'>
                    <thead className='top-table-row'>
                        <tr>
                            <th></th>
                            <th>TITLE</th>
                            <th>CREATED BY</th>
                            <th>UPDATED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className='notebooks-table-body'>
                         {notebookList}
                    </tbody>
                </table>
            </div> 
```
            
A single notebook index item looks like this:

```javascript
        <tr onClick={this.state.openedActions ? this.closeActionsView : null}>
                <th></th>
                <th onClick={this.handleShowRedirect}><i className="fas fa-book"></i>&#160;&#160;&#160;<Link to={`/notebooks/${notebook.id}`}>{notebook.title}</Link></th>
                <th onClick={this.handleShowRedirect}>{author.slice(0, this.sliceIdx(author))}</th>
                <th onClick={this.handleShowRedirect}>{date}</th>
                <th>{this.state.openedActions ? detailedActionsView() : basicActionsView()}</th>
        </tr>
```
Creating and editing notebooks is achieved through modals, which are stored in the ```ui``` slice of state

The notebook search bar is functional and employs an autocomplete search algorithm based on the trie tree, which searches notebooks by title. I used this [tutorial](https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/trie/Trie.js) for guidance.

Finally, notebooks could be directly navigated to from anywhere in the application. The sidebar has a notebooks drop-down that brings the user to a notebook's show page on click:

![notebook index dropdown](https://github.com/mwdeshaw/Notable/blob/master/read_me_images/Screen%20Shot%202019-07-12%20at%2012.08.14%20PM.png)

#### Notes

![notes index](https://github.com/mwdeshaw/Notable/blob/master/read_me_images/Screen%20Shot%202019-07-12%20at%2012.13.35%20PM.png)

Note creation is handled with a green button in the sidebar, just like Evernote. The logic of the button ensures that notes can be created from anywhere in the app depending on the user's current pathname. If the user does not have any notebooks, it will automatically create one, preventing any errors pertaining to notes without notebooks from appearing. The default note created has the title of "Untitled" and a blank body.

```javascript
    handleNoteCreation(e) {
        e.preventDefault();
        const latestNotebook = this.props.notebooks[0];
        
        if (latestNotebook === undefined) {
            this.props.createNotebook({ title: "A blank notebook for you: please add notes", author_id: this.props.currentUser.id })
        }
        else if (this.props.location.pathname.slice(0, 6) === `/notes`) {
            this.props.createNote({ title: "Untitled", body: "", author_id: this.props.currentUser.id, notebook_id: latestNotebook.id});
        } else if (this.props.location.pathname === '/notebooks') {
            this.props.history.push(`/notebooks/${latestNotebook.id}`)
            this.props.createNote({ title: "Untitled", body: "", author_id: this.props.currentUser.id, notebook_id: latestNotebook.id });
        } else {
            this.props.createNote({ title: "Untitled", body: "", author_id: this.props.currentUser.id, notebook_id:     this.props.match.params.notebookId })
                .then(() => {
                    this.props.history.push(`/notebooks/${this.props.match.params.notebookId}/notes/${this.props.lastNote.id}`)
                    this.updateComponent
                });
        } 
    };
```

Notes are stored in notebooks and like those on Evernote, they are in a perpetual state of edit. Upon entering either a notebook or the notes index, the most recently updated note is mounted and ready for editing. This mounting is done in the notes index by means of this code:

```javascript
    componentDidMount() {
        this.props.fetchNotes()
            .then(() => {
                if (this.props.notes.length !== 0) {
                    this.props.history.push(`/notes/${this.props.notes[0].id}`)
                    this.props.openModal(`nbNotesUpdate,${this.props.notes[0].id},${this.props.notes[0].notebook_id}`)
                }
            });
    };
```

Notes can be edited by means of a rich-text editor. The Draft.js rich-text editor framework was used to construct the editor. Along with the inline styles that came from RichUtils, a custom style map was used to add the custom strikethrough and highlight methods. 

![text editor image](https://github.com/mwdeshaw/Notable/blob/master/read_me_images/Screen%20Shot%202019-07-12%20at%2012.27.03%20PM.png)

Upon mounting the note, a setInternal() function activates an autosave feature for notes, which enables autosaving as a user types. This function checks a note's content before firing, to ensure that it does not save when it does not have to. This function is called like so:

```javascript
    constructor(props) {
        super(props)
        this.intervalId = setInterval(() => { this.autoSave() }, 5000) 
    }
       
     componentDidMount() {
        this.props.fetchNotebook(this.props.notebookId);
        this.convertForEditing(this.props.note);
        this.intervalId;
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
```

A variable is used to save this function as an id, because componentWillUnmount() is used to call clearInterval() to stop the autosaving process once a note is unmounted.

Finally, like Evernote, one can seemlessly switch between notes quickly. This rapid dismounting and mounting is done through modals. Each note view/edit page is a modal. The logic that allows for this toggling is based on comparing the parent path, which includes the previous note id, to the child path, the current note id:

```javascript
handleModalSwitch(e) {   
        e.preventDefault();
        this.props.parentPath !== this.props.childPath ?
            this.props.fetchNote(this.props.note.id)
                .then(() => {
                    this.props.closeModal()
                    this.props.openModal(`nbNotesUpdate,${(this.props.note.id).toString()},${(this.props.note.notebook_id).toString()}`)
            }) : null
    }
```

## Future Directions
* Get the note search bar to work so one can search for notes by title
* Implement a tags feature for notes, allowing for grouping, filtering, and searching notes
* Implement a collaborators feature, allowing for shared notebooks
