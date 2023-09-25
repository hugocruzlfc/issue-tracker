import { Route, Routes, Link, useMatch } from "react-router-dom";
import { AddIssue, Issues, IssueDetails } from "./pages";
import { FetchingIndicator } from "./components";

function App() {
  const isRootPath = useMatch({ path: "/", end: true });
  return (
    <div className="App">
      {!isRootPath ? (
        <Link to="/">Back to Issues List</Link>
      ) : (
        <span>&nbsp;</span>
      )}
      <h1>Issue Tracker</h1>
      <Routes>
        <Route
          path="/"
          element={<Issues />}
        />
        <Route
          path="/add"
          element={<AddIssue />}
        />
        <Route
          path="/issue/:issueNumber"
          element={<IssueDetails />}
        />
      </Routes>
      <FetchingIndicator />
    </div>
  );
}

export default App;
