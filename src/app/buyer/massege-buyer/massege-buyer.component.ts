import { Component } from '@angular/core';

@Component({
  selector: 'app-massege-buyer',
  standalone: false,
  templateUrl: './massege-buyer.component.html',
  styleUrl: './massege-buyer.component.css'
})
export class MassegeBuyerComponent {
  newMessage: string = '';



  chatList = [
    {
      name: 'Aaryian Jose',
      avatar: 'assets/371225.jpg',
      lastMessage: 'Is typing...',
      time: '2:40 PM',
      messages: [
        { text: 'Hi there! I\'m interested in your services.', time: '2:39 PM', me: false },
        { text: 'Can you tell me more about what you offer?', time: '2:40 PM', me: false },
        { text: 'Hello! Sure, I\'d be happy to explain!', time: '2:41 PM', me: true },
      ]
    },
    {
      name: 'Sarika Jain',
      avatar: 'assets/371225.jpg',
      lastMessage: 'Do you know which...',
      time: '6:12 AM',
      messages: [
        { text: 'Do you know which product is best for new startups?', time: '6:10 AM', me: false },
        { text: 'Yes! I recommend checking our Pro Package.', time: '6:11 AM', me: true },
      ]
    }
  ];

  selectedChat = this.chatList[0];

  selectChat(chat: any) {
    this.selectedChat = chat;
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.selectedChat.messages.push({
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        me: true
      });
      this.newMessage = '';
    }
  }
}
