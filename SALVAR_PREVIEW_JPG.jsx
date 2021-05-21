/*
        Criar um JPG de visualização de um lote de estampa de arquivos em pares;
        Contando que o nome da camada nos arquivos pilotos, serão os "codigos de referencia"  no arquivo de previsualização (Preview);
        A primeira camada do Preview deve ser uma do tipo texto;
 */

(function main(){
     abrirDireito ();
     mesclarTodosOsGrupos();
     ocutarTodasCamadas ();
     
     abrirEsquerdo ();
     mesclarTodosOsGrupos ();
    ocutarTodasCamadas ();
    alternarArquivoAberto ();
})();


/* ALTERNAR ENTRE VIEWS*/

function abrirEsquerdo(){
    
        app.activeDocument = app.documents.getByName('pilot@.psd');                
}
function abrirDireito(){
    
        app.activeDocument = app.documents.getByName('pilot.psd');                
}
function abrirPreview(){
    
        app.activeDocument = app.documents.getByName('Preview.psd');                
}

//Mescla todos os grupos
//Salva as alterações
function mesclarTodosOsGrupos(){
    
    var qt  = app.activeDocument.layers.length;    
     var i=0;
     for(i=0;i<qt;i++){
         app.activeDocument.activeLayer = app.activeDocument.layers[i];        
         camadaAtiva = app.activeDocument.activeLayer;
         camadaAtiva.visible = true;
         //Caso for um grupo de camadas, mesclar;
         if(camadaAtiva.typename == "LayerSet"){
            camadaAtiva.merge(); 
         }
        }
 
        app.activeDocument.save();
 
    }



//Salva como JPG, com um nome Definido e qualidade baixa;
function salvarJPG(nome){
    var doc = app.activeDocument;
    var file = new File(doc.path +'\\'+nome+'.jpg');
    var opts = new JPEGSaveOptions();
    opts.quality = 1;
    doc.saveAs(file,opts,true);
 }

//Usado no documento Preview, altera o texto da primeira camada para o nome real do documento
function colocarNome(nome){
    app.activeDocument.layers[0].visible = true;
    app.activeDocument.layers[0].textItem.contents=nome;
    }
//

//Função Principal. Usada para abrir camada a ser usada do pilot ou pilot@ e salvar o preview JPG com o código da estampa;
function alternarArquivoAberto(){   
     //PEGA A QUANTIDADE DE CAMADAS A SEREM SALVAS
    abrirPeEsquerdo ();
    var qt = app.activeDocument.layers.length;
    
    //Inicia a variavel e a  iteração    
    //Usa a nome da camada vista para colocar o codigo e salvar o nome do preview
    var i;
     for(i=0;i<qt;i++){
         
        ativarCamada (i);      
        var nomeCamadaAtiva = app.activeDocument.activeLayer.name;
        app.activeDocument.save();
        desativarCamada(i);
        
        abrirPeDireito ();
        ativarCamada (i);
        app.activeDocument.save();
        desativarCamada(i);
        
        abrirPreview ();
        colocarNome (nomeCamadaAtiva);
        salvarJPG (nomeCamadaAtiva);

    
}

//Oculta a visalização da camada;
function desativarCamada(camadaAtual){
    app.activeDocument.activeLayer = app.activeDocument.layers[camadaAtual];
    app.activeDocument.activeLayer.visible = false;

 }

//Ativa a visualização da camada a ser salva;
function ativarCamada(camadaAtual){
    
    app.activeDocument.activeLayer = app.activeDocument.layers[camadaAtual];
    app.activeDocument.activeLayer.visible = true;
    
}



//Oculta todas as camadas do cocumento aberto
function ocutarTodasCamadas(){
    
     var qt = app.activeDocument.layers.length;
     var i;
     
     for(i=0;i<qt;i++){
         app.activeDocument.activeLayer = app.activeDocument.layers[i];
         app.activeDocument.activeLayer.visible = false;
     }
}
 
