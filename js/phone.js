const loadPhone = async (searchText='13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones,isShowAll);
}

const displayPhone = (phones,isShowAll) => {
    // console.log(phones)
    const phoneContainer=document.getElementById('phone-container');
    phoneContainer.textContent='';
    const showAllContainer=document.getElementById('show-all-container')
    //   first 10 phones
    if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }
console.log(isShowAll)
    if(!isShowAll){
        phones=phones.slice(0,12);
    }

    phones.forEach(phone => {

        const phoneCard = document.createElement('div');
        phoneCard.className = `card p-4 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
            <div class="card-body">
                <h2 class="card-title justify-center">${phone.phone_name}</h2>
                <p class="justify-center text-center">There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
    
    `
    phoneContainer.appendChild(phoneCard);
    })
    // hide loading spinner
    toggleLoadingSpinner(false)
}

const handleShowDetail=async(id)=>{
    // load single phone data
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data=await res.json();
    const phone=data.data;
    showPhoneDetails(phone)
}
const showPhoneDetails=(phone)=>{
    const phoneName=document.getElementById('phone-name');
    phoneName.innerText=phone.name;

    const showdetailContainer=document.getElementById('show-detail-container')
    showdetailContainer.innerHTML=`
    <img src="${phone.image}" />
    <p>Brand:${phone.brand}</p>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p>Chipset: ${phone.mainFeatures.chipSet}</p>
    <p>Display Size:${phone.mainFeatures.displaySize}</p>
    <p>Memory:${phone.mainFeatures.memory}</p>
    <p>Sensor:${phone.mainFeatures.sensor}</p>
    <p>Slug:${phone.slug}</p>
    <p>Release Date:${phone.releaseDate}</p>
    <p>GPS:${phone.others?.GPS}</p>
    
    `
    show_details_modal.showModal()
}

// handle serach recape

const handleSearch2=(isShowAll)=>{
    toggleLoadingSpinner(true)
    const searchField2=document.getElementById('search-field2');
    const searchText=searchField2.value;
    loadPhone(searchText,isShowAll);

}

const toggleLoadingSpinner=(isLoading)=>{
    const loadingSpinner=document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle showAll
const handleShowAll=()=>{
    handleSearch2(true);
}
loadPhone();