import Modal from "./Modal";


export default function ModalUser({active, setActive, user, city, address}){
    return(
        <Modal active={active} setActive={setActive}>
            <ul>
                <li>
                    <b>ФИО: </b>
                    {user.firstName} {user.lastName}
                </li>

                <li>
                    <b>Возраст: </b>
                    {user.age} лет
                </li>

                <li>
                    <b>Адрес: </b>
                    {city}, {address}
                </li>

                <li>
                    <b>Рост: </b>
                    {user.height} см
                </li>

                <li>
                    <b>Вес: </b>
                    {user.weight} кг 
                </li>

                <li>
                    <b>Номер телефона: </b>
                    {user.phone}  
                </li>
                
                <li>
                    <b>Email-адрес: </b>
                    {user.email} 
                </li>
                
            </ul>
        </Modal>
    )
}