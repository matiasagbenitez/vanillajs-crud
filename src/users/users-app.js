import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp = async (element) => {
    
    await usersStore.loadNextPage();

    // const users = usersStore.getUsers();
    // console.log(users);

    renderTable(element);
    renderButtons(element);
}