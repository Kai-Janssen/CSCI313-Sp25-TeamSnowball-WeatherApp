import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-form',
  imports: [ReactiveFormsModule],
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  issueForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.issueForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.issueForm.valid) {
      const formData = this.issueForm.value;
      console.log('Reported Issue:', formData);
      this.submitted = true;
      this.issueForm.reset();
    }
  }
}
