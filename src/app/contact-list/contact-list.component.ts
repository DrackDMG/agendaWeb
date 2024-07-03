import { Component, OnInit, inject } from "@angular/core";
import { ContactService } from "../services/contact.service";
import { DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Contact } from "../model/contact.interface";

@Component({
  selector: "app-contact-list",
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: "./contact-list.component.html",
  styleUrl: "./contact-list.component.css",
})
export default class ContactListComponent implements OnInit {
  private contactService = inject(ContactService);

  contacts: Contact[] = [];

  ngOnInit() {
    this.contactService.list().subscribe((contacts) => {
      this.contacts = contacts;
      console.log(contacts);
    });
  }

  deleteContact(id: number) {
    this.contactService.delete(id).subscribe(() => {
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
    });
  }
}
