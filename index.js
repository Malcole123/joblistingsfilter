//Import Json
fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let m = 0; m < data.length; m++) {
      //Create card div
      var jobCard = document.createElement("div");
      jobCard.className = "job-card";
      //Creating children
      //image
      var jobImg = document.createElement("img");
      jobImg.src = data[m].logo;
      jobCard.appendChild(jobImg);

      //create job details
      var jobDetails = document.createElement("div");
      jobDetails.className = "job-details";
      //details head
      var jobDetailsH = document.createElement("div");
      jobDetailsH.className = "details-head";
      //create details content
      //add company name
      var companyName = document.createElement("h6");
      companyName.innerHTML = data[m].company;
      jobDetailsH.appendChild(companyName);
      //add status bars
      if (data[m].new === true) {
        var newTag = document.createElement("span");
        newTag.className = "job-state";
        newTag.innerHTML = "new!";
        jobDetailsH.appendChild(newTag);
      }
      if (data[m].featured === true) {
        var featTag = document.createElement("span");
        featTag.className = "featured";
        featTag.innerHTML = "featured";
        jobDetailsH.appendChild(featTag);
      }
      jobDetails.appendChild(jobDetailsH); //append to details
      //title
      var jobTitle = document.createElement("h3");
      jobTitle.innerHTML = data[m].position;
      jobDetails.appendChild(jobTitle);
      //details foot
      var jobDetailsF = document.createElement("div");
      jobDetailsF.className = "details-foot";
      //foot content
      var timeLeft = document.createElement("span");
      var duration = document.createElement("span");
      var location = document.createElement("span");
      timeLeft.innerHTML = data[m].postedAt;
      duration.innerHTML = data[m].contract;
      location.innerHTML = data[m].location;
      jobDetailsF.appendChild(timeLeft);
      jobDetailsF.appendChild(duration);
      jobDetailsF.appendChild(location);

      //append to card
      jobDetails.appendChild(jobDetailsF);
      jobCard.appendChild(jobDetails);
      //Add Specific tags
      var jobTagEl = document.createElement("div");
      jobTagEl.className = "job-tags";
      //Add languages
      for (let x = 0; x < data[m].languages.length; x++) {
        var newCardx = document.createElement("span");
        newCardx.innerHTML = data[m].languages[x];
        newCardx.addEventListener("click", addFilter);
        jobTagEl.appendChild(newCardx);
      }
      //Add tools
      for (let y = 0; y < data[m].tools.length; y++) {
        var newCardy = document.createElement("span");
        newCardy.innerHTML = data[m].tools[y];
        newCardy.addEventListener("click", addFilter);
        jobTagEl.appendChild(newCardy);
      }
      //Add position
      var positionCard = document.createElement("span");
      positionCard.innerHTML = data[m].role;
      positionCard.addEventListener("click", addFilter);

      jobTagEl.appendChild(positionCard);

      //Add Level
      var levelCard = document.createElement("span");
      levelCard.innerHTML = data[m].level;
      levelCard.addEventListener("click", addFilter);
      jobTagEl.appendChild(levelCard);

      jobCard.appendChild(jobTagEl);

      var jobDisplayEL = document.getElementsByClassName("job-listings")[0];
      jobDisplayEL.appendChild(jobCard);
    }
  });

//Filter Variables
var filter = document.getElementsByClassName("filters")[0]; //parent for filters
var currentFilters = filter.children;
var filterWords = [];

function addFilter() {
    if(filterWords.includes(event.currentTarget.innerHTML)){
        alert('Filter already in list')
    }else{
          //create div
  var newfilter = document.createElement("div");
  newfilter.className = "filter-card";

  //create span to hold text
  var filterCont = document.createElement("span");
  filterCont.innerHTML = event.currentTarget.innerHTML;

  //create remove button
  var removeBtn = document.createElement("div");
  removeBtn.className = "remove";
  var removeImg = document.createElement("img");
  removeImg.src = "images/icon-remove.svg";

  removeBtn.appendChild(removeImg); //Complete Btn
  newfilter.appendChild(filterCont);
  newfilter.appendChild(removeBtn);
  newfilter.addEventListener("click", removeFilter); //For removal
  //add div to parent
  filter.appendChild(newfilter);
  filterWords.push(event.currentTarget.innerHTML)
    }
}

function removeFilter() {
  filter.removeChild(event.currentTarget);
  var remove = filterWords.indexOf(event.currentTarget.innerHTML);
  filterWords.splice(remove)
}

function clearFilters() {
  filterWords = [];
  while (filter.children.length > 0) {
    filter.removeChild(filter.firstChild);
  }
}


// Sort List
var jobListingSect = document.getElementsByClassName('job-listings'); // parent element.
var jobCards = document.getElementsByClassName('job-card'); //Array of all job listings.
var jobTags = document.getElementsByClassName('job-tags'); // parent for all filter tags
const sort = new MutationObserver(function() {
    var searchNum = filterWords.length;
    displayFilters()
    for(let a = 0; a < jobCards.length ; a++){
        var search = jobTags[a].children;
        var count = 0 
        for(let b = 0; b < search.length; b++){
            if(filterWords.includes(search[b].innerHTML)){
              search[b].style.backgroundColor = 'hsl(180, 29%, 50%)';
              search[b].style.color = '#fff';

                count++
            }else{
              search[b].style.backgroundColor = 'hsl(180, 31%, 95%)'
              search[b].style.color = 'hsl(180, 29%, 50%)' ;
  
            }
        }
        if(count === searchNum){
            jobTags[a].parentElement.style.display = "block"
        }else{
            jobTags[a].parentElement.style.display = "none"
        }
    }

});
sort.observe(filter, {subtree: true, childList: true})


function displayFilters(){
  if(currentFilters.length > 0){
    document.getElementsByClassName('picked-filters')[0].style.display = 'flex'
  }else{
    document.getElementsByClassName('picked-filters')[0].style.display = 'none'

  }
}
document.getElementById("clearFilters").addEventListener("click", clearFilters);
