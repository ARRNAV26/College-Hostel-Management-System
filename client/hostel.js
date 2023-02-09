// hostel info
document.querySelector('#h-btn').addEventListener('click',()=>{
    console.log("btn pressed");
    document.querySelector('#hTable').style.display = 'block';
    fetch('http://localhost:5000/getAllHostels')
    .then(resopnse => resopnse.json())
    .then(data => loadHostelTable(data['data']));
})

function loadHostelTable(data){
    let tbody = document.querySelector('#hostelTableBody');
    if(data.length === 0){
        tbody.innerHTML = `<tr><td id="noData" colspan='8'>NO DATA</td></tr>`;
        return;
    }
    let tableHtml = '';
    data.forEach(({h_id,h_name,h_addr,pincode,h_facilities,h_fees,h_rating,h_review}) => {
        tableHtml += '<tr>'
        tableHtml += `<td>${h_id}</td>`
        tableHtml += `<td>${h_name}</td>`
        tableHtml += `<td>${h_addr}</td>`
        tableHtml += `<td>${pincode}</td>`
        tableHtml += `<td>${h_facilities}</td>`
        tableHtml += `<td>${h_fees}</td>`
        tableHtml += `<td>${h_rating}</td>`
        tableHtml += `<td>${h_review}</td>`
        // tableHtml += `<td><button class="show-hostel-btn btn-secondary" data-id=${c_id}>Hostels</button></td>`
        // tableHtml += `<td><button class="show-mess-btn btn-secondary" data-id=${c_id}>Mess</button></td>`
        // tableHtml += `<td><button class="delete-row-btn btn-secondary" data-id=${c_id}>delete</button></td>`
        // tableHtml += `<td><button class="edit-row-btn btn-secondary" data-id=${c_id}>edit</button></td>`
        tableHtml += '</tr>'
    });
    tbody.innerHTML = tableHtml;
}


const hostel_btn = document.querySelector('#hostelBtn');
hostel_btn.addEventListener('click',()=>{
    const nameInput = document.querySelector('#hostelName');
    const name = nameInput.value;
    nameInput.value = "";
    // console.log(name);
    const AddrInput = document.querySelector('#hostelAddr');
    const addr = AddrInput.value;
    AddrInput.value = "";
    const PinInput = document.querySelector('#hostelPin');
    const pin = PinInput.value;
    PinInput.value = "";
    const FacilityInput = document.querySelector('#hostelFacilities');
    const facilities = FacilityInput.value;
    FacilityInput.value = "";
    const FeesInput = document.querySelector('#hostelFees');
    const fees = FeesInput.value;
    FeesInput.value = "";
    const RatingInput = document.querySelector('#hostelRating');
    const rating = RatingInput.value;
    RatingInput.value = "";
    const ReviewInput = document.querySelector('#hostelReview');
    const review = ReviewInput.value;
    ReviewInput.value = "";

    fetch("http://localhost:5000/insertHostelInfo" ,{
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
    let tbody = document.querySelector('.hostelTableBody');
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
