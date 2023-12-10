import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Home from './pages/Home';
import AddDepartment from './departments/AddDepartment';
import EditDepartment from './departments/EditDepartment';
import ViewDepartment from './departments/ViewDepartment';
import AddEmployee from './employees/AddEmployee';
import EditEmployee from './employees/EditEmployee';
import ViewEmployee from './employees/ViewEmployee';




function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path='/' element={<Home/>}/>

          <Route exact path='/adddepartment' element={<AddDepartment/>}/>
          <Route exact path='/editdepartment/:id' element={<EditDepartment/>}/>
          <Route exact path='/viewdepartment/:id' element={<ViewDepartment/>}/>

          <Route exact path='/addemployee' element={<AddEmployee/>}/>
          <Route exact path='/editemployee/:id' element={<EditEmployee/>}/>
          <Route exact path='/viewemployee/:id' element={<ViewEmployee/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
