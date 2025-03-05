module.exports = (objetoParams) => {
    for(let propriedade in objetoParams){
        // Metódo que testa se id tem na propriedade essa string
        if (/Id|id/.test(propriedade)){
            objetoParams[propriedade] = Number(objetoParams[propriedade]);
        }
    }
    return objetoParams;
}