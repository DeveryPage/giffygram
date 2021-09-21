import { getPosts,getUsers, usePostCollection, createPost } from "./DataManager.js"
import { PostList } from "./postList.js";
import { NavBar } from "./navBar.js";
import { Footer } from "./footer.js";
import { PostEntry } from "./PostEntry.js";
import { deletePost } from "./DataManager.js";
import { getSinglePost } from "./DataManager.js";
import { PostEdit } from "./PostEdit.js";
import { updatePost, getLoggedInUser, logoutUser, setLoggedInUser, loginUser } from "./DataManager.js";
import { LoginForm } from "./LoginForm.js";
import { RegisterForm } from "./RegisterForm.js";


const formElement = document.querySelector(".giffygram")


const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts.reverse());
        showFooter(allPosts)
    })
}

const showNavBar = () => {
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const showFooter = (data) => {
  const navElement = document.querySelector("Footer");
navElement.innerHTML = Footer(data);
}

const applicationElement = document.querySelector(".giffygram");

const showPostEntry = () => { 
  //Get a reference to the location on the DOM where the nav will display
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEntry();
}


const showUserList = () => {
  //Get a reference to the location on the DOM where the list can display
  const postElement = document.querySelector(".userList");
  getUsers().then((allUsers) => {
      //console.log("user info: ", allUsers);
  })
}

// editshown
const showEdit = (postObj) => {
  const entryElement = document.querySelector(".entryForm");
  entryElement.innerHTML = PostEdit(postObj);
}




// YEAR SELECTION

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
      const yearAsNumber = parseInt(event.target.value)
  
      console.log(`User wants to see posts since ${yearAsNumber}`)
      showFilteredPosts(yearAsNumber);
    }
  })
  const showFilteredPosts = (year) => {
    const epoch = Date.parse(`01/01/${year}`);
    const filteredData = usePostCollection().filter(singlePost => {
      // debugger
      if (singlePost.timestamp >= epoch) {
        return singlePost
      }
    })
    showFooter(filteredData);
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
  
  }
 
  const checkForUser = () => {
  	if (sessionStorage.getItem("user")){
		  setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
    	startGiffyGram();
  	}else {
   		showLoginRegister();
  	}
}

const showLoginRegister = () => {
  	showNavBar();
  	const entryElement = document.querySelector(".entryForm");
  	//template strings can be used here too
  	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
  	//make sure the post list is cleared out too
	const postElement = document.querySelector(".postList");
	postElement.innerHTML = "";
}

//   applicationElement.addEventListener("click", event => {
//     if (event.target.id === "home_image") {
  
//       console.log(`you clicked home`)
//     }
//   })


//   applicationElement.addEventListener("click", event => {
//     if (event.target.id === "directMessageIcon") {
  
//       console.log(`you clicked meesages`)
//     }
//   })


  
// applicationElement.addEventListener("click", event => {
//     if (event.target.id === "logout") {
  
//       console.log(`You clicked log out}`)
//     }
//   })
  
//   const handleGiffyClick = (event) => {
//       console.log("What was clicked", event)
//       if (event.target.id === "logout") {
//           console.log("you clicked on logout")}
//   }

// applicationElement.addEventListener("click", handleGiffyClick)


applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})


formElement.addEventListener("click", event => {
  if (event.target.id === "newPost__cancel") {
      //clear the input fields
  }
})

formElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "newPost__submit") {
  //collect the input values into an object to post to the DB
    const title = document.querySelector("input[name='postTitle']").value
    const url = document.querySelector("input[name='postURL']").value
    const description = document.querySelector("textarea[name='postDescription']").value
    //we have not created a user yet - for now, we will hard code `1`.
    //we can add the current time as well
    const postObject = {
        title: title,
        imageURL: url,
        description: description,
        userId: 1,
        timestamp: Date.now()
    }


  // be sure to import from the DataManager
      createPost(postObject)
      .then(dbResponse => {
        showPostList()
      })
  }
})

applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id.startsWith("updatePost")) {
    const postId = event.target.id.split("__")[1];
    //collect all the details into an object
    const title = document.querySelector("input[name='postTitle']").value
    const url = document.querySelector("input[name='postURL']").value
    const description = document.querySelector("textarea[name='postDescription']").value
    const timestamp = document.querySelector("input[name='postTime']").value
    
    const postObject = {
      title: title,
      imageURL: url,
      description: description,
      userId: getLoggedInUser().id,
      timestamp: parseInt(timestamp),
      id: parseInt(postId)
    }
    
    updatePost(postObject)
      .then(response => {
        showPostList();
      })
  }
})

applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "login__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='name']").value,
      email: document.querySelector("input[name='email']").value
    }
    loginUser(userObject)
    .then(dbUserObj => {
      if(dbUserObj){
        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
        startGiffyGram();
      }else {
        //got a false value - no user
        const entryElement = document.querySelector(".entryForm");
        entryElement.innerHTML = `</br> <p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
      }
    })
  }
})




// DELETE
applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id.startsWith("delete")) {
    const postId = event.target.id.split("__")[1];
    deletePost(postId)
      .then(response => {
        showPostList();
      })
  }
})

// edit
applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id.startsWith("edit")) {
    const postId = event.target.id.split("__")[1];
    getSinglePost(postId)
      .then(response => {
        showEdit(response);
      })
  }
})

applicationElement.addEventListener("click", event => {
  if (event.target.id === "logout") {
    logoutUser();
    console.log(getLoggedInUser());
  }
})

const startGiffyGram = () => {
	showPostList();
    showNavBar();
    showPostEntry();
    showUserList();
}

checkForUser();
// startGiffyGram();
    


    
    
    
            















        
        
        
        
        
        // joke function


//         import { getDadJoke } from "./DataManager.js";
//         import { jokeFormat } from "./jokeDetail.js";
    
    
//     const docElement = document.querySelector(".joke-container");


// docElement.addEventListener("clcik", (event) => {
//     if(event.target.id === ".joke-button") {
    
//         getDadJoke().then(joke => {
    
//             let jokeHTMLRepresentation = jokeFormat(joke)
            
//             docElement.innerHTML += jokeHTMLRepresentation
// })
// }

// displayJoke();