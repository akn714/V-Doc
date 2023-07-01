import './Chat.css'

export function Chat(){
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
                                I am your Online Virtual Doctor...<br />
                                How can I help you...
                            </p>
                        </div>
                    </div>
                    <div className="msg user-msg">
                        <span className="profile">
                            <img src="./user-profile.png" alt="user-profile" />
                        </span>
                        <div className="msg-data user-msg-data">
                            <p>
                                Recently a honeybee sting me, please help me out to get relief.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='inp-by-user'>
                    <input id='user-query' type="text" placeholder='ask something...'/>
                    <button className='submit-query' onclick={()=>{
                        let messages = document.getElementById('messages');
                        let data = document.querySelector('#user-query');
                        if(data.value!=''){
                            let newdata = `
                                <div className="msg user-msg">
                                    <span className="profile">
                                        <img src="./user-profile.png" alt="user-profile" />
                                    </span>
                                    <div className="msg-data user-msg-data">
                                        <p>${data.value}</p>
                                    </div>
                                </div>`;
                            messages.appendChild(newdata);
                        }
                    }}>send</button>
                </div>
            </div>
        </>
    );
}