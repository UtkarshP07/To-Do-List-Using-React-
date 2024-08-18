import React, { useState } from "react";

const tasks = [
  {
    id: "123",
    name: "Design a new UI for the dashboard",
    date: "20-7-2024",
    category: "Design",
    status: "Incomplete",
    description:
      "For your React to-do list app, you want to manage tasks that include a date. Here's how you might structure the date field and update it as needed.Task Structure You should decide on a date format that suits your needs. Common formats include:",
    notes: "Currently no notes",
  },
];

export default function App() {
  const [home, setHome] = useState(true);
  const [tasklist, setTaskList] = useState(false);
  const [onDetails, setOnDetails] = useState(false);
  const [newAdd, setNewAdd] = useState(false);

  const [tasksNew, setTasks] = useState(tasks);
  console.log(tasksNew);

  function handleAddTasks(task) {
    setTasks((tasksNew) => [...tasksNew, task]);
    setNewAdd(false);
  }

  function handleToggleHome() {
    if (home === false) setHome(true);
    setTaskList(false);
    setOnDetails(false);
  }

  function handleToggleTD() {
    if (onDetails === false) setOnDetails(true);
    setHome(false);
    setTaskList(false);
  }

  function handleToggleTL() {
    if (tasklist === false) setTaskList(true);
    setHome(false);
    setOnDetails(false);
  }

  return (
    <div className="app">
      <Header
        onToggleHome={handleToggleHome}
        onToggleTD={handleToggleTD}
        onToggleTL={handleToggleTL}
      />
      <div className="content">
        {home && (
          <Home onToggleTL={handleToggleTL} onAddTasks={handleAddTasks} />
        )}
        {tasklist && (
          <TaskList
            tasksNew={tasksNew}
            onAddTasks={handleAddTasks}
            newAdd={newAdd}
            setNewAdd={setNewAdd}
          />
        )}
        {onDetails && <TaskDetails tasksNew={tasksNew} />}
      </div>
      <Footer />
    </div>
  );
}

function Button({ onClick, children, style, className = "btn" }) {
  return (
    <button onClick={onClick} className={className} style={style}>
      {children}
    </button>
  );
}

function Header({ onToggleHome, onToggleTL, onToggleTD }) {
  return (
    <header className="black">
      <div className="logo-name" onClick={onToggleHome}>
        <img src="./logo-black.png" alt="Logo"></img>
        <h2>GeekyTasks</h2>
      </div>
      <div className="navigators">
        <p onClick={onToggleHome}>Home</p>
        <p onClick={onToggleTL}>Tasks-List</p>
        <p onClick={onToggleTD}>Task-Details</p>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="grey">
      <div className="©">
        <p>© 2023 GeekyTasks</p>
      </div>
      <div className="contact">
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Contact Us</p>
      </div>
    </footer>
  );
}

function Home({ onToggleTL, onAddTasks }) {
  const [newAdd, setNewAdd] = useState(false);
  return (
    <div className="home">
      {!newAdd ? (
        <>
          <h3>Welcome to GeekyTasks</h3>

          <p>
            GeekyTasks is your ultimate task management solution. Simplify your
            life by orgranizing your tasks with ease and efficiency.
          </p>

          <Button onClick={onToggleTL}>Start Adding Tasks</Button>
          <div className="add">
            <Button onClick={() => setNewAdd(true)} className="btn homeBtn">
              +
            </Button>
          </div>
        </>
      ) : (
        <AddTask onAddTasks={onAddTasks} />
      )}
    </div>
  );
}

function TaskList({ tasksNew, newAdd, onAddTasks, setNewAdd }) {
  return (
    <div className="task-list">
      {!newAdd && (
        <div>
          {tasksNew.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </div>
      )}
      {!newAdd && (
        <Button
          onClick={() => setNewAdd(true)}
          style={{ borderRadius: "50%", padding: "10px 16px " }}
        >
          +
        </Button>
      )}
      {newAdd && <AddTask onAddTasks={onAddTasks} />}
    </div>
  );
}

function Task({ task }) {
  return (
    <div className="task">
      <div className="details">
        <h4>{task.name}</h4>
        <p>Due : {task.date}</p>
        <p>Category : {task.category}</p>
      </div>
      <div className="classifiers">
        <Button style={{ backgroundColor: "rgb(1, 194, 1)", color: "white" }}>
          Complete
        </Button>
        <Button style={{ backgroundColor: "rgb(238, 11, 11)", color: "white" }}>
          Delete
        </Button>
      </div>
    </div>
  );
}

function TaskDetails({ tasksNew }) {
  return (
    <div className="taskdetails">
      {tasksNew.map((task) => (
        <DetailedTask task={task} key={task.id} />
      ))}
    </div>
  );
}

function DetailedTask({ task }) {
  return (
    <div className="detailedTask">
      <div className="taskHeader">
        <h3>Task Title: {task.name}</h3>
        <p>Description: {task.description}</p>
      </div>
      <div className="taskInfo">
        <div className="taskInfoItem">
          <h4>Due Date:</h4>
          <p>{task.date}</p>
        </div>
        <div className="taskInfoItem">
          <h4>Category:</h4>
          <p>{task.category}</p>
        </div>
      </div>
      <div className="taskNotes">
        <h4>Additional Notes:</h4>
        <p>{task.notes}</p>
      </div>
      <div className="taskActions">
        <Button>Edit task</Button>
        <Button style={{ backgroundColor: "rgb(1, 194, 1)", color: "white" }}>
          Mark as Completed
        </Button>
        <Button style={{ backgroundColor: "rgb(238, 11, 11)", color: "white" }}>
          Delete Task
        </Button>
      </div>
    </div>
  );
}

function AddTask({ onAddTasks }) {
  const [name, setName] = useState("");
  const [description, setNewDesc] = useState("");
  const [category, setNewCategory] = useState("");
  const [date, setNewDate] = useState(new Date());
  const [notes, setNewNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !date) return;

    const id = crypto.randomUUID();
    const newTaskTobeAdded = {
      id,
      name,
      date,
      category,
      status: "Incomplete",
      description,
      notes,
    };
    onAddTasks(newTaskTobeAdded);
    console.log(newTaskTobeAdded);
  }
  return (
    <form className="form-add-task" onSubmit={handleSubmit}>
      <div className="inp">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=" "
        />
        <label className="label">Task</label>
        <span className="focus-bg"></span>
      </div>
      <div className="inp">
        <textarea
          value={description}
          onChange={(e) => setNewDesc(e.target.value)}
          placeholder=" "
        ></textarea>
        <label className="label">Description</label>
        <span className="focus-bg"></span>
      </div>
      <div className="inp">
        <input
          type="text"
          value={category}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder=" "
        />
        <label className="label">Category</label>
        <span className="focus-bg"></span>
      </div>
      <div className="inp">
        <input
          type="date"
          value={date}
          onChange={(e) => setNewDate(e.target.value)}
          placeholder=" "
        />
        <label className="label">Due Date</label>
        <span className="focus-bg"></span>
      </div>
      <div className="inp">
        <input
          type="text"
          value={notes}
          onChange={(e) => setNewNotes(e.target.value)}
          placeholder=" "
        />
        <label className="label">Additional Notes</label>
        <span className="focus-bg"></span>
      </div>

      <Button style={{ width: "fit-content" }} onClick={handleSubmit}>
        ADD
      </Button>
    </form>
  );
}
