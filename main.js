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
        
    }); //btnAjouter
   
}); //docReady