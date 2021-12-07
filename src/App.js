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

    const isLoggedIn = false;

  return (
    
     <Router>
            <Switch>

              <Route path={routes.main} exact>
              {isLoggedIn ? (
                <Main />
              ) : (
                <SignIn />
              )}
                  
              </Route>

              <Route path={routes.workList} >
              {isLoggedIn ? (
                <WorkList />
              ) : (
                <SignIn />
              )}

              </Route>

              <Route path={routes.workRegist} >
              {isLoggedIn ? (
                <WorkRegist />
              ) : (
                <SignIn />
              )}

              </Route>

              <Route path={routes.work}>
              {isLoggedIn ? (
                <WorkDetail />
              ) : (
                <SignIn />
              )}
              </Route>

              <Route path={routes.groupList} >
              {isLoggedIn ? (
                <GroupList />
              ) : (
                <SignIn />
              )}

              </Route>

              <Route path={routes.groupStatic} >
              {isLoggedIn ? (
                <GroupStatic />
              ) : (
                <SignIn />
              )}
                  
              </Route>

              <Route path={routes.signIn} >
                  <SignIn />
              </Route>

              <Route path={routes.signUp} >
                  <SignUp />
              </Route>

              <Route>
                  <NotFound />
              </Route>

            </Switch>
          </Router>



  );
}

export default App;
