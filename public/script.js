// script.js

// Function to handle form submission and add a new post
function addPost(event) {
  event.preventDefault(); // Prevent form submission

  // Get the form inputs
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const video = document.getElementById('video').value;
  const photo = document.getElementById('photo').value;

  // Create a new post object
  const newPost = {
    title,
    content,
    video,
    photo,
  };

  // Send a POST request to the server to add the new post
  fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  })
    .then((response) => {
      if (response.ok) {
        // If the post is added successfully, fetch the updated list of posts
        fetchPosts();
      } else {
        console.error('Failed to add post');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  // Clear the form inputs
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('video').value = '';
  document.getElementById('photo').value = '';
}

// Function to fetch and display the posts
function fetchPosts() {
  // Send a GET request to the server to retrieve the list of posts
  fetch('/posts')
    .then((response) => response.json())
    .then((data) => {
      // Get the container for posts
      const postsContainer = document.getElementById('posts');

      // Clear the existing posts
      postsContainer.innerHTML = '';

      // Loop through the fetched posts and create HTML elements to display them
      data.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const titleElement = document.createElement('h3');
        titleElement.textContent = post.title;
        postElement.appendChild(titleElement);

        const contentElement = document.createElement('p');
        contentElement.textContent = post.content;
        postElement.appendChild(contentElement);

        if (post.video) {
          const videoElement = document.createElement('iframe');
          videoElement.src = post.video;
          postElement.appendChild(videoElement);
        }

        if (post.photo) {
          const photoElement = document.createElement('img');
          photoElement.src = post.photo;
          postElement.appendChild(photoElement);
        }

        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Fetch and display the initial list of posts when the page loads
fetchPosts();
