import { Component, 
  ComponentFactoryResolver, ComponentRef, 
  Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  public dialogTitle!: string;
  public componentRef!: ComponentRef<any>;
  @ViewChild('target', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.container.clear(); 
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.dataFromDialog = this.data.dataComponent;

    this.dialogTitle = this.data.dataComponent.title;
  }

  close(): void {
    if (typeof this.componentRef.instance.cancel === "function") {
      this.componentRef.instance?.cancel();
    } else {
      this.dialogRef.close();
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  } 

}