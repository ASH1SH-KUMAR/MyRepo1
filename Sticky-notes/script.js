let addsticky = document.querySelector(".add-sticky");
let ticketcont = document.querySelector(".ticket-container");
let closemodal = document.querySelector(".close-sticky");
let filterColor = document.querySelectorAll(".color");
addsticky.addEventListener("click", func);

for(let i=0;i<filterColor.length;i++)
{
  filterColor[i].addEventListener("click",cilckfilt);
}

function cilckfilt(e)
{
   if(e.target.classList.contains("active-filter"))
   {
    document.querySelector(".active-filter").classList.remove("active-filter");
    ticketcont.innerHTML = "";
    loadAllTicket();
   }
else
{
    let isfilt = document.querySelector(".active-filter");

    if(isfilt)
   {
       document.querySelector(".active-filter").classList.remove("active-filter");
   }

    e.target.classList.add("active-filter");
    
    ticketcont.innerHTML = "";
    loadActiveTicket(e.target.classList[1]);
}
  
}

function loadActiveTicket(actcolor)
{
   let allTickets = db.getItem("allTickets");

   if(allTickets)
  {
      allTickets = JSON.parse(allTickets);
 
      for(let i=0;i<allTickets.length;i++)
      {
          let tikinfo = allTickets[i];
          if(tikinfo.color==actcolor)
          {
            addTikt(tikinfo);
          }
      }   
  }
}



let modalopen = false;  
function func(e)
{
   if(modalopen)
   {
      return;
   }
   let newdiv = document.createElement("div");
   newdiv.classList.add("open-modal");
   newdiv.innerHTML = `<div class="ticket-content" contenteditable="true"></div>
     <div class="ticket-color">
        <div class="filter red selt-filter"></div>
        <div class="filter blue"></div>
        <div class="filter green"></div>
        <div class="filter yellow"></div>
        <div class="filter black"></div>
     </div>`;


    document.querySelector("body").append(newdiv);
    modalopen = true;

    let selectedfilter  = document.querySelectorAll(".filter");

    for(let i=0;i<selectedfilter.length;i++)
    {
    selectedfilter[i].addEventListener("click",selfilt);
    }
    
    let ticketId = "#"+revisedRandId();

    function revisedRandId() {
     return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    }
    newdiv.querySelector(".ticket-content").addEventListener("keypress",function(e){
    let text = e.target.textContent;
    let tktcol = document.querySelector(".selt-filter").classList[1];
    let tikinfo = {color:tktcol,content:text,tiktID:ticketId};
    if(e.key=="Enter" && e.target.textContent)
    {
        addTikt(tikinfo);
        saveTicketToDb(tikinfo);
    }  
    else if(e.key=="Enter")
    {
    alert("Please Enter Some Text");
    clmod();
    }
});
}

closemodal.addEventListener("click", clmod);

function clmod(e)
{
   if(modalopen)
    {
      document.querySelector(".open-modal").remove();
      modalopen = false;     
    } 
 
}

function addTikt(tikinfo)
{
      
      let ticketdiv = document.createElement("div");
      ticketdiv.classList.add("sticky-ticket");

      ticketdiv.innerHTML = `<div class="sticky-color ${tikinfo.color}">
       </div>
       <div class="sticky-text">
       <div class="ticket-delete fas fa-trash"></div> 
       <div style="color:${tikinfo.color};"class="Ticket-no ">${tikinfo.tiktID}</div>
       ${tikinfo.content}</div>`;

      document.querySelector(".ticket-container").append(ticketdiv); 

      let delsticky = ticketdiv.querySelector(".ticket-delete"); //use ticketdiv.queryselector as it
      delsticky.addEventListener("click",function(e){           //only uses its own ticket to find the delete button
     ticketdiv.remove();
     deleteTicketfromDb(tikinfo.tiktID);
     
});

      clmod();
      

}

function selfilt(e)
{
  if(e.target.classList.contains("selt-filter"))
  {
    return;
  }
  else
  {
    document.querySelector(".selt-filter").classList.remove("selt-filter");
    e.target.classList.add("selt-filter");
  }
}

 loadAllTicket();

