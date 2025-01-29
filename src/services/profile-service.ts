import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;
  email: string = "";
  password: string = "";

constructor(private http: HttpClient) {}

private getHttpOptions() {
    const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa('username:password')
    });
    return { headers: headers };
}

  signup(profile: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, profile);
  }

  getUserDetails(email: string, password: string): Observable<any> {
    this.email = email;
    this.password = password;
    if(localStorage.getItem('token')!=null)
    {
      const headers=new HttpHeaders({
        'Authorization': 'Basic ' + localStorage.getItem('token')
    });
    return this.http.get<any>(`${this.apiUrl}/user-details`, { 
      headers,
      withCredentials: true
  });
    }
    else{
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${email}:${password}`)
    });
      return this.http.get<any>(`${this.apiUrl}/user-details`, this.getHttpOptions());
    }
  
  }

  getUserProfile(uid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user-profile`, {
      params: { uid }
    });
  }

  searchUserProfile(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + localStorage.getItem('token')
  });
    return this.http.get<any>(`${this.apiUrl}/search`, { 
      headers,
      withCredentials: true,
      params: { q: query }
  });
    // return this.http.get<any>(`${this.apiUrl}/search`, {
    //   params: { q: query }
    // });
  }
}