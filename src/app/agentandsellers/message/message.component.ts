import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements AfterViewInit, OnInit {
  @ViewChild('chatWindow') chatWindow!: ElementRef;

  newMessage: string = '';

  chatList = [

      {
        name: 'Lina Khoury',
        avatar: 'assets/user1.webp',
        lastMessage: 'I’m interested in the apartment...',
        time: '10:25 AM',
        messages: [
          { text: 'Hi, I’m interested in the apartment in Al-Rawda.', time: '10:23 AM', me: false },
          { text: 'Great choice! It’s still available and has 3 bedrooms, 2 bathrooms.', time: '10:25 AM', me: true },
        ]
      },
      {
        name: 'Mohammed Awad',
        avatar: 'assets/user2.jpeg',
        lastMessage: 'What’s the price for...',
        time: '11:00 AM',
        messages: [
          { text: 'What’s the price for the land in Rafidia?', time: '10:58 AM', me: false },
          { text: 'It’s listed for $85,000. It’s a 450m² plot in a prime location.', time: '11:00 AM', me: true },
        ]
      },
      {
        name: 'Noura Yassin',
        avatar: 'assets/user3.jpeg',
        lastMessage: 'Does the apartment come with...',
        time: '1:10 PM',
        messages: [
          { text: 'Does the apartment come with furniture?', time: '1:08 PM', me: false },
          { text: 'Yes, it’s semi-furnished: kitchen appliances and wardrobes are included.', time: '1:10 PM', me: true },
        ]
      },
      {
        name: 'Ahmed Saleh',
        avatar: 'assets/user4.jpg',
        lastMessage: 'Can I schedule a visit?',
        time: '9:45 AM',
        messages: [
          { text: 'Can I schedule a visit to the house in Al-Masaken?', time: '9:43 AM', me: false },
          { text: 'Of course! I’m available tomorrow at 4 PM or Friday morning. What suits you?', time: '9:45 AM', me: true },
        ]
      },
      {
        name: 'Rania Odeh',
        avatar: 'assets/user5.jpg',
        lastMessage: 'I’d like to know more about...',
        time: '12:30 PM',
        messages: [
          { text: 'I’d like to know more about the villa in Asira.', time: '12:28 PM', me: false },
          { text: 'Sure! It’s a 2-floor villa with a garden and garage, built in 2021.', time: '12:30 PM', me: true },
        ]
      },
      {
        name: 'Tariq Badran',
        avatar: 'assets/user6.jpg',
        lastMessage: 'Is it negotiable?',
        time: '4:10 PM',
        messages: [
          { text: 'Is the price for the shop negotiable?', time: '4:08 PM', me: false },
          { text: 'There’s room for negotiation, depending on the payment method. Let’s discuss!', time: '4:10 PM', me: true },
        ]
      },
    {
      name: 'Tariq Badran',
      avatar: 'assets/user6.jpg',
      lastMessage: 'Is it negotiable?',
      time: '4:10 PM',
      messages: [
        { text: 'Is the price for the shop negotiable?', time: '4:08 PM', me: false },
        { text: 'There’s room for negotiation, depending on the payment method. Let’s discuss!', time: '4:10 PM', me: true },
      ]
    }
];

  selectedChat = this.chatList[0];
  searchTerm: string = '';

  ngOnInit(): void {
    // 🚀 تفعيل AOS عند الدخول
    AOS.init({
      duration: 700,
      once: true,
      easing: 'ease-in-out'
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
    setTimeout(() => this.scrollToBottom(), 100);
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.selectedChat.messages.push({
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        me: true
      });
      this.newMessage = '';
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  scrollToBottom() {
    try {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    } catch (err) {}
  }

  get filteredChatList() {
    return this.chatList.filter(chat =>
      chat.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
