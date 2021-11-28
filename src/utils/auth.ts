// import store from 'storejs'

const TOKEN = "token"

export const remove_token = () => {
    // store.remove(TOKEN)
    sessionStorage.removeItem(TOKEN)
}

export const set_token = (token: String) => {
    // store.set(TOKEN, token)
    sessionStorage.setItem(TOKEN, token)
}

export const get_token = () => {
    // return store.get(TOKEN)
    return sessionStorage.getItem(TOKEN)
}