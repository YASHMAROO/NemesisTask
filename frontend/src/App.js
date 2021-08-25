import './App.css';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Login from './components/Login';
import Details from './components/Details';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/login' exact component={Login} />
          <Route path='/screen2' exact component={Details} />
          <Route path='/screen2/details_table' exact component={Table} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
