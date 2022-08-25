
document.querySelector("#search-input").addEventListener('keydown', chik)

function chik(e){
    if(e.key !== 'Enter') return;
    else {
        let tmp = document.getElementById("search-input");
        let val = tmp.value;
        search(val);
    }
}
async function search(val){
    val = val.toLowerCase();
    let newcourses = await getCourses();
    newcourses = newcourses.filter(course => {
        let string = course.title;
        string = string.toLowerCase();
        return string.includes(val);
    });
    renderCourses(newcourses);
} 

async function getCourses() {
  let url = 'https://shwky56.github.io/facapi/courses.geojson';
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

function renderCourses(courses) {
  let html = "";
  courses.forEach((course) => {
    let htmlSegment = `<div class="item-${course.id}">
        <a
          href="#"
          class="card"
        >
          <div
            class="thumb"
            style="
              background-image: url(${course.image});
            "
          ></div>
          <article>
            <h1>${course.title}</h1>
            <span class="ss">${course.author}</span>
            <br />
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <p class="sls">${course.price}</p>
          </article>
          
        </a>
      </div>`;

    html += htmlSegment;
  });

  let container = document.querySelector(".band");
  container.innerHTML = html;
}
async function reder(){
    let courses = await getCourses();
    renderCourses(courses);

}
reder();