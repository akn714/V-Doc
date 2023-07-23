async function chat(){
    console.log("called chat()")
    console.log('fetching response...')
    console.log('loader is visible')
    // document.querySelector('.loader').style.display = "inline-block";
    // document.querySelector('.loader-div').style.display = "flex";

    let res = await fetch('http://localhost:3001/chat')

    let data;
    try{
        data = await res.json();
        console.log(data)
    }
    catch{
        console.log("json not available");
    }

    let item = document.createElement('div');
    item.setAttribute('class','msg ovd-msg');

    item.innerHTML = `
        <span className="profile">
            <img src="./doctor-profile.png" alt="on-v-doctor-profile" />
        </span>
        <div id='ovd-msg-data' className="msg-data ovd-msg-data">
            <!-- loader -->
            <div class='loader'>loader</div>
        </div>
    `
    

    if(res){
        // document.querySelector('.loader-div').style.display = "none";
        // document.querySelector('.loader').style.display = "none";
        let loaders = document.getElementsByClassName('loader')
        console.log(loaders.length);

        let item = document.createElement('p');
        item.innerHTML = `${data.ovd_res}`;
        document.querySelector('#ovd-msg-data').appendChild(item);

        document.getElementById("ovd-msg-data").removeAttribute('id');
    }
}