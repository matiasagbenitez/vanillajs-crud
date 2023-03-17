import { User } from '../models/user.js'
import { userModalToLocalhost } from '../mappers/user-to-localhost.mapper.js'
import { localhostUserToModel } from '../mappers/localhost-user.mapper.js';

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {

    const user = new User(userLike);
    if (!user.firstName || !user.lastName || !user.balance) throw 'Faltan datos';

    const userToSave = userModalToLocalhost(user);
    let userUpdated;

    
    if (user.id) { 
        userUpdated = await updateUser(userToSave);
    } else {
        userUpdated = await createUser(userToSave);
    }

    return localhostUserToModel(userUpdated);
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

/**
 *  
 * @param {Like<User>} user
 */
const updateUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const updatedUser = await res.json();
    console.log({updatedUser});
    return updatedUser;
}