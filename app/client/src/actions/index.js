import unsplash from '../components/images/Unsplash'

export const addDiy = (diy) => ({ type: "ADDED_DIY", payload: diy });
export const removeDiy = (diys) => ({ type: "REMOVE_DIY", payload: diys });
export const editDiy = (diy) => ({ type: "EDIT_DIY", payload: diy });
export const retreiveDiys = (diys) => ({ type: "GOT_DIYS", payload: diys })
export const addTool = (tool) => ({ type: "ADDED_TOOL", payload: tool });
export const setTools = (tools) => ({ type: "GOT_TOOLS", payload: tools })
export const setUsers = (users) => ({ type: "GOT_USERS", payload: users })
export const addUser = (user) => ({ type: "ADDED_USER", payload: user });
export const currentUser = (user) => ({ type: "CURRENT_USER", payload: user })
export const obtainDiy = (diy) => ({ type: "SHOW_DIY", payload: diy })
export const diyImages = (images) => ({ type: 'DIY_IMAGES', payload: images })

//all diys
export const getDiys = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true })
    fetch('/diys')
      .then(res => {
        if (!res.ok) {
          throw dispatch({ type: "ERROR", payload: 'could not fetch the data for that resource' })
        }
        return res.json();
      })
      .then(data => {
        dispatch(retreiveDiys(data))
        dispatch(promiseAllImages(data))
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: null })
      })
      .catch(err => {
        // auto catches network / connection error
        dispatch({ type: "LOADING", payload: false })
        // setError(err.message);
        dispatch({ type: "ERROR", payload: err.message })

      })
  }
}
//one diy
export const getDiy = (id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true })
    fetch(`/diys/${id}`)
      .then(res => {
        if (!res.ok) {
          throw dispatch({ type: "ERROR", payload: 'could not fetch the data for that resource' })
        }
        return res.json();
      })
      .then(data => {

        dispatch(obtainDiy(data))
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: null })
      })
      .catch(err => {
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: err.message })

      })
  }
}
export const patchDiy = (diy,id) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true })
    const configObj = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ diy })
    }
    fetch(`/diys/${id}`, configObj)
      .then(res => {
        if (!res.ok) {
          throw dispatch({ type: "ERROR", payload: 'could not fetch the data for that resource' })
        }
        return res.json();
      })
      .then(data => {
        dispatch(editDiy(data))
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: null })
      })
      .catch(err => {
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: err.message })

      })
  }
}
export const deleteDiy = (id,diys) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true })
    const configObj = {
      method: 'DELETE'
    }
    fetch(`/diys/${id}`, configObj)
      .then(res => {
        if (!res.ok) {
          throw dispatch({ type: "ERROR", payload: 'could not fetch the data for that resource' })
        }
        return res.json();
      })
      .then(data => {
        
        // let removedDiyArray =diys.filter(d=>d.id!==id)
        // console.log(removedDiyArray)
        // dispatch(removeDiy(removedDiyArray))
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: null })
      })
      .catch(err => {
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: err.message })

      })
  }
}

export const searchImage = async (term) => {
  const response = await unsplash.get('/search/photos', {
    params: { query: term },
  })
  return response.data.results[0].urls.regular
}

export const ImageArray = (diys) => {
  return diys.map(d => searchImage(d.title))
}

export const promiseAllImages = (diys) => {
  return (dispatch) => {
    Promise.all(ImageArray(diys)).then(results => {
      dispatch(diyImages(results))
    })
  }
}
//make diy
export const createDiy = (diy,diys) => {
  console.log('createDiy',diy)
  // send a fetch request 
  console.log('fetch diy:',diy)
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true })
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ diy })
    }
    fetch('/diys', configObj)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw dispatch({ type: "ERROR", payload: 'could not fetch the data for that resource' })
          // Error('could not fetch the data for that resource');
        }
        return res.json()
      })
      .then(data => {
        dispatch(addDiy(data))
        dispatch(promiseAllImages(diys))

        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: null })

      }).catch(err => {
        // auto catches network / connection error

        dispatch({ type: "LOADING", payload: false })
        // setError(err.message);
        dispatch({ type: "ERROR", payload: err.message })

      })
  }
}

//make user
export const createUser = (user) => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true })
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        "credentials": "include"
      },
      body: JSON.stringify({ user })
    }
    fetch('/users', configObj)
      .then(res => {
        if (!res.ok) {
          throw dispatch({ type: "ERROR", payload: 'could not fetch the data for that resource' })
        }
        return res.json()
      })
      .then(data => {
        dispatch(addUser(data))
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: null })
      }).catch(err => {
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: err.message })

      })
  }
}


export const fetchUser = (user) => {

  // send a fetch request 
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true })
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        "credentials": "include"
      },
      body: JSON.stringify(user)
    }
    fetch('/login', configObj)
      .then(res => {
        if (!res.ok) {
          throw dispatch({ type: "ERROR", payload: 'could not fetch the data for that resource' })
        }
        return res.json()
      })
      .then(data => {
        dispatch({ type: "LOADING", payload: false })
        dispatch(currentUser({ user: data }))
        dispatch({ type: "ERROR", payload: null })

      }).catch(err => {
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: err.message })

      })
  }
}

export const getTools = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING", payload: true })
    fetch('/tools')
      .then(res => {
        if (!res.ok) {
          throw dispatch({ type: "ERROR", payload: 'could not fetch the data for that resource' })
        }
        return res.json();
      })
      .then(data => {

        dispatch(setTools(data))
        dispatch({ type: "ERROR", payload: null })
      })
      .catch(err => {
        dispatch({ type: "LOADING", payload: false })
        dispatch({ type: "ERROR", payload: err.message })

      })
  }
}

