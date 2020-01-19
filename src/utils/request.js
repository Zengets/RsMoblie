let queryString = require('query-string');
import Storage from './storage'
import {
  Platform
} from 'react-native'

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
  return response.json()
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
        console.log(error);
        return "error"
      })
  } catch (e) {
    throw new Error('get error')
  }

}

async function post(url, body) {
  try {
    let Access_Token = await Storage.get('Access_Token');
    let fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Access_Token': Access_Token ? Access_Token : '',
        'Connection':"close",
        'UserAgent': os
      },
      body: JSON.stringify(body)
    }
    return fetch(url, fetchOptions)
      .then(checkStatus)
      .then(parseJSON)
      .catch(error => {
        console.log(error);
        return "error"
      })
  } catch (e) {
    throw new Error('get error')
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
      'Connection':"close",
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
      'Connection':"close",
      'Access_Token': Access_Token ? Access_Token : '',
      'UserAgent': os
    },
    body: JSON.stringify(body)
  }
  return fetch(url, fetchOptions)
    .then(checkStatus)
    .then(parseJSON)
}

async function uploadFile(url, params, fileUrl, fileName) {
  let Access_Token = await Storage.get('Access_Token');
  let data = new FormData();
  data.append('file', {
    uri: fileUrl,
    name: fileName,
    type: 'image/jpeg'
  });

  Object.keys(params).forEach((key) => {
    if (params[key] instanceof Date) {
      data.append(key, value.toISOString())
    } else {
      data.append(key, String(params[key]))
    }
  });
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Connection':"close",
      'Access_Token': Access_Token ? Access_Token : '',
      'UserAgent': os
    },
    body: data
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