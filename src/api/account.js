import request from './request'

export const change_password = (old_password, new_password) => {
    return request({
        url: '/api/change-password',
        method: 'POST',
        data: {
            old_password,
            new_password
        }
    })
}