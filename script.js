let blogs = JSON.parse(localStorage.getItem("blogs")) || [
  {
    title: "Classic Chocolate Cake",
    content: "This rich and moist cake is perfect for birthdays and celebrations.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
  },
  {
    title: "Pasta Alfredo",
    content: "Creamy Italian pasta with garlic, cream and parmesan.",
    image:  "img/pasta_alfredo.jpeg"
  },
  {
    title: "Masala Chai",
    content: "Traditional Indian tea with spices. Best enjoyed with biscuits.",
    image: "img/chai.jpeg"
  }
];

function renderBlogs() {
  const blogList = document.getElementById("blog-list");
  if (blogList) {
    blogList.innerHTML = "";
    blogs.forEach(blog => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}">
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
      `;
      blogList.appendChild(card);
    });
  }

  const adminList = document.getElementById("adminList");
  if (adminList) {
    adminList.innerHTML = "";
    blogs.forEach((blog, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${blog.title}</strong>
        <span>
          <button onclick="editBlog(${index})">Edit</button>
          <button onclick="deleteBlog(${index})">Delete</button>
        </span>
      `;
      adminList.appendChild(li);
    });
  }
}

function saveBlog(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const image = document.getElementById("image").value;
  const editIndex = document.getElementById("editIndex").value;

  const blog = { title, content, image };

  if (editIndex) {
    blogs[editIndex] = blog;
  } else {
    blogs.push(blog);
  }

  localStorage.setItem("blogs", JSON.stringify(blogs));
  document.getElementById("blogForm").reset();
  document.getElementById("editIndex").value = "";
  renderBlogs();
}

function editBlog(index) {
  const blog = blogs[index];
  document.getElementById("title").value = blog.title;
  document.getElementById("content").value = blog.content;
  document.getElementById("image").value = blog.image;
  document.getElementById("editIndex").value = index;
}

function deleteBlog(index) {
  blogs.splice(index, 1);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  renderBlogs();
}

document.addEventListener("DOMContentLoaded", renderBlogs);
document.getElementById("blogForm")?.addEventListener("submit", saveBlog);