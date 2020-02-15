console.log("CONNECTED");

//it does what it's named for
function makeActive(element){
    //remove class from old
    var old = document.querySelector(".active");
    if(old) old.classList.remove("active");
    //make the new active
    element.classList.add("active");
}
//make navbar scrolling correct
document.querySelectorAll(".nav-item").forEach(function(element, index){
    element.onclick = function(){
        return false;
    }
    element.addEventListener("click", function(e){
        //find clicked element
        var target = e.target || e.srcElement;
        var href = target.getAttribute("href"); //we also need its href
        
        //make clicked element the active one
        makeActive(document.querySelector("[href='" + href +"']").parentElement);
        
        //scroll to clicked
        document.querySelector(href).scrollIntoView();
        //scroll a bit down due to fixed navbar
        window.scrollBy(0, -100);
    });
});

//scrollspy
//I made this scrollSpy so separated I had to organise into an object
var scrollSpy = {
    position: function(elem) { 
        var top = 0,
            height= elem.scrollHeight;
        do { 
            top += elem.offsetTop-elem.scrollTop; 
        } while ( elem = elem.offsetParent ); 
        return [ top, height ]; 
        //Actually I am guilty in copypasting this function. Sorry :c
    },
    contentPositions: function() {
        var sections = [];
        document.querySelectorAll(".nav-link").forEach(function(element, index) {
            //I need to know the href (or name) of every content section
            var href = element.getAttribute("href");
            //and both their scroll position and height
            var position = scrollSpy.position(document.querySelector(href));
            //order all the needed info into one object
            //wich I push into an array
            sections.push({href: href, pos: position[0], size: position[1]});
        });
        return sections;
    },
    scrollSpy: function(content, scroll){
        //every time I hit a section's position
        var i = 0;
        while(scroll >= content[i].pos && scroll <= scroll + content[i].size && i < content.length - 1 ) i++;
        if(i < content.length){
            //make the section href in navbar active
            makeActive(document.querySelector("[href='" + content[i].href + "']").parentElement);
        }
    },
    init: function(){
        var contents = scrollSpy.contentPositions();
        window.addEventListener("scroll", function (event) {
            var scroll = this.scrollY;
            scrollSpy.scrollSpy(contents, scroll);
        });
    }
};

//Image modal in GALLERY
// Get the modal
var modal = document.getElementById("galleryModal");
//define the image inside modal
var modalImg = document.getElementById("modalImage");
//select the images have a sensitive soul for clicks
var images = document.querySelectorAll("img.image")
images.forEach(function(element, index){
    //each image should detect when we click
    element.addEventListener("click", function(){
        //pass the clicked image attrs into the model
        modal.style.display = "block";
        modalImg.src = this.src;
    });
});
// model close button
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

//Send Message button actions
var form = document.querySelector("#contactForm form");
form.onsubmit = function(){
    //get Firstname
    var firstname = document.getElementsByName("firstName")[0].value;
    //display a short message
    var text = "<div><p>Dear " + firstname + "!</p><p>Thank you for your message. We will contact you as soon as possible.</p></div>"
    //form must disappear
    document.querySelector("#contactForm").innerHTML = text;
}

window.onload = function(){
    scrollSpy.init();
}