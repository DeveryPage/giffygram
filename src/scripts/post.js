
  // export const Post = (postObject) => {
  //   return `
  //     <section class="post">
  //       <header>
  //           <h2 class="post__title">${postObject.title}</h2>
  //       </header>
  //       <img class="post__image" src="${postObject.imageURL}" />
  //           <h2 class="post_timestamp">${postObject.timestamp}</h2>
  //           <h3 class="post_description">Description: ${postObject.description}</h2>
  //     </section>
  //   `
  // }



  export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
            <p class="post__description">${postObject.description}</p>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <button id="edit__${postObject.id}">Edit</button>
        <button id="delete__${postObject.id}">Delete</button>
      </section>
    `
}

