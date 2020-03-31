import RNFetchBlob from 'rn-fetch-blob';
import {OneToast} from '../components'


let downloadFile = (formUrl,fn) => {
    RNFetchBlob.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache : true,
    })
    .fetch('GET', formUrl, {
      //some headers ..
    })
    .then((res) => {
      // the temp file path
      OneToast("文件已保存至"+res.path())
    })

}


export {downloadFile}