function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function(){
    let newBook = document.getElementById("myBooks");

    let btnAjouter = document.createElement("input");
    btnAjouter.setAttribute("class", "btn btn--ajouter");
    btnAjouter.setAttribute("type", "button");
    btnAjouter.setAttribute("value", "Ajouter un livre");
    newBook.childNodes[3].after(btnAjouter); 
    
    //Add button is hidden, search buttons/textboxes are revealed 
    btnAjouter.addEventListener('click', function() {
           
        btnAjouter.style.display = "none";

        let labelTitre = document.createElement("label");
        labelTitre.setAttribute("for", "titre");
        labelTitre.innerHTML = "Titre du livre";
        labelTitre.className = "label";
        newBook.childNodes[3].after(labelTitre);
    
        let inputTitre = document.createElement("input");
        inputTitre.setAttribute("class", "textbox");
        inputTitre.setAttribute("type", "text");
        inputTitre.setAttribute("id", "titre");
        inputTitre.setAttribute("size", "120");
        labelTitre.after(inputTitre);
    
        let labelAuteur = document.createElement("label");
        labelAuteur.setAttribute("for", "auteur");
        labelAuteur.innerHTML = "Auteur";
        labelAuteur.className = "label";
        inputTitre.after(labelAuteur);
    
        let inputAuteur = document.createElement("input");
        inputAuteur.setAttribute("class", "textbox");
        inputAuteur.setAttribute("type", "text");
        inputAuteur.setAttribute("id", "auteur");
        inputAuteur.setAttribute("size", "120");
        labelAuteur.after(inputAuteur);
    
        let btnRechercher = document.createElement("input");
        btnRechercher.setAttribute("class", "btn");
        btnRechercher.setAttribute("type", "button");
        btnRechercher.setAttribute("value", "Rechercher");
        inputAuteur.after(btnRechercher);
        const br = document.createElement("br");
        btnRechercher.after(br);

        let btnAnnuler = document.createElement("input");
        btnAnnuler.setAttribute("class", "btn btn--annuler");
        btnAnnuler.setAttribute("type", "button");
        btnAnnuler.setAttribute("value", "Annuler");
        br.after(btnAnnuler);
        //we revert add button and hide the others
        btnAnnuler.addEventListener('click', function() {
           
            btnAjouter.style.display = "block";
            labelTitre.style.display = "none";
            inputTitre.style.display = "none";
            labelAuteur.style.display = "none";
            inputAuteur.style.display = "none";
            btnRechercher.style.display = "none";
            btnAnnuler.style.display = "none";
            br.style.display= "none";
            myRes.style.display = "none";
            mySearch.style.display = "none";
            secondHr.style.display = "none";
            mySearch.style.display = "none";
            
        }); //btnAnnuler

        let mybooks = document.getElementById("myBooks");
        let firstHr= mybooks.querySelector("hr");
        let myRes = document.createElement("h2");
        myRes.className = 'myRes';
        let maListe = document.createTextNode('Ma liste de recherche');
        myRes.appendChild(maListe);
        firstHr.after(myRes);

        let secondHr= document.createElement("hr");
        secondHr.id = 'secondHr'; 
        myRes.after(secondHr);

        //We create section block for the search list
        let mySearch = document.createElement("div");
        mySearch.id = 'mySearch';
        maListe.after(mySearch);

        // We use gbook api to get search results and display them into a result list 
        btnRechercher.addEventListener('click', function() {
           
            var searchTitre = document.getElementById("titre").value; 
            var searchAuteur = document.getElementById("auteur").value;

            if ((searchTitre && searchAuteur) === "" || (searchTitre && searchAuteur) === null) {
                alert("Veuillez compléter les deux champs de recherche");
            }
            else {
                    
                    fetch("https://www.googleapis.com/books/v1/volumes?q="+searchTitre+"+"+searchAuteur+"&printType=books" )
                        .then(function (res) {
                            return res.json();
                            
                         }).then(function (result) {                             
                                var items = result.items;
                                console.log(items);
                                if (result.totalItems === 0) {
                                    alert("Aucun livre n'a été trouvé");
                                } else {
                               let mySearch = document.getElementById('mySearch');
                                items.forEach(book => {
                                    var titre = book.volumeInfo.title;
                                    var id = book.id;
                                    var auteur = book.volumeInfo.authors;
                                    var description = book?.searchInfo?.textSnippet?book.searchInfo.textSnippet:"Information manquante";
                                    var image = book?.volumeInfo?.imageLinks?.thumbnail?book.volumeInfo.imageLinks.thumbnail:"logo/unavailable_mini.jpg"; 
                                    var dataParametr = id+','+titre+','+auteur+','+description+','+image;                 
                                    let searchedBook = document.createElement("section");
                                    searchedBook.className = 'searchedBook';
                                    searchedBook.setAttribute("id", id);
                                    searchedBook.innerHTML =
                                    `<header>
                                            <div class="bookmark" id="${id}bookmark"><i class="fa-solid fa-book-open fa-2x" onclick = favoriteStorage('${id}')></i></div>  
                                            <div class="titre">${titre}</div>
                                            <div class="id">Id : ${id}</div>
                                    </header>
                                            <div class="auteur">Auteur(s) : ${auteur}</div>
                                            <div class="description">${description}</div>
                                            <div class="image"><img src="${image}"/></div>
                                    `;
                                    
                                    mySearch.appendChild(searchedBook);  
                                });
                                }
                         }); 
                }
        });

    }); //btnAjouter
   
}); //docReady

// Save and delete favorite books
function favoriteStorage(id){
    
    if (sessionStorage.getItem(id)) {
        alert("Vous ne pouvez ajouter deux fois le même livre")
    } else {

        // Clone the searchedBook into favoriteBook
        let favoriteBook = document.createElement("section");
        favoriteBook.setAttribute("id", id);
        favoriteBook = document.getElementById(id);
        let searchedBook = document.getElementById(id);
        let content = document.getElementById('content');
        let bookmarkedBook = content.querySelector('h2');
        favoriteBook = searchedBook.cloneNode(true);

        // Replace (favorite)bookmark with delete(from favorite) bookmark and add favorite section into the DOM 
		let deleteBookmark = document.createElement("div");
        deleteBookmark.className = "deleteBookmark";
        deleteBookmark.innerHTML = `<div class="deleteBookmark" id="${id}bookmark"><i class="fa-solid fa-trash-can fa-2x"></i></div>`;
		let favoriteBookHeaderBookmark = favoriteBook.querySelector('header>div');
		favoriteBookHeaderBookmark.replaceWith(deleteBookmark);
		bookmarkedBook.after(favoriteBook);

        //Delete favorite book
        deleteBookmark.addEventListener('click', function deleteFavorite() {
            favoriteBook.parentElement.removeChild(favoriteBook);
            sessionStorage.removeItem(id);
        });

        //Save favorite book
        sessionStorage.setItem(id, favoriteBook.innerHTML);

     }   
}; 

// Display bookmarked favorites after web page refreshes 
window.onload = function () {
    
    let content = document.getElementById('content');
    let bookmarkedBook = content.querySelector('h2');
   
    for (let i = 0; i < sessionStorage.length; i++) {

        let id = sessionStorage.key(i);
        let favorite = sessionStorage.getItem(id);

        if (id !="IsThisFirstTime_Log_From_LiveServer") {
            let favoriteBook = document.createElement('section');
            favoriteBook.setAttribute("id", id);
            favoriteBook.className = "favoriteBook";
            favoriteBook.innerHTML = favorite;
            bookmarkedBook.after(favoriteBook);  

            //add delete onclick to the bookmark on the main page
            let favoriteBookHeaderBookmark = favoriteBook.querySelector('header>div');
            favoriteBookHeaderBookmark.onclick = function deleteFavorite() {
                favoriteBook.parentElement.removeChild(favoriteBook);
                sessionStorage.removeItem(id);
            };   
        }
    }    
};