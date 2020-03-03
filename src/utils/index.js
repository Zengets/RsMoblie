import setConfig from './ComponentsConfig';
import setTheme from './FoundationConfig'
import {
    get,
    post,
    del,
    update,
    uploadFile
} from './request'
import colors from './ThemeColor';
import { ConvertPinyin } from './ConvertPinyin'

let getItem = (mainname, name, data) => {
    let curitem = {}, thisitem = {};
    data.map((item, i) => {
        if (item.name == mainname) {
            curitem = item
        }
    })
    if (curitem.routes) {
        curitem.routes.map((item) => {
            if (item.name == name) {
                thisitem = item
            }
        })
    }

    return thisitem
}

let getQueryString = (name,location) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let search = location.split("?")[1];   
    let r = search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}



export { default as Storage } from './storage'
export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export {
    setConfig,
    setTheme,
    colors,
    get,
    post,
    del,
    update,
    uploadFile,
    ConvertPinyin,
    getItem,
    getQueryString
}

