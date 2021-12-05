import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import Main from "./screens/Main";
import WorkRegist from "./screens/WorkRegist";
import WorkList from "./screens/WorkList";
import WorkDetail from "./screens/WorkDetail";
import GroupList from "./screens/GroupList";
import GroupStatic from "./screens/GroupStatic";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import NotFound from "./screens/NotFound";


function App() {
  return (
    
     <Router>
            <Switch>

              <Route path={routes.main} exact>
                  <Main />
              </Route>

              <Route path={routes.workList} >
                  <WorkList />
              </Route>

              <Route path={routes.workRegist} >
                  <WorkRegist />
              </Route>

              <Route path={routes.work}>
                  <WorkDetail />
              </Route>

              <Route path={routes.signIn} >
                  <SignIn />
              </Route>

              <Route path={routes.signUp} >
                  <SignUp />
              </Route>

              <Route path={routes.groupList} >
                  <GroupList />
              </Route>

              <Route path={routes.groupStatic} >
                  <GroupStatic />
              </Route>

              <Route>
                  <NotFound />
              </Route>

            </Switch>
          </Router>



  );
}

export default App;
