
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import AuthGuard from "./Guards/PrivateGuard/PrivateGuards";
import PublicGuard from "./Guards/PublicGuard/PublicGuards"
import PrivateRoutes from './Guards/PrivateRoutes';
import PublicRoutes  from './Guards/PublicRoutes';
// import NotFound from './Component/NotFound'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AuthGuard path ={'/auth'} component={PrivateRoutes}/>
          <PublicGuard path={`/`} component={PublicRoutes}/>
          {/* <Route  component={NotFound}/> */}
        </Switch>
      </Router>
      {/* <Form/> */}
    </div>
  );
}

export default App;