import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DownloadFormModel, VariationsTableModel} from '@models';
import { HttpService } from '@services';

@Component({
  selector: 'hashhouse-panel-download',
  templateUrl: './panel-download.component.html',
  styleUrls: ['./panel-download.component.scss'],

})
export class PanelDownloadComponent {
  //@ts-ignore
  pathUri: string = window.myPostData

  @Input() slug?: string = '';
  @ViewChild("downloadFormSection") downloadFormSection!: ElementRef;

  navigateToForm() {
    this.downloadFormSection.nativeElement.scrollIntoView();
  }

  @Output() onDownloadClick = new EventEmitter<DownloadFormModel>();

  downloadForm: FormGroup;

  get isDisabledSubmit() {
    return !this.downloadForm.valid;
  }

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
  ) {
    this.downloadForm = this.formBuilder.group({
      name: '',
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i)]],
    });
  }

  submitForm() {
    let self = this;
    if (this.downloadForm.valid) {
      const model = this.convertFormToModel();
      this.httpService.sendDownloadForm(this.slug ?? '', model)
        .subscribe(({message}) => {
          self.downloadForm.reset()
          alert(message);
        });
    }
    else {
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

  notImplemented() {
    alert("Not implemented yet");
  }
}
