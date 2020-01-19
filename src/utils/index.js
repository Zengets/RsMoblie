import setConfig from './ComponentsConfig';
import setTheme from './FoundationConfig'
import {
    get,
    post,
    del,
    update,
    uploadFile
} from './request'


export { default as Storage } from './storage'
export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export {
    setConfig, setTheme, 
    get,
    post,
    del,
    update,
    uploadFile
}

