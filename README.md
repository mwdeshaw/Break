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
Break was designed and built over the course of five days. A proposal was drafted, which described the idea and the timeline for adding all of the features, from ui design to ball physics. The timeline was then systematically followed to create an aesthetic and functional app.

## The Technology
![game page](https://github.com/mwdeshaw/Break/blob/master/dist/style/gameStart.png)

### Frontend
Notable was built with vanilla Javascript. The user interface is created with pure HTML/CSS, while event listeners are used to make it interactive.


#### User Authentication and Session Management
Creating an account on Notable is quick and seamless, requiring only an email and a password. However, behind the scenes, many steps are taken to ensure protection of users and their credentials. Built-in Cross-site request forgery (CSRF) protection is also provided, protecting users from malicious attacks

Here is a snipped from the User model, where you could get a glimpse of some of these features:

```ruby
class User < ApplicationRecord
    attr_reader :password

    validates :email, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6, allow_nil: true }

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user
        user.is_password?(password) ? user : nil
    end
end
```

Note the use of BCrypt for password salting and hashing. Plain text passwords are never stored in the database. Instead, passwords only exist for a moment as instance variables, where they are then salted and hashed with 128-bit encryption.

#### Notebooks and Notes:
Notable is nothing without notes, and the relationship between users, notebooks, and notes is managed through database associations. Here is an example from the Note Model:

```javascript
class Note < ApplicationRecord
    validates :notebook_id, :author_id, :title, presence: true
    validates :body, presence: true, allow_blank: true

    belongs_to :user,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: :User

    belongs_to :notebook,
        primary_key: :id,
        foreign_key: :notebook_id,
        class_name: :Notebook
end
```

These associations are utilized in the controllers to tie users to notes and notes to notebooks, enabling proper functionality from the creation of notes for specific notebooks to deleting all notes for a single notebook if a notebook is deleted.

### Frontend

![signup](https://github.com/mwdeshaw/Notable/blob/master/read_me_images/Screen%20Shot%202019-07-12%20at%2012.20.54%20PM.png)

Notable's frontend was built using React-Redux. These choices allowed for a unidirectional dataflow and single-source of truth. With so many states to manage, like notes inside notebooks and both belonging to authors, redux enables proper state management. CSS was used for frontend styling.

#### Frontend Dependencies
Node package manager (npm) was used to install and save frontend dependencies, while webpack was used to bundle all the reqeuired JavaScript files and ensure correct loading order. JQuery was used to make AJAX requests to the backend rails API. Draft.js was used in the note show page, allowing for rich-text editing with a range of styles. Other frontend dependencies include React-DOM, React DOM-Router, Provider, and Babel.

#### Notebooks
Upon login or signup, the user is brought to the notebooks index, where they have the abililty to create, rename, or delete notebooks. When a user first signs up, a notebook is created automatically, so he or she can instantly get started.

![notebook index](https://github.com/mwdeshaw/Notable/blob/master/read_me_images/Screen%20Shot%202019-07-12%20at%2010.22.33%20AM.png)

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
