import { loadUsersByPage } from "../usecases/load-users-by-page"

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    await loadUsersByPage(state.currentPage + 1);
}

const loadPreviousPage = async() => {
    throw new Error('Not implemented')
}

// TODO: implementear
const onUserChanged = () => {
    throw new Error('Not implemented')
}

const reloadPage = async() => {
    throw new Error('Not implemented')
}

export default {    
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage,
}