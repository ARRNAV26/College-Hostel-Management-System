// hostel info
document.querySelector('#m-btn').addEventListener('click',()=>{
    // console.log("btn pressed");
    document.querySelector('#mTable').style.display = 'block';
    fetch('http://localhost:5000/getAllMess')
    .then(resopnse => resopnse.json())
    .then(data => loadMessTable(data['data']));
})

function loadMessTable(data){
    let tbody = document.querySelector('#messTableBody');
    if(data.length === 0){
        tbody.innerHTML = `<tr><td id="noData" colspan='8'>NO DATA</td></tr>`;
        return;
    }
    let tableHtml = '';
    data.forEach(({m_id,m_name,m_addr,pincode,m_facilities,m_fees,m_rating,m_review}) => {
        tableHtml += '<tr>'
        tableHtml += `<td>${m_id}</td>`
        tableHtml += `<td>${m_name}</td>`
        tableHtml += `<td>${m_addr}</td>`
        tableHtml += `<td>${pincode}</td>`
        tableHtml += `<td>${m_facilities}</td>`
        tableHtml += `<td>${m_fees}</td>`
        tableHtml += `<td>${m_rating}</td>`
        tableHtml += `<td>${m_review}</td>`
        // tableHtml += `<td><button class="show-hostel-btn btn-secondary" data-id=${c_id}>Hostels</button></td>`
        // tableHtml += `<td><button class="show-mess-btn btn-secondary" data-id=${c_id}>Mess</button></td>`
        // tableHtml += `<td><button class="delete-row-btn btn-secondary" data-id=${c_id}>delete</button></td>`
        // tableHtml += `<td><button class="edit-row-btn btn-secondary" data-id=${c_id}>edit</button></td>`
        tableHtml += '</tr>'
    });
    tbody.innerHTML = tableHtml;
}

const mess_btn = document.querySelector('#messBtn');
mess_btn.addEventListener('click',()=>{
    const nameInput = document.querySelector('#messName');
    const name = nameInput.value;
    nameInput.value = "";
    // console.log(name);
    const AddrInput = document.querySelector('#messAddr');
    const addr = AddrInput.value;
    AddrInput.value = "";
    const PinInput = document.querySelector('#messPin');
    const pin = PinInput.value;
    PinInput.value = "";
    const FacilityInput = document.querySelector('#messFacilities');
    const facilities = FacilityInput.value;
    FacilityInput.value = "";
    const FeesInput = document.querySelector('#messFees');
    const fees = FeesInput.value;
    FeesInput.value = "";
    const RatingInput = document.querySelector('#messRating');
    const rating = RatingInput.value;
    RatingInput.value = "";
    const ReviewInput = document.querySelector('#messReview');
    const review = ReviewInput.value;
    ReviewInput.value = "";

    fetch("http://localhost:5000/insertMessInfo" ,{
        headers:{
            'content-type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name:name,addr:addr,pin:pin,facilities:facilities,fees:fees,rating:rating,review:review})
    })
    .then(response => response.json())
    .then(data => insertNewRow(data['data']));


})

function insertNewRow(data){
    let tbody = document.querySelector('.messTableBody');
    const isTableBody = document.querySelector('.noData');

    let tableHtml = "";
    tableHtml += '<tr>';
    for(key in data){
        if(data.hasOwnProperty(key)){
            tableHtml += `<td>${data[key]}</td>`
        }
    }
    tableHtml +='</tr>'
    if(isTableBody){
        tbody.innerHTML = tableHtml;
    }
    else{
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}
