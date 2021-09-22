import {getLikes} from './../scripts/DataManager.js';




//this needs to be located above the Post declaration
//this could also be imported to this module
const getNumberOfLikes = (postId) => {
  getLikes(postId)
  .then(response => {
    document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
  })
}


  export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
            <h2 class="post__title">${postObject.user.name}</h2>
            <p class="post__description">${postObject.description}</p>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
 <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
        <button id="edit__${postObject.id}">Edit</button>
        <button id="delete__${postObject.id}">Delete</button>
        <button id="like__${postObject.id}">like</button>
      </section>
    `
}