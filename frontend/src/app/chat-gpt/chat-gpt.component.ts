import { Component } from '@angular/core';
import { ChatGPT } from './chat-gpt.service';

@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.css']
})
export class ChatGptComponent {
  query: string = '';
  messages: Array<{role:string, message: string}> = [];
  showLoader: boolean = false;
  constructor(private chatGptService: ChatGPT){}
  onSubmit(){
    
    if(this.query === ''){
      alert('Enter Input');
    }
    else{
      let query:string = this.query;
      this.messages.push({role: 'me', message: query});
      setTimeout(() => {
        this.showLoader = true;
        this.chatGptService.send_chat_gpt(query).subscribe({
          next: data => {
            this.messages.push({role: 'ai', message: data.choices[0].message.content});
            this.showLoader = false;
          }
        })
      },1500)
      this.query = '';
    }
  }
}
