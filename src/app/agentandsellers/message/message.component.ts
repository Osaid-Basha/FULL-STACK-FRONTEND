import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import * as AOS from 'aos';
import { MessageService, Message, ChatContact } from '../../services/message.service';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators'; // 👈 تم إضافة هذا الاستيراد

@Component({
  selector: 'app-message',
  standalone: false,
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('chatWindow') chatWindow!: ElementRef;

  newMessage: string = '';
  searchTerm: string = '';

  chatList: ChatContact[] = [];
  filteredChatList: ChatContact[] = [];

  selectedChat: ChatContact | null = null;
  messages: Message[] = [];

  private chatListSubscription: Subscription | undefined;
  private tempReceiverIdSubscription: Subscription | undefined; // 👈 تم إضافة هذا المتغير للاشتراك

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    AOS.init({
      duration: 700,
      once: true,
    });

    // 1. الاشتراك في الـ ID المؤقت من MessageService
    // هذا الاشتراك لازم يكون أول شي بـ ngOnInit لضمان التقاط الـ ID أولاً
    // بنستخدم filter و take(1) لضمان التعامل مع الـ ID مرة واحدة فقط
    this.tempReceiverIdSubscription = this.messageService.tempReceiverIdForChat$.pipe(
      filter(id => id !== null),
      take(1) // مهم جداً: بيخلي هذا الاشتراك يشتغل مرة وحدة بس عند الاستلام الأول
    ).subscribe(targetUserId => {
      console.log('MessageComponent: Received targetUserId from MessageService:', targetUserId);

      // بنصفر الـ ID في الخدمة فوراً بعد ما ناخذه
      this.messageService.setTempReceiverId(null);

      // بنستدعي دالة مساعدة لضمان تحميل قائمة الشاتات ثم اختيار الشات المستهدف
      this.loadChatListAndSelect(targetUserId!); // الـ "!" تؤكد أن targetUserId لن يكون null هنا
    });

    // 2. تحميل قائمة الدردشات الأساسية
    // هذا الاشتراك بيظل موجود ليحمل قائمة الشاتات بشكل عام، سواء كان فيه ID مستهدف أو لا.
    // إذا لم يتم تحديد chat عن طريق الـ ID المؤقت (في الاشتراك أعلاه)، هذا الجزء سيقوم بتحديد أول دردشة.
    this.chatListSubscription = this.messageService.fetchChatList().subscribe(
      (list) => {
        this.chatList = list;
        this.filteredChatList = list;
        console.log('MessageComponent: Chat list loaded.');

        // إذا لم يكن هناك شات محدد مسبقاً (عن طريق tempReceiverIdForChat$)
        // نختار أول شات في القائمة (إذا كانت القائمة غير فارغة).
        if (this.selectedChat === null && list.length > 0) {
          console.log('MessageComponent: No specific chat selected, defaulting to first chat.');
          this.selectChat(list[0]);
        }
      },
      (error) => {
        console.error('MessageComponent: Failed to load chat list:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  /**
   * 👈 تم إضافة هذه الدالة الجديدة
   * دالة مساعدة لتحميل قائمة الدردشات واختيار دردشة معينة بناءً على ID.
   * تتعامل مع حالة عدم وجود الشات (شات جديد).
   */
  private loadChatListAndSelect(targetUserId: number): void {
    console.log(`MessageComponent: Attempting to load chat list and select chat for ID: ${targetUserId}`);
    this.messageService.fetchChatList().subscribe(
      (list) => {
        this.chatList = list; // تحديث قائمة الشاتات الرئيسية
        this.filteredChatList = list; // وتحديث القائمة المفلترة

        const targetChat = list.find(chat => chat.id === targetUserId);
        if (targetChat) {
          console.log('MessageComponent: Found target chat in list, selecting:', targetChat.name);
          this.selectChat(targetChat);
        } else {
          // *** هذا هو الجزء المهم للتعامل مع الشاتات الجديدة ***
          console.log(`MessageComponent: Target chat with ID ${targetUserId} not found in fetched list. This might be a new chat. Attempting to initiate a new chat...`);

          // إذا لم يتم العثور على الشات، نستدعي دالة startChat من MessageService
          this.messageService.startChat(targetUserId).subscribe(
            (response) => {
              console.log('MessageComponent: New chat initiated via backend successfully!', response);
              // بعد بدء الشات بنجاح، يجب إعادة تحميل قائمة الشاتات
              this.messageService.fetchChatList().subscribe(updatedList => {
                  this.chatList = updatedList;
                  this.filteredChatList = updatedList;
                  const newTargetChat = updatedList.find(chat => chat.id === targetUserId);
                  if (newTargetChat) {
                    this.selectChat(newTargetChat); // نختار الشات الجديد
                    console.log('MessageComponent: New chat added to list and selected.');
                  } else {
                    console.error('MessageComponent: Failed to find new chat in updated list after initiation.');
                    // كحل بديل: إضافة جهة اتصال وهمية إذا فشل العثور على الشات الجديد
                    const dummyContact: ChatContact = {
                      id: targetUserId,
                      name: `مستخدم جديد (ID: ${targetUserId})`,
                      avatar: 'assets/default-avatar.png',
                      lastMessage: 'أرسل أول رسالة للبدء!',
                      time: ''
                    };
                    this.chatList.unshift(dummyContact);
                    this.filteredChatList.unshift(dummyContact);
                    this.selectChat(dummyContact);
                  }
                },
                (err) => console.error('MessageComponent: خطأ في تحديث قائمة الشاتات بعد بدء شات جديد:', err)
              );
            },
            (err) => {
              console.error('MessageComponent: خطأ في بدء شات جديد عن طريق الـ Backend:', err);
              alert('فشل في بدء محادثة جديدة. الرجاء المحاولة مرة أخرى.');
            }
          );
        }
      },
      (error) => {
        console.error('MessageComponent: فشل في تحميل قائمة الشاتات للاختيار المحدد:', error);
      }
    );
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
    this.tempReceiverIdSubscription?.unsubscribe(); // 👈 تم إضافة إلغاء الاشتراك هنا
  }
}
