import { User } from '../models/user.js'
import { userModalToLocalhost } from '../mappers/user-to-localhost.mapper.js'

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {

    const user = new User(userLike);

    if (!user.firstName || !user.lastName || !user.balance) {
        throw 'Faltan datos';
    }

    const userToSave = userModalToLocalhost(user);

    if (user.id) {
        throw 'No implementado';
    } 

    const updatedUser = await createUser(userToSave);
    return updatedUser;

}

/**
 *  
 * @param {Like<User>} user
 */
const createUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const newUser = await res.json();
    console.log({newUser});
    return newUser;
}