console.log("CONNECTED");

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