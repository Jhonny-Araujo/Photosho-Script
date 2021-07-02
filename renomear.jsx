
(function main(){
	
	var texto = 2499;

        abrirPeDireito ();
	renomear(texto);
	abrirPeEsquerdo ();
	renomear(texto);
      

})();


function abrirPeEsquerdo(){
    
        app.activeDocument = app.documents.getByName('pilot@.psd');                
}
function abrirPeDireito(){
    
        app.activeDocument = app.documents.getByName('pilot.psd');                
}


function renomear(seed){
    
     var qt = app.activeDocument.layers.length;
     var i;
     
     for(i=0;i<qt;i++){
         app.activeDocument.activeLayer = app.activeDocument.layers[i];
         app.activeDocument.activeLayer.name = seed+i;
     }
}
