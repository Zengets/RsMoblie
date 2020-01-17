import setConfig from './ComponentsConfig';
import setTheme from './FoundationConfig'



export { default as Storage } from './storage'
export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export { setConfig,setTheme }

