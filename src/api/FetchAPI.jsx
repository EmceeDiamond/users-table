const fetchUsers = async () => {
    try {
		const response = await fetch('https://dummyjson.com/users')
		if (!response.ok) {
			throw new Error('Ошибка при загрузке пользователей')
		}
		const data = await response.json()
		return data.users
	} catch (error) {
		throw new Error('Ошибка при загрузке пользователей')
	}
}

const filterUsers = async (key, value) =>{
    try {
		const response = await fetch(`https://dummyjson.com/users/filter?key=${key}&value=${value}&limit=0`)
		if (!response.ok) {
			throw new Error('Пользователи не найдены')
		}
		const data = await response.json()
		return data.users
	} catch (error) {
		throw new Error('Пользователи не найдены')
	}
}

export  {fetchUsers, filterUsers}