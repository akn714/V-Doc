import './Chat.css'
// import './Chats'
import '../index.js'
import { useEffect } from 'react';

export function Chat() {

    useEffect(()=>{
        let form = document.getElementById('user-query-inp-form');
        form.addEventListener('submit', (e)=>{






            
            let messages = document.getElementById('messages');
            let user_query = document.querySelector('#user-query');
            if (user_query.value !== '') {
                let user_msg = document.createElement('div');
                user_msg.setAttribute('class', 'msg user-msg');
                user_msg.innerHTML =
                    `<span class="profile">
                        <img src="./user-profile.png" alt="user-profile" />
                    </span>
                    <div class="msg-data user-msg-data">
                        <p>${user_query.value}</p>
                    </div>
                `;
                messages.appendChild(user_msg);
                // document.querySelector('#user-query').value = '';

                
                // setTimeout(() => {
                    let item = document.createElement('div');
                    item.setAttribute('class','msg ovd-msg');

                    item.innerHTML = `
                        <span class="profile">
                            <img src="./doctor-profile.png" alt="on-v-doctor-profile" />
                        </span>
                        <div id='ovd-msg-data' class="msg-data ovd-msg-data">
                            <!-- loader -->
                            <div id="loader">
                                <div class="loader-dot loader-dot1"></div>
                                <div class="loader-dot loader-dot2"></div>
                                <div class="loader-dot loader-dot3"></div>
                            </div>
                        </div>
                    `
                    document.querySelector('#messages').appendChild(item)
                // }, 500);
            }








            let query = document.getElementById('user-query')
            
            e.preventDefault();

            // if(query.value==''){
            //     alert('input is empty')
            // }
            // else{
                
                // setTimeout(() => {
                    // let item = document.createElement('div');
                    // item.setAttribute('class','msg ovd-msg');

                    // item.innerHTML = `
                    //     <span className="profile">
                    //         <img src="./doctor-profile.png" alt="on-v-doctor-profile" />
                    //     </span>
                    //     <div id='ovd-msg-data' className="msg-data ovd-msg-data">
                    //         <!-- loader -->
                    //         <div class='loader'>loader</div>
                    //     </div>
                    // `
                    // document.querySelector('#messages').appendChild(item)
                // }, 100);

                let data = {
                    "query": query.value
                }
                // console.log(new FormData(document.querySelector('#user-query-inp-form')))
                let req_json = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
                console.log(req_json)
                fetch('/chat', req_json)
                .then((res)=>{
                    return res.json();
                })
                .then((ovd_res)=>{
                    console.log(data)
                    let item = document.createElement('p');
                    item.innerHTML = `${ovd_res.ovd_msg}`;
                    console.log(ovd_res.ovd_msg);
                    document.querySelector('#ovd-msg-data').appendChild(item);

                    document.getElementById("ovd-msg-data").removeAttribute('id');
                    document.querySelector('#user-query').value = '';
                    document.querySelector('#loader').remove();
                })
                window.scroll(0, document.getElementsByClassName('chats')[0].scrollHeight)
            // }
        })
    })

    return (
        <>
        
            <div className="chats">
                <h1 className='chats-title'>
                    Here you can chat with On-V-Doctor
                </h1>
                {/* demo chats */}
                <div id='messages'>
                    <div className="msg ovd-msg">
                        <span className="profile">
                            <img src="./doctor-profile.png" alt="on-v-doctor-profile" />
                        </span>
                        <div className="msg-data ovd-msg-data">
                            <p>
                                Hey There,<br />
                                I am your Online Virtual Doctor,<br />
                                How can I help you...
                            </p>
                        </div>
                    </div>
                    {/* <div className="msg user-msg">
                        <span className="profile">
                            <img src="./user-profile.png" alt="user-profile" />
                        </span>
                        <div className="msg-data user-msg-data">
                            <p>
                                Recently a honeybee sting me, please help me out to get relief.
                            </p>
                        </div>
                    </div> */}
                </div>
                {/* <div id="loader">
                    <div className="loader-dot loader-dot1"></div>
                    <div className="loader-dot loader-dot2"></div>
                    <div className="loader-dot loader-dot3"></div>
                </div> */}
                <div className='inp-by-user'>
                    <form id='user-query-inp-form'>
                        <input name='query' id='user-query' type="text" placeholder='ask something...' />
                        <button className='submit-query'><img src='./send.png' alt='send icon' /></button>
                    </form>
                </div>
            </div>
        </>
    );
}