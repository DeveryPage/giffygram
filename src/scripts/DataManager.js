let loggedInUser = {}

export const logoutUser = () => {
  loggedInUser = {}
}



export const getUsers = () => {

    return fetch("http://localhost:8088/users")
    .then(response => response.json())
    .then(parsedResponse => {
        // do something with response here
        return parsedResponse;
    })
}


export const getLoggedInUser = () => {
	return loggedInUser;
}

export const setLoggedInUser = (userObj) => {
  loggedInUser = userObj;
}


// export const getDadJoke = () => {

//     return fetch("https://icanhazdadjoke.com/")
//     .then(response => response.json())
//     .then(parsedResponse => {
//         // do something with response here
//         return parsedResponse;
//     })
// }

export const createPost = postObj => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
  
    })
        .then(response => response.json())
  }
  
// updating post
  export const updatePost = postObj => {
    return fetch(`http://localhost:8088/posts/${postObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
  
    })
        .then(response => response.json())
        
  }

// DELETE
  export const deletePost = postId => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
  
    })
        .then(response => response.json())
        .then(getPosts)
  }
  


let postCollection = [];

export const usePostCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //The spread operator makes this quick work
  return [...postCollection];
}
// export const getPosts = () => {
//   return fetch("http://localhost:8088/posts")
//     .then(response => response.json())
//     .then(parsedResponse => {
//       postCollection = parsedResponse
//       return parsedResponse;
//     })
// }

export const getPosts = () => {
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("data with user", parsedResponse)
      postCollection = parsedResponse
      return parsedResponse;
    })
}



export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`)
      .then(response => response.json())
  }
  
  
  
  
  getUsers()
  .then(data => {
    console.log("User Data", data)
  })
  
  
  
    export const loginUser = (userObj) => {
      return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
      .then(response => response.json())
      .then(parsedUser => {
        //is there a user?
        console.log("parsedUser", parsedUser) //data is returned as an array
        if (parsedUser.length > 0){
          setLoggedInUser(parsedUser[0]);
          return getLoggedInUser();
        }else {
          //no user
          return false;
        }
      })
    }
  

    export const registerUser = (userObj) => {
      return fetch(`http://localhost:8088/users`, {
        method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(userObj)
      })
      .then(response => response.json())
      .then(parsedUser => {
        setLoggedInUser(parsedUser);
        return getLoggedInUser();
      })
    }

    export const postLike = likeObject => {
      return fetch(`http://localhost:8088/userLikes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(likeObject)
      })
        .then(response => response.json())
        
    }
    
  
    export const getLikes = (postId) => {
      return fetch(`http://localhost:8088/userLikes?postId=${postId}`)
        .then(response => response.json())
    }