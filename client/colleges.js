// college info
const clgBtn = document.querySelector("#clg-btn");
clgBtn.addEventListener("click", () => {

  document.querySelector("#clgTable").style.display = "block";
  fetch("http://localhost:5000/getAll")
    .then((resopnse) => resopnse.json())
    .then((data) => loadCollegeTable(data["data"]));
});

function loadCollegeTable(data) {
  let tbody = document.querySelector("#clgTableBody");
  let searchCollege = document.querySelector("#searchCollege");
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td id="noData" colspan='11'>NO DATA</td></tr>`;
    return;
  }
  let tableHtml = "";
  searchCollege.innerHTML += `<div id='searchCollege'>
  <label for="clgSearch">Search College: </label><br />
  <input
    type="text"
    name="clgSearch"
    id="clgSearch"
    placeholder="Enter the college name: "
  />
  <button class="searchCollegeBtn btn-secondary">Search</button>
</div>
  
                                  `;
  data.forEach(
    ({
      c_id,
      c_name,
      c_addr,
      pincode,
      branches,
      avg_package,
      clg_rating,
      review,
    }) => {
      tableHtml += "<tr>";
      tableHtml += `<td>${c_id}</td>`;
      tableHtml += `<td>${c_name}</td>`;
      tableHtml += `<td>${c_addr}</td>`;
      tableHtml += `<td>${pincode}</td>`;
      tableHtml += `<td>${branches}</td>`;
      tableHtml += `<td>${avg_package}</td>`;
      tableHtml += `<td>${clg_rating}</td>`;
      tableHtml += `<td>${review}</td>`;
      tableHtml += `<td><button class="show-hostel-btn btn-secondary" data-id=${c_id}>Hostels</button></td>`;
      tableHtml += `<td><button class="show-mess-btn btn-secondary" data-id=${c_id}>Mess</button></td>`;
      // tableHtml += `<td><button class="delete-row-btn btn-secondary" data-id=${c_id}>delete</button></td>`
      // tableHtml += `<td><button class="edit-row-btn btn-secondary" data-id=${c_id}>edit</button></td>`
      tableHtml += "</tr>";
    }
  );
  tbody.innerHTML = tableHtml;
}

const clg_btn = document.querySelector("#clgBtn");
clg_btn.addEventListener("click", () => {
  const nameInput = document.querySelector("#clgName");
  const name = nameInput.value;
  nameInput.value = "";
  console.log(name);
  const AddrInput = document.querySelector("#clgAddr");
  const addr = AddrInput.value;
  AddrInput.value = "";
  const PinInput = document.querySelector("#clgPin");
  const pin = PinInput.value;
  PinInput.value = "";
  const BranchesInput = document.querySelector("#clgBranches");
  const branches = BranchesInput.value;
  BranchesInput.value = "";
  const AVgPackInput = document.querySelector("#clgAvgPack");
  const avgPack = AVgPackInput.value;
  AVgPackInput.value = "";
  const RatingInput = document.querySelector("#clgRating");
  const rating = RatingInput.value;
  RatingInput.value = "";
  const ReviewInput = document.querySelector("#clgReview");
  const review = ReviewInput.value;
  ReviewInput.value = "";

  fetch("http://localhost:5000/insert", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: name,
      addr: addr,
      pin: pin,
      branches: branches,
      avgPack: avgPack,
      rating: rating,
      review: review,
    }),
  })
    .then((response) => response.json())
    .then((data) => insertNewRow(data["data"]));
});

function insertNewRow(data) {
  let tbody = document.querySelector(".clgTableBody");
  const isTableBody = document.querySelector(".noData");

  let tableHtml = "";
  tableHtml += "<tr>";
  for (key in data) {
    if (data.hasOwnProperty(key)) {
      tableHtml += `<td>${data[key]}</td>`;
    }
  }
  tableHtml += "</tr>";
  if (isTableBody) {
    tbody.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
}

// const showHostelBtn = document.getElementsByClassName('.show-hostel-btn');
// showHostelBtn.addEventListener('click',()=>{
//     console.log(showHostelBtn.dataset.id);
// })

// for hostels and mess displaying on same page
document.querySelector(".tableContent").addEventListener("click", (event) => {
  if (event.target.classList[0] === "show-hostel-btn") {
    // console.log(event.target.dataset.id);
    searchId(event.target.dataset.id);
    document.querySelector(".clgContainer").style.display = "none";
    document.querySelector(".tempHostelContainer").hidden = false;
    window.history.pushState({ id: 1 }, null, "?q=nearHostels");
  } else if (event.target.classList[0] === "show-mess-btn") {
    searchMessId(event.target.dataset.id);
    document.querySelector(".clgContainer").style.display = "none";
    document.querySelector(".tempMessContainer").hidden = false;
    window.history.pushState({ id: 1 }, null, "?q=nearMess");
  }
});

function searchId(id) {
  fetch("http://localhost:5000/search/" + id)
    .then((response) => response.json())
    .then((data) => diplayTempHostelList(data["data"]));
}

function diplayTempHostelList(data) {
  let tbody = document.querySelector("#tempHostelTableBody");
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td id="noData" colspan='8'>NO DATA</td></tr>`;
    return;
  }
  let tableHtml = "";
  data.forEach(
    ({
      h_id,
      h_name,
      h_addr,
      pincode,
      h_facilities,
      h_fees,
      h_rating,
      h_review,
    }) => {
      tableHtml += "<tr>";
      tableHtml += `<td>${h_id}</td>`;
      tableHtml += `<td>${h_name}</td>`;
      tableHtml += `<td>${h_addr}</td>`;
      tableHtml += `<td>${pincode}</td>`;
      tableHtml += `<td>${h_facilities}</td>`;
      tableHtml += `<td>${h_fees}</td>`;
      tableHtml += `<td>${h_rating}</td>`;
      tableHtml += `<td>${h_review}</td>`;
      tableHtml += "</tr>";
    }
  );
  tbody.innerHTML = tableHtml;
}

window.addEventListener("popstate", () => {
  document.querySelector(".clgContainer").style.display = "block";
  document.querySelector(".tempHostelContainer").hidden = true;
});

// for displaying mess information related to particular college
function searchMessId(id) {
  fetch("http://localhost:5000/searchM_Id/" + id)
    .then((response) => response.json())
    .then((data) => diplayTempMessList(data["data"]));
}

function diplayTempMessList(data) {
  let tbody = document.querySelector("#tempMessTableBody");
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td id="noData" colspan='8'>NO DATA</td></tr>`;
    return;
  }
  let tableHtml = "";
  data.forEach(
    ({
      m_id,
      m_name,
      m_addr,
      pincode,
      m_facilities,
      m_fees,
      m_rating,
      m_review,
    }) => {
      tableHtml += "<tr>";
      tableHtml += `<td>${m_id}</td>`;
      tableHtml += `<td>${m_name}</td>`;
      tableHtml += `<td>${m_addr}</td>`;
      tableHtml += `<td>${pincode}</td>`;
      tableHtml += `<td>${m_facilities}</td>`;
      tableHtml += `<td>${m_fees}</td>`;
      tableHtml += `<td>${m_rating}</td>`;
      tableHtml += `<td>${m_review}</td>`;
      tableHtml += "</tr>";
    }
  );
  tbody.innerHTML = tableHtml;
}

window.addEventListener("popstate", () => {
  document.querySelector(".clgContainer").style.display = "block";
  document.querySelector(".tempMessContainer").hidden = true;
});


document.querySelector('#searchCollege').addEventListener('click' ,(e)=>{
    if(e.target.classList[0] === 'searchCollegeBtn'){
        // console.log('found');
        
        const nameInput = document.querySelector('#clgSearch')
        const name = nameInput.value;
        nameInput.value = "";
        document.querySelector("#clgTable").style.display = "none";
        document.querySelector("#searchClgTable").style.display = "block";
        // document.querySelector("#searchClgTable").hidden = false;
        window.history.pushState({ id: 1 }, null,null);
        searchCollege(name);
    }
})

function searchCollege(name){
    fetch("http://localhost:5000/searchCollegeName/" + name)
    .then((response) => response.json())
    .then((data) => loadCollegeNameTable(data["data"]));
}

function loadCollegeNameTable(data) {
    let tbody = document.querySelector("#searchClgTableBody");
    if (data.length === 0) {
      tbody.innerHTML = `<tr><td id="noData" colspan='11'>NO DATA</td></tr>`;
      return;
    }
    let tableHtml = "";
    data.forEach(
      ({
        c_id,
        c_name,
        c_addr,
        pincode,
        branches,
        avg_package,
        clg_rating,
        review,
      }) => {
        tableHtml += "<tr>";
        tableHtml += `<td>${c_id}</td>`;
        tableHtml += `<td>${c_name}</td>`;
        tableHtml += `<td>${c_addr}</td>`;
        tableHtml += `<td>${pincode}</td>`;
        tableHtml += `<td>${branches}</td>`;
        tableHtml += `<td>${avg_package}</td>`;
        tableHtml += `<td>${clg_rating}</td>`;
        tableHtml += `<td>${review}</td>`;
        tableHtml += `<td><button class="show-hostel-btn btn-secondary" data-id=${c_id}>Hostels</button></td>`;
        tableHtml += `<td><button class="show-mess-btn btn-secondary" data-id=${c_id}>Mess</button></td>`;
        // tableHtml += `<td><button class="delete-row-btn btn-secondary" data-id=${c_id}>delete</button></td>`
        // tableHtml += `<td><button class="edit-row-btn btn-secondary" data-id=${c_id}>edit</button></td>`
        tableHtml += "</tr>";
      }
    );
    tbody.innerHTML = tableHtml;
  }

  window.addEventListener("popstate", () => {
    document.querySelector("#clgTable").style.display = "block";
    document.querySelector("#searchClgTable").style.display = 'none';
  });
  
