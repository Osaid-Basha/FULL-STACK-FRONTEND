import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import * as AOS from 'aos';
import { MessageService, Message, ChatContact } from '../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-maseege-buyer',
  standalone: false,
  templateUrl: './maseege-buyer.component.html',
  styleUrl: './maseege-buyer.component.css'
})
export class MaseegeBuyerComponent implements AfterViewInit {
  @ViewChild('chatWindow') chatWindow!: ElementRef;

  newMessage: string = '';
  searchTerm: string = '';

  chatList: ChatContact[] = [];
  filteredChatList: ChatContact[] = [];

  selectedChat: ChatContact | null = null;
  messages: Message[] = [];

  private chatListSubscription: Subscription | undefined;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    AOS.init({
      duration: 700,
      once: true,

    });

    this.chatListSubscription = this.messageService.fetchChatList().subscribe(
      (list) => {
        this.chatList = list;
        this.filteredChatList = list;
        if (list.length > 0) {
          this.selectChat(list[0]);
        }
      },
      (error) => {
        console.error('Failed to load chat list:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  selectChat(chat: ChatContact) {
    this.selectedChat = chat;
    this.messages = [];

    if (this.selectedChat.id) {
      this.messageService.getConversationMessages(this.selectedChat.id).subscribe(
        (msgs) => {
          this.messages = msgs;
          setTimeout(() => this.scrollToBottom(), 100);
        },
        (error) => {
          console.error('Failed to load messages for conversation:', this.selectedChat?.id, error);
        }
      );
    }
  }

  sendMessage() {
    if (this.newMessage.trim() !== '' && this.selectedChat && this.selectedChat.id) {
      const messageToSend = this.newMessage;
      this.newMessage = '';

      this.messageService.sendMessage(this.selectedChat.id, messageToSend).subscribe({
        next: (response) => {
          console.log('Message sent successfully:', response);
          this.messages.push({
            id: Date.now(),
            user_sender_id: this.messageService.getCurrentUserId(),
            user_receiver_id: this.selectedChat!.id,
            textContent: messageToSend,
            created_at: new Date().toISOString(),
            me: true,
            displayTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          setTimeout(() => this.scrollToBottom(), 100);
        },
        error: (error) => {
          console.error('Error sending message:', error);
          alert('Failed to send message!');
        }
      });
    }
  }

  scrollToBottom() {
    try {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    } catch (err) {
      console.error("Error scrolling:", err);
    }
  }

  getFilteredChatList(): ChatContact[] {
    if (!this.searchTerm) {
      return this.chatList;
    }
    return this.chatList.filter(chat =>
      chat.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (chat.lastMessage && chat.lastMessage.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  ngOnDestroy(): void {
    this.chatListSubscription?.unsubscribe();
  }
}
