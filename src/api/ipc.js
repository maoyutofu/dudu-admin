import request from './request'

export const get_ipc_list = (page, rows, keyword) => {
    return request({
        url: '/api/ipcs?page=' + page + "&rows=" + rows + (keyword ? '&keyword=' + keyword : ''),
        method: 'GET',
    })
}

export const get_ipc = (id) => {
    return request({
        url: '/api/ipc/' + id,
        method: 'GET',
    })
}

export const ipc_start = (id) => {
    return request({
        url: '/api/ipc/' + id + '/start',
        method: 'GET',
    })
}

export const ipc_stop = (id) => {
    return request({
        url: '/api/ipc/' + id + '/stop',
        method: 'GET',
    })
}

export const ipc_add = (form) => {
    return request({
        url: '/api/ipc',
        method: 'POST',
        data: {
            "key": form.key,
            "name": form.name,
            "rtsp": form.rtsp,
            "rtmp": form.rtmp
        }
    })
}

export const ipc_update = (form) => {
    return request({
        url: '/api/ipc',
        method: 'PUT',
        data: {
            "id": form.id,
            "key": form.key,
            "name": form.name,
            "rtsp": form.rtsp,
            "rtmp": form.rtmp
        }
    })
}

export const ipc_remove = (id) => {
    return request({
        url: '/api/ipc/' + id,
        method: 'DELETE',
    })
}


export const get_ipcs_num = () => {
    return request({
        url: '/api/ipcs/num',
        method: 'GET',
    })
}

export const gen_key = () => {
    return request({
        url: '/api/ipc/key/gen',
        method: 'GET',
    })
}