import './App.css';
import { useEffect, useState } from "react";
import {fetchUsers, filterUsers} from './api/FetchAPI'
import ModalUser from './components/ModalUser';

function App() {
  const [dataState, setDataState] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [modalUser, setModalUser] = useState({})
  const [dataFilter, setDataFilter] = useState({
    attribute:"",
    value: "",
  });
  const [flag, setFlag] = useState(null);

  const loadUsers = () => {
      fetchUsers().then(data =>{
        setDataState(data)
      })
  };

  useEffect(() => {
    loadUsers()
  }, [])


  useEffect(() => {
    filterUsers(dataFilter.attribute, dataFilter.value).then(data =>{
      setDataState(data)
    })
    setDataFilter("")
  }, [flag]);

  const handleInput = (e) => {
    var atr = document.getElementById("attribute").value;
    const value = e.target.value;
    setDataFilter({...dataFilter, value: value, attribute: atr});
}

const handleSubmit = async (e) => {
    e.preventDefault();
    setFlag(!flag)
    e.target.reset();
}

  const [sortedField, setSortedField] = useState(null);
  const [sort, setSort] = useState(0)
    if (sortedField !== null) {
        if (sort === 1){
            dataState.sort((a, b) => {
            if ((a[sortedField]) < (b[sortedField])) {
                return -1;
                
            }
            if ((a[sortedField]) > (b[sortedField])) {
                return 1;
            }
            return 0;
            });
          }
        else if (sort === 2){
            dataState.sort((a, b) => {
                if ((a[sortedField]) > (b[sortedField])) {
                    return -1;
                }
                if ((a[sortedField]) < (b[sortedField])) {
                    return 1;
                }
                return 0;
                });
        }
        else if(sort === 3){
          loadUsers();
          setSort(0);
          
        }
    }

    const openModal = (user) => {
      setModalUser(user);
      setModalActive(true);
    }
  return (
    <div>
      <div>
        <p>Выберите категорию поиска</p>
        <select id="attribute">
          <option value="lastName">Фамилия</option>
          <option value="firstName">Имя</option>
          <option value="maidenName">Отчество</option>
          <option value="age">Возраст</option>
          <option value="gender">Пол</option>
          <option value="phone">Номер телефона</option>
          <option value="city">Город</option>
          <option value="address">Улица</option>
        </select>
        <br/>
        <form onSubmit={handleSubmit}>
          <input className="search" onChange={handleInput} placeholder='Введите данные'/>
          <button>Поиск</button>
          <button onClick={loadUsers}>Сброс</button>
        </form>
        <table className='tb'>
          <thead>
            <tr>
              <th scope="col" onClick={() => {setSortedField('firstName'); setSort(sort + 1)}}>ФИО</th>
              <th scope="col" onClick={() => {setSortedField('age'); setSort(sort + 1)}}>Возраст</th>
              <th scope="col" onClick={() => {setSortedField('gender'); setSort(sort + 1)}}>Пол</th>
              <th scope="col">Номер телефона</th>
              <th scope="col" onClick={() => {setSortedField('address'); setSort(sort + 1)}}>Адрес</th>
            </tr>
          </thead>
          <tbody>
            {dataState!=null && dataState.map((item, index)=>(
              <tr key={index} onClick={() => openModal(item)}>
                <td >{item.firstName} {item.lastName} {item.maidenName}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.phone}</td>
                <td>{item.address.city} {item.address.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalUser active={modalActive} setActive={setModalActive} user={modalUser}/>
    </div>
  );
}

export default App;
