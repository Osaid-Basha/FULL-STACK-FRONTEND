import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

export interface User {
  id: number;
  name: string;
  avatar?: string;
  first_name?: string;
}

export interface Message {
  id: number;
  user_sender_id: number;
  user_receiver_id: number;
  textContent: string;
  created_at: string;
  me?: boolean;
  displayTime?: string;
}

export interface ChatContact extends User {
  lastMessage?: string;
  time?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://127.0.0.1:8081/api';
  private fixedAuthToken = '4|nKkcXPEzM7sw179yD1wtyDpmsMkjK2vx85FnYI1qebb177af';
  private currentUserId: number = 10;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.updateAuthHeaders();
  }

  private updateAuthHeaders(): void {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.fixedAuthToken}`
    });
  }

  setCurrentUserId(userId: number): void {
    this.currentUserId = userId;
  }

  getCurrentUserId(): number {
    return this.currentUserId;
  }

  fetchChatList(searchTerm?: string): Observable<ChatContact[]> {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.append('search', searchTerm);
    }
    return this.http.get<User[]>(`${this.apiUrl}/chat/list`, { params, headers: this.headers })
      .pipe(
        map(users => users.map(user => {
          return {
            ...user,
            name: user.name || user.first_name || 'Unknown User',
            lastMessage: 'Tap to see chat',
            time: ''
          } as ChatContact;
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
        map(messages => messages.map(msg => ({
          ...msg,
          me: msg.user_sender_id === this.currentUserId,
          displayTime: formatDate(msg.created_at, 'shortTime', 'en-US')
        }))),
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
        catchError(error => {
          console.error('Error sending message:', error);
          throw error;
        })
      );
  }
}
