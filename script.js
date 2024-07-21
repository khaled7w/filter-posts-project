const list = document.querySelector('.list-of-posts');
const search = document.getElementById('search');

let i = 0;
let counter = 5;
let Data = [];
let filteredData;

async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    for (i; i < counter; i++) {
      Data.push({ id: data[i].id, title: data[i].title, text: data[i].body });
      renderData();
    }
  } catch (err) {
    throw 'Something Went Wrong' + err.message;
  }
}

function renderData() {
  let viewData;
  if (!filteredData || filteredData.length === 0) {
    viewData = Data;
  } else {
    viewData = filteredData;
  }

  list.innerHTML = '';

  viewData.forEach((el) => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const count = document.createElement('p');
    count.classList.add('count');
    const text = document.createElement('p');
    const title = document.createElement('h4');
    count.textContent = el.id;
    title.textContent = el.title;
    text.textContent = el.text;
    div.classList.add('cont');

    div.appendChild(count);
    div.appendChild(title);
    div.appendChild(text);
    li.appendChild(div);
    list.appendChild(li);
  });
}

fetchData();

function searchHandler() {
  const searchedValue = search.value;
  if (!searchedValue) {
    renderData();
  } else {
    filteredData = Data.filter((el) => {
      return el.title.includes(searchedValue);
    });
    renderData();
  }
}

search.addEventListener('input', searchHandler);

window.onscroll = function (ev) {
  if (
    window.innerHeight + Math.round(window.scrollY) >=
    document.body.offsetHeight
  ) {
    console.log('Here we go!');
    counter += 5;
  }
  fetchData();
};
