import React, { useState, lazy, Suspense  } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
// import Details from "./Details"; - we'll lazy load this
// import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext";
import NavBar from "./NavBar";

// details is placeholder component that will not load this code until Details is to be rendered for the first time
// parcel splits this into a separate bundle
const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <NavBar />
        {/* The fallback will display until the route is loaded. */}
        <Suspense fallback={<h1>Loading route</h1>}>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
