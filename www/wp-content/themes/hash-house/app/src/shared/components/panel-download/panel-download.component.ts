import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DownloadFormModel, VariationsTableModel } from '@models';
import { HttpService } from '@services';

@Component({
  selector: 'hashhouse-panel-download',
  templateUrl: './panel-download.component.html',
  styleUrls: ['./panel-download.component.scss'],

})
export class PanelDownloadComponent {
  @Input() dwCount?: number = 0;
  @Input() count?: number = 0;
  @Input() url?: string = '';
  @Input() slug?: string = '';
  @ViewChild("downloadFormSection") downloadFormSection!: ElementRef;

  @Output() onDownloadClick = new EventEmitter<DownloadFormModel>();

  protected showFormValidation = false;

  downloadForm: FormGroup;

  get isDisabledSubmit() {
    return !this.downloadForm.valid;
  }

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
  ) {
    this.downloadForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)]],
    });
  }

  submitForm() {
    this.showFormValidation = true;

    let self = this;
    if (this.downloadForm.valid) {
      const model = this.convertFormToModel();
      this.httpService.sendDownloadForm(this.slug ?? '', model)
        .subscribe(({ message }) => {
          self.downloadForm.reset()
          console.log(message);
        });

      setTimeout(function () {
        alert('Your message has been delivered');
      }, 1000);
    }
    else {
      this.showFormValidation = true;
      alert("Form is invalid");
    }
  }

  convertFormToModel(): DownloadFormModel {
    const model: DownloadFormModel = {
      name: this.downloadForm.value.name,
      mail: this.downloadForm.value.email,
    };

    return model;
  }

  isNotValidInput(name: string) {
    return this.downloadForm.get(name)?.invalid;
  }

  isRequiredInput(name: string) {
    return this.downloadForm.get(name)?.hasValidator(Validators.required);
  }

  navigateToForm() {
    this.downloadFormSection.nativeElement.scrollIntoView();
  }
}
