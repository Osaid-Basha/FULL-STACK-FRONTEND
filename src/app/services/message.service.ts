import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  avatar?: string; // المسار الكامل للصورة المستخدم للعرض
  first_name?: string;
  last_name?: string;
  profile_image_path?: string; // المسار الخام للصورة من الباك إند
}

export interface Message {
  id: number;
  user_sender_id: number;
  user_receiver_id: number;
  textContent: string;
  created_at: string;
  me?: boolean;
  displayTime?: string;
  sender_info?: User; // معلومات المُرسل كاملة
  receiver_info?: User; // معلومات المُستقبل كاملة
}

export interface ChatContact extends User {
  lastMessage?: string;
  time?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = environment.apiBaseUrl ;

  private fixedAuthToken = localStorage.getItem('token') || '';
  private currentUserId: number = 0;
  private headers: HttpHeaders = new HttpHeaders();
  private userSubscription: Subscription | undefined;

  private tempReceiverIdForChat = new BehaviorSubject<number | null>(null);
  public tempReceiverIdForChat$ = this.tempReceiverIdForChat.asObservable();

  // خريطة لتخزين معلومات المستخدمين (بما في ذلك مسار الصورة) للوصول السريع
  private usersMap = new Map<number, User>();

  constructor(private http: HttpClient) {
    this.updateAuthHeaders();
    this.loadCurrentUserId();
  }

  private updateAuthHeaders(): void {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.fixedAuthToken}`
    });
  }

  private loadCurrentUserId(): void {
    this.userSubscription?.unsubscribe();
    this.userSubscription = this.http.get<{ id: number; first_name: string; last_name: string; profile_image_path?: string }>(`${this.apiUrl}/user`, { headers: this.headers }).subscribe({
      next: (res) => {
        this.currentUserId = res.id;
        console.log('Loaded user ID:', this.currentUserId);
        const currentUserInfo: User = {
          id: res.id,
          name: `${res.first_name || ''} ${res.last_name || ''}`.trim(),
          first_name: res.first_name,
          last_name: res.last_name,
          profile_image_path: res.profile_image_path,
          // لا توجد صورة افتراضية هنا
          avatar: res.profile_image_path ? `http://localhost:8000/storage/${res.profile_image_path}` : undefined // أو ''
        };
        this.usersMap.set(res.id, currentUserInfo);
      },
      error: (err) => {
        console.error('Failed to load user ID:', err);
      }
    });
  }

  setCurrentUserId(userId: number): void {
    this.currentUserId = userId;
  }

  getCurrentUserId(): number {
    return this.currentUserId;
  }

  setTempReceiverId(id: number | null): void {
    this.tempReceiverIdForChat.next(id);
  }

  getTempReceiverId(): number | null {
    return this.tempReceiverIdForChat.getValue();
  }

  // دالة مساعدة لجلب معلومات المستخدم من الخريطة
  getUserInfo(userId: number): User | undefined {
    return this.usersMap.get(userId);
  }

  fetchChatList(searchTerm?: string): Observable<ChatContact[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.append('search', searchTerm);
    }

    return this.http.get<User[]>(`${this.apiUrl}/chat/list`, { params, headers: this.headers })
      .pipe(
        map(users => users.map(user => {
          const userName = user.name || (user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : 'Unknown User');
          // لا توجد صورة افتراضية هنا
          const userAvatarPath = user.profile_image_path ? `http://localhost:8000/storage/${user.profile_image_path}` : undefined; // أو ''

          const processedUser: ChatContact = {
            ...user,
            name: userName,
            avatar: userAvatarPath, // تعبئة الـavatar بالمسار الكامل
            lastMessage: 'Tap to see chat',
            time: ''
          };
          this.usersMap.set(user.id, processedUser); // تخزين المستخدم في الخريطة
          return processedUser;
        })),
        catchError(error => {
          console.error('Error fetching chat list:', error);
          throw error;
        })
      );
  }

  getConversationMessages(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages/${userId}`, { headers: this.headers })
      .pipe(
        map(messages => messages.map(msg => {
          // جلب معلومات المُرسل والمُستقبل من الخريطة
          const senderInfo = this.getUserInfo(msg.user_sender_id) || {
            id: msg.user_sender_id,
            name: 'Unknown User',
            avatar: undefined // لا توجد صورة افتراضية هنا
          };
          const receiverInfo = this.getUserInfo(msg.user_receiver_id) || {
            id: msg.user_receiver_id,
            name: 'Unknown User',
            avatar: undefined // لا توجد صورة افتراضية هنا
          };

          return {
            ...msg,
            me: msg.user_sender_id === this.currentUserId,
            displayTime: formatDate(msg.created_at, 'shortTime', 'en-US'),
            sender_info: senderInfo, // إضافة معلومات المُرسل لكائن الرسالة
            receiver_info: receiverInfo // إضافة معلومات المُستقبل لكائن الرسالة
          };
        })),
        catchError(error => {
          console.error('Error getting conversation messages:', error);
          throw error;
        })
      );
  }

  sendMessage(receiverId: number, textContent: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/messages/send`, {
      receiver_id: receiverId,
      textContent: textContent
    }, { headers: this.headers })
      .pipe(
        map(response => {
          // جلب معلومات المستخدم الحالي والمستقبل للرسالة المُرسلة
          const senderInfo = this.getUserInfo(this.getCurrentUserId()) || {
            id: this.getCurrentUserId(),
            name: 'You',
            avatar: undefined // لا توجد صورة افتراضية هنا
          };
          const receiverInfo = this.getUserInfo(receiverId) || {
            id: receiverId,
            name: 'Recipient',
            avatar: undefined // لا توجد صورة افتراضية هنا
          };

          return {
            ...response,
            me: true,
            displayTime: formatDate(response.created_at || new Date().toISOString(), 'shortTime', 'en-US'),
            sender_info: senderInfo,
            receiver_info: receiverInfo
          };
        }),
        catchError(error => {
          console.error('Error sending message:', error);
          throw error;
        })
      );
  }

  startChat(receiverId: number): Observable<any> {
    const payload = { receiver_id: receiverId };
    return this.http.post<any>(`${this.apiUrl}/messages/start-chat`, payload, { headers: this.headers });
  }
}
