import { Component, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ContactService } from "../services/contact.service";
import { Contact } from "../model/contact.interface";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: "./contact-form.component.html",
  styleUrl: "./contact-form.component.css",
})
export default class ContactFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private contactService = inject(ContactService);
  private route = inject(ActivatedRoute);
  form?: FormGroup;
  contact?: Contact;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.contactService.get(parseInt(id)).subscribe((contact) => {
          this.contact = contact;
          this.form = this.fb.group({
            name: [contact.name, Validators.required],
            phone: [contact.phone, Validators.required],
            email: [contact.email, Validators.required],
          });
        });
      } else {
        this.form = this.fb.group({
          name: ["", Validators.required],
          phone: ["", Validators.required],
          email: ["", Validators.required],
        });
      }
    });
  }

  save() {
    if (this.contact) {
      this.contactService
        .update(this.contact.id, this.form!.value)
        .subscribe(() => {
          this.router.navigate(["/"]);
        });
    } else {
      this.contactService.create(this.form!.value).subscribe(() => {
        this.router.navigate(["/"]);
      });
    }
  }
}
