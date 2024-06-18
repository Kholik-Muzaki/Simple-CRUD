import './App.css';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import UserDetail from './components/UserDetail';
import UserList from './components/UserList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserList />} />
        <Route path='/add' element={<AddUser />} />
        <Route path='/edit/:id' element={<EditUser />} />
        <Route path='/detail/:id' element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
