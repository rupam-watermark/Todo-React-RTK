import { Card } from "@mui/material";
import "./App.css";
import TodoList from "./TodoList";

function App() {
  return (
    <div className="main">
      <Card
        sx={{
          display: "flex",
          width: "40%",
          alignItems: "center",
          minHeight: "300px",
          paddingBottom: "10px",
          flexDirection: "column",
        }}
      >
        <h1>Todos</h1>
        <TodoList />
      </Card>
    </div>
  );
}

export default App;
