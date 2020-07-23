const postsContainerEl = document.getElementById('posts-container'),
  loadingEl = document.querySelector('.loader'),
  filterEl = document.getElementById('filter');

const URL = 'https://jsonplaceholder.typicode.com/posts?_limit={0}&_page={1}';

let limit = 5;
let page = 1;

async function getPosts() {
  return await (await fetch(String(URL).replace('{0}', limit).replace('{1}', page))).json();
}

// Show posts in dom
async function showPosts() {
  const posts = await getPosts();
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postsContainerEl.appendChild(postEl);
  })
}

// Show loader & fetch more posts
function showLoading() {
  loadingEl.classList.add('show');
  setTimeout(() => {
    loadingEl.classList.remove('show');
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      // if it exists, returned index is above 0
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const VALUE = 5;
  // if scroll hits a certain point
  if (scrollTop + clientHeight >= scrollHeight - VALUE) {
    showLoading();
  }
});

filterEl.addEventListener('input', filterPosts);