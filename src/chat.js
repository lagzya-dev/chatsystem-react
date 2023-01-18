import React from 'react';
import './chat.scss';
import io from 'socket.io-client';

const socket = io();
  function Blog(props) {
    const content = props.posts.map((p) =>
    <div className="chatbox__messages" key={p.id} >
        <div className="chatbox__messages__user-message" >
            <div className="chatbox__messages__user-message--ind-message">
                <p className="name">{p.owner}</p>
                <br/>
                <p className="message">{p.msg}</p>
            </div>
        </div>
    </div>
    );
    
    return (
        content
    );
  }
export default class Chat extends React.Component {
    messages = [];
    constructor(props) {
        super(props);
        this.state = {value: '', messages: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        socket.emit("new");
        socket.on("update", (msg) =>{
            this.messages.push(msg);
            this.setState({value: ''});
            var audio = new Audio('notify.mp3');
            audio.volume = 1;
            audio.play();
        })
        socket.on("loadMsg", (msg) =>{
            this.messages = msg;
            this.setState({value: ''});
            
        })
      }
     
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        socket.emit("submit", this.state.value)
        console.log(this.state.value);
        
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
      }
      
      componentDidMount() {
        this.scrollToBottom();
      }
      
      componentDidUpdate() {
        this.scrollToBottom();
      }
    render() {
        return (
            <div className='container' >
                <h1>Swanky Chatbox UI With Angular</h1>
                <div className='chatbox' >
                    
                <ul className='chatMessages' id="chatMessages">
                   <Blog posts={this.messages}/>
                   <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </ul>
                
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter your message" />
                    </form>
                </div>
            </div>
        )
    }
}