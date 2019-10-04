let s4 = "< € 44.000";
s4 = s4.replace('< ', '');
s4 = s4.replace('€ ', '');
s4 = s4.replace('.', '');
console.log(s4);

readJSON();

function readJSON() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "./horizonscan.json", true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
        if (this.status == 200) {
            var file = new File([this.response], 'temp');
            var fileReader = new FileReader();
            fileReader.addEventListener('load', function(){
                //do stuff with fileReader.result
            });
            fileReader.readAsText(file);
        }
    }
    xhr.send();
}

