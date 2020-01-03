//listen for form submit 
document.getElementById('myform');
document.addEventListener('submit',saveBookMark);
//save bookmark 
function saveBookMark(e){
    //get form values
    var siteName= document.getElementById('siteName').value;
    var siteURL= document.getElementById('siteURL').value;
     var BookMark={
         name: siteName,
         url: siteURL
     }
    /*/local storage test
    localStorage.setItem('test','hello world');
    console.log(localStorage.getItem('test'));
    */

    // test if bookmark is null
    if(localStorage.getItem('boookmark')===null){
        //init array
        var boookmark=[];
        //add to array
        boookmark.push(boookmark);
        //set to local storage
        localStorage.setItem('boookmark', JSON.stringify(boookmark));
        
       
    } 
    else {
        //get bookmarks from local storage
      var bookmarks= JSON.parse(localStorage.getItem('bookmark'));
      //add bookmarks to array
      bookmarks.push(bookmark);
      // re-set back to  localstorage
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks)); 
      //prevent form from submitting
         e.preventDefault();}

         //delete bookmarks 
         

         


    
    


   // fetch bookmarks
    function  fetchbookmarks(){
        // get book mark from local storage
        var Bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
        //get output id 
        var bookmarksResults= document.getElementById('bookmarksResults');
        //build output 
        bookmarksResults.innerHTML='';

        for (var i=0; i < bookmarks.length; i++){
            var name=bookmarks[i].name;
            var url =bookmarks[i].url;
            bookmarksResults.innerHTML += '<div class="well"> + '<h3>'+name+ <a class="btn btn-default"  target="_blank"  href="'+url+'">Visit</a>'
            '<a onclick="deletebookmark(\''+url+'\')"  class="btn btn-danger" target="_blank" href="#">delete</a>'+
            
            '</h3>'+ '</div>';
        

        }
        
    }
}
    

  

 

