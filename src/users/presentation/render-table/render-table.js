import './render-table.css';
import usersStore from '../../store/users-store.js';
import { showModal } from '../render-modal/render-modal';
import { deleteUserById } from '../../usecases/delete-user-by-id';

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');

    tableHeaders.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        <tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);
    return table;
}

const tableSelectListener = (event) => {
    const target = event.target;
    if (target.classList.contains('select-user')) {
        const id = target.dataset.id;
        showModal(id);
    }
}

const tableDeleteListener = async (event) => {
    const target = event.target;
    if (target.classList.contains('delete-user')) {
        const id = target.dataset.id;
        try {
            await deleteUserById(id);
            await usersStore.reloadPage();
            document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
            renderTable();
        } catch (error) {
            console.log(error);
            alert('No se pudo eliminar el usuario!');
        }
    }
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {

    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);
        
        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }

    let tableHTML = '';
    users.forEach(user => {
        tableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.balance}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.isActive}</td>
                <td>
                    <a href="#" class="select-user" data-id="${user.id}">Select</a>
                    |
                    <a href="#" class="delete-user" data-id="${user.id}">Delete</a>
                </td>
            </tr>
        `;
    });

    table.querySelector('tbody').innerHTML = tableHTML;
}