var csvObj = [];
var str = 'Codigo do Curso, tipo de Curso, Nome do Curso';
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
    {
        var cliente = JSON.parse(this.responseText);
        
        // document.getElementById('demo').innerHTML = 
        // '<h3>Dados do Liferay</h3><table><tr><th>Código</th><th>tipo</th><th>nome</th></tr>'+ pegaCursos() +'</table><br /><hr />';
        function pegaCursos() {
            let textTable = "";
            for (let i = 0;i<cliente.length;i++){
                let line = '';
                // textTable = textTable+'<tr><td>'+i+' - '+cliente[i].codigoCurso+'</td><td>'+cliente[i].tipo+'</td><td>'+cliente[i].nome+'</td>   </tr>';  
                if (line != '') line += ','
                line += cliente[i].codigoCurso+','+cliente[i].tipo+','+cliente[i].nome;
                
                str += line + '\r\n';
                csvObj.push({'codigoCurso':cliente[i].codigoCurso,'tipo':cliente[i].tipo,'nome':cliente[i].nome})
            }
            return textTable;
        }
    } else {
        return `<p> Não pude ler os dados </p>` 
    }

}
xmlhttp.open("GET", "resposta.json", true);
xmlhttp.send();

const fs = require('fs');
fs.writeFile('cursosNoLiferay.csv', str, 'utf8', function (err) {
if (err) {
console.log('Some error occured - file either not saved or corrupted file saved.');
} else{
console.log('It\'s saved!');
console.log("File written successfully\n");
console.log("The written has the following contents:");
console.log(fs.readFileSync("cursosNoLiferay.csv", "utf8"));
}
callback("data_saved | cursosNoLiferay.csv")
});