import { Component, inject } from '@angular/core';
import { Apikeys, ApiKeysService } from './api-keys.service';
import { AuthService } from './authService.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  editApiKey: string | null = null
  apikeyService = inject(ApiKeysService);
  apikey: Apikeys = {id: '', apikey: ''}
  apikeys: Apikeys[] = []

  constructor(private authService: AuthService) {}

  ngOnInit(){
        this.apikeyService.getKeys().subscribe(data => this.apikeys = data);
    }

  addapikey(){
    this.apikeyService.addApiKey(this.apikey);
    this.resetForm()
  }

  resetForm(){
    this.apikey = {
      id: '',
      apikey: '',
      
    }
    this.editApiKey = null;
  }
  setEditKeyID(editApiKey: Apikeys){
    this.apikey = { ... editApiKey};
    this.editApiKey = editApiKey.id;
  }
  deleteApiKey(deleteApiKey: Apikeys){
    this.apikeyService.deleteApiKey(deleteApiKey);
  }
  updateApiKey(){
    this.apikeyService.updateApiKey(this.apikey)
    this.resetForm();
  }
  logout(){
    this.authService.logout();
  }

}
