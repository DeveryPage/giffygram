
  export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
            <h2 class="post_timestamp">${postObject.timestamp}</h2>
            <h3 class="post_description">Description: ${postObject.description}</h2>
      </section>
    `
  }
