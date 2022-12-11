import React from 'react';
import './App.css';
// import Login from "./views/Login/Login";
import ToDoList from "./views/ToDoList/ToDoList";
import ReduxToDo from "./views/ReduxToDo/ReduxToDo";
function App() {
    return (
        <div className="App">
            <header className={"Home"}>
                <ReduxToDo />
                {/*<ToDoList />*/}
            </header>
        </div>
    );
}

export default App;
