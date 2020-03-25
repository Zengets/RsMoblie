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
import { downloadFile } from './Fs'
 
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

let ipandport = 'http://172.21.3.137:8607' //liziyuan  'http://172.21.3.137:8607' //xiangzige 

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
    ipandport,
    ConvertPinyin,
    getItem,
    getQueryString,
    downloadFile
}

