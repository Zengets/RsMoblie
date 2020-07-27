let queryString = require('query-string');
import Storage from './storage'
import {
  Platform
} from 'react-native'
import { OneToast } from '../components';
import * as RootNavigation from '../routes/RootNavigation';
import { AsyncStorage } from 'react-native'


function jumpurl(url) {
  AsyncStorage.clear().then(()=>{
    RootNavigation.navigate(url,{ reload: 'yes' });
  })
  return null
}


const os = Platform.OS;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}



function parseJSON(response) {
  let res = response.json()
  return res.then((data) => {
    switch (data.code) {
      case "0007":
        jumpurl("Login");
        break;
      case "0000":
        //成功
        break;   
      default:
        OneToast(data.msg, "rgba(254,162,0,0.6)")
        break
    }
    return data
  })
}


async function get(url, params) {
  if (params) {
    url += `?${queryString.stringify(params)}`
  }
  try {
    let headers = new Headers();
    let Access_Token = await Storage.get('Access_Token');
    if (Access_Token) {
      headers.append('Access_Token', Access_Token);
      headers.append('UserAgent', os);
      headers.append('Connection', "close");
    }
    return fetch(url, {
      headers: headers
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch(error => {
        console.log('get error')
      })
  } catch (e) {
    console.log('get error')
  }

}

async function post(url, body) {
  try {
    let Access_Token = await Storage.get('@MyApp_user'), TOKEN = "";
    if (Access_Token) {
      TOKEN = JSON.parse(Access_Token).token
    }
    let fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'token': TOKEN,
        'Connection': "close",
        'UserAgent': os
      },
      body: JSON.stringify(body)
    }
    return fetch(url, fetchOptions)
      .then(checkStatus)
      .then(parseJSON)
      .catch(error => {
        console.log('get error')
      })
  } catch (e) {
    console.log('get error')
  }
}

async function del(url, params) {
  if (params) {
    url += `?${queryString.stringify(params)}`
  }
  let Access_Token = await Storage.get('Access_Token');
  let fetchOptions = {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Connection': "close",
      'Access_Token': Access_Token ? Access_Token : '',
      'UserAgent': os
    }
  }
  return fetch(url, fetchOptions)
    .then(checkStatus)
    .then(parseJSON)
}

async function update(url, body) {
  let Access_Token = await Storage.get('Access_Token');
  let fetchOptions = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Connection': "close",
      'Access_Token': Access_Token ? Access_Token : '',
      'UserAgent': os
    },
    body: JSON.stringify(body)
  }
  return fetch(url, fetchOptions)
    .then(checkStatus)
    .then(parseJSON)
}

async function uploadFile(url, params) {
  let Access_Token = await Storage.get('@MyApp_user'), TOKEN = "";
  if (Access_Token) {
    TOKEN = JSON.parse(Access_Token).token
  }
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Connection': "close",
      'token': TOKEN,
      'UserAgent': os
    },
    body: params
  };
  return fetch(url, fetchOptions)
    .then(checkStatus)
    .then(parseJSON)
}

export {
  get,
  post,
  del,
  update,
  uploadFile
}