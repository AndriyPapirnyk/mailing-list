let fileExpansion;
fileInfo.addEventListener("change", function() {
    let filePath = fileInfo.value;
    let fileName = filePath.split('\\');
    let fileNameSlice = fileName.pop();
    fileInfo__p.innerText = fileNameSlice;
    fileExpansion = fileNameSlice.split('.');
    console.log(fileExpansion[1])
});

uploadFile.onclick = () => {
    if(fileInfo.value !== '') {
        if(fileExpansion[1] == 'txt') {

            localStorage.setItem('verifyChange', true);

            ////

            let fileData = new FormData();
            fileData.append('fileData', fileInfo.files[0]);
            let fileRequest = new XMLHttpRequest();
            fileRequest.open('POST', '/sendFile');
            fileRequest.send(fileData);

            ////

        } else {
            alert('Extension is not suitable')
        }
    } else {
        alert('No file selected')
    }
}



sendBtn.onclick = () => {
    let checkValue = messageInfo.value.trim();
    if(localStorage.getItem('verifyChange').toString()) {
        if(checkValue !== '') {
            let data = {
                message: messageInfo.value
            }
            sendMailForm(data); 
            localStorage.setItem('verifyChange', false)
        } else {
            alert('The field is empty')
        }
    } else {
        alert('File is not chosen or uploaded')
    }
};
function sendMailForm(formData){
    let form = document.getElementById('concat');
    fetch('send', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(_ =>{
        form.reset();
    })
    .catch(error => console.log(error));
};