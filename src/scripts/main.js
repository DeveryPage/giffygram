import { getPosts, getUsers } from "./DataManager.js"
import { PostList } from "./postList.js";
import { NavBar } from "./navBar.js";


const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts().then((allPosts) => {
        postElement.innerHTML = PostList(allPosts);
    })
}

const showNavBar = () => {
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const applicationElement = document.querySelector(".giffygram");


// applicationElement.addEventListener("click", event => {
// 	if (event.target.id === "logout"){
// 		console.log("You clicked on logout")
// 	}
// })


applicationElement.addEventListener("change", event => {
    if (event.target.id === "year selection") {
      const yearAsNumber = parseInt(event.target.value)
  
      console.log(`User wants to see posts since ${yearAsNumber}`)
    }
  })


  applicationElement.addEventListener("click", event => {
    if (event.target.id === "home_image") {
  
      console.log(`you clicked home`)
    }
  })


  applicationElement.addEventListener("click", event => {
    if (event.target.id === "directMessageIcon") {
  
      console.log(`you clicked meesages`)
    }
  })


  
applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
  
      console.log(`You clicked log out}`)
    }
  })
  
  const handleGiffyClick = () => {
      console.log("What was clicked", event)
      if (event.target.id === "logout") {
          console.log("you clicked on logout")}
  }

applicationElement.addEventListener("click", handleGiffyClick)





const startGiffyGram = () => {
	showPostList();
    showNavBar();
  
}

startGiffyGram();
    


    
    
    
            















        
        
        
        
        
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