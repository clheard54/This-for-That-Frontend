const API_ROOT = "http://localhost:3000/api/v1"

const userToken = () => localStorage.getItem("userToken");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: userToken()
  };
};

const login = data => {
  return fetch(`${API_ROOT}/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data)
  }).then(res => res.json());
};

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
      headers: headers()
    }).then(res => {
      return res.json();
    });
  };

const createUser = (data) => {
  return fetch(`${API_ROOT}/signup`, {
    method: "POST",
    headers: {      
      "Content-Type": "application/json",
      Accept: "application/json"
      },
    body: JSON.stringify({user: data})
  }).then(res => res.json())
};

const getFavorites = () => {
  return fetch(`${API_ROOT}/favorites`, {
    headers: headers()
  }).then(res => res.json())
};

const getMessages = () => {
  return fetch(`${API_ROOT}/messages`, {
    headers: headers()
  }).then(res => res.json())
};


const getItems = () => {
  return fetch(`${API_ROOT}/items`, {
    headers: headers()
  }).then(res => res.json())
};


const getServices = () => {
  return fetch(`${API_ROOT}/services`, {
    headers: headers()
  }).then(res => res.json())
};

const getTags = () => {
  return fetch(`${API_ROOT}/tags`, {
    headers: headers()
  }).then(res => res.json())
};

const postItem = (formData) => {
  return fetch(`${API_ROOT}/items`, {
    method: 'POST',
    headers: {
      Authorization: userToken()
    },
    body: formData
  }).then(res => res.json())
}

const editItem = (formData, id) => {
  return fetch(`${API_ROOT}/items/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: userToken()
    },
    body: formData
  }).then(res => res.json())
}

const editService= (formData, id) => {
  return fetch(`${API_ROOT}/services/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: userToken()
    },
    body: formData
  }).then(res => res.json())
}

const postService = (newService) => {
  return fetch(`${API_ROOT}/services`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      Authorization: userToken()
    },
    body: newService
  }).then(res => res.json())
}

const postMessage = (newMessage) => {
  return fetch(`${API_ROOT}/messages`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(newMessage)
  }).then(res => res.json())
}

const postTagOffering = (tag, typeOf, item) => {
  let tag_id
  fetch(`{API_ROOT}/tags`).then(resp => resp.json())
  .then(data => {
    tag_id = data.find(x => x.category == tag)
    console.log(tag_id)
  })
  return fetch(`${API_ROOT}/tags_offerings`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({tag_id: tag.id, offering_type: typeOf, offering_id: item.id})
  }).then(res => res.json())
}

const postFavorite = (newFave) => {
  return fetch(`${API_ROOT}/favorites`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(newFave)
  }).then(res => res.json())
}

const getOwner = () => {
  return fetch(`${API_ROOT}/users`, {
    headers: headers()
    }).then(res => res.json())
}

const deleteFavorite = (id) => {
  return fetch(`${API_ROOT}/favorites/${id}`, {
    method: 'DELETE',
    headers: headers()
    }).then(res => res.json())
}

const deleteItem = (id) => {
  return fetch(`${API_ROOT}/items/${id}`, {
    method: 'DELETE',
    headers: headers()
    }).then(res => res.json())
}

const deleteService = (id) => {
  return fetch(`${API_ROOT}/services/${id}`, {
    method: 'DELETE',
    headers: headers()
    }).then(res => res.json())
}


export const api = {
  auth: {
    login,
    getCurrentUser,
    createUser
  },
  getRequests: {
    getFavorites,
    getMessages,
    getItems,
    getServices,
    getTags,
    getOwner
  },
  posts: {
    postItem,
    postService,
    postMessage,
    postFavorite,
    postTagOffering
  },
  delete: {
    deleteFavorite,
    deleteItem,
    deleteService
  },
  update: {
    editItem,
    editService
  }
};