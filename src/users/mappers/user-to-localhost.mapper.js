import { User } from '../models/user.js';

/**
 * 
 * @param {User} user 
 */
export const userModalToLocalhost = (user) => {
    const {
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName,
    } = user;

    return {
        avatar,
        balance,
        first_name: firstName,
        gender,
        id,
        isActive,
        last_name: lastName,
    };
    
};