import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import Main from "./screens/Main";
import Prjtodo from "./screens/Prjtodo";
import NotFound from "./screens/NotFound";


function App() {
  return (
    
     <Router>
            <Switch>

              <Route path={routes.home} exact>
                  <Main />
              </Route>

              <Route path={routes.project} >
                  <Prjtodo />
              </Route>

              <Route>
                  <NotFound />
              </Route>

            </Switch>
          </Router>



  );
}

export default App;
