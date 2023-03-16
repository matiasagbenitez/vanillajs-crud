import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./usecases/save-user";

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
    renderAddButton(element);
    renderModal(element, async (userLike) => {
        const user = await saveUser(userLike);
        usersStore.onUserChanged(user);
        renderTable(element);
    });

}