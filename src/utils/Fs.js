import RNFetchBlob from 'rn-fetch-blob';
import { OneToast } from '../components'
import moment from 'moment';
//http://view.xdocin.com/xdoc?_xdoc= 重新install 需要修改

let downloadFile = (formUrl, fn) => {
  const { config, fs } = RNFetchBlob;
  const downloads = fs.dirs.DownloadDir;
  let urllist = formUrl.split("."),mainstr="";
  if(urllist.length>0){
    mainstr = urllist[urllist.length-1]
  }else{

  }
  return config({
    fileCache: true,
    addAndroidDownloads : {
      useDownloadManager : true,
      notification : false,
      path:  downloads + '/' + moment().valueOf() + '.' + mainstr,
    }
  })
    .fetch('GET', formUrl, {
      //some headers ..
    })
    .then((res) => {
      OneToast("文件已保存至" + res.path())
      fn?fn(res.path()):null
    }).catch(() => {
      OneToast("文件保存失败")
    })

}


export { downloadFile }