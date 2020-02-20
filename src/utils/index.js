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
    ConvertPinyin

}

