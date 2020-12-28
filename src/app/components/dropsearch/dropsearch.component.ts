import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dropsearch',
  templateUrl: './dropsearch.component.html',
  styleUrls: ['./dropsearch.component.scss']
})
export class DropsearchComponent implements OnInit {

  @Input() values = [];
  @Input() keyvalue = "value";
  @Input() keylabel = "label";

  public list = [];
  public value = "";
  public selected: number = 0;
  public valueselected = null;
  public show = false;

  @Input() public placeholder = "Selecione um item...";
  @Input() public color = "#161414fd";
  @Input() public width = "350px";
  @Input() public margin = "0";
  @Input() public auto;

  @Output() event: EventEmitter<any> = new EventEmitter();

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {
    this.list = this.values
    if (this.auto) {
      let res = this.values.find(item => item[this.keyvalue] == this.auto)
      if (res) {
        this.value = res[this.keylabel] + " (" + res[this.keyvalue] + ")"
        this.valueselected = res[this.keyvalue]
      }
    }
  }


  public focus(evt) {
    console.log(evt);
    let el  = document.activeElement
    console.log(el.clientTop);
    this.show = true
    this.list = this.values
    this.selected = 0
  }

  select(item) {
    console.log(item);
    this.value = item[this.keylabel] + " (" + item[this.keyvalue] + ")"
    this.valueselected = item[this.keyvalue];
    this.event.emit(item[this.keyvalue])
    this.show = false;
  }

  onChange(evt) {
    if (evt.key == 'ArrowDown') {
      if (this.selected > 0) this.list[this.selected - 1]['isselected'] = false;
      this.selected = this.selected + 1 < this.list.length + 1 ? this.selected + 1 : 1;
      this.list[this.selected - 1]['isselected'] = true;
      this.value = this.list[this.selected - 1][this.keylabel] + " (" + this.list[this.selected - 1][this.keyvalue] + ")"
      this.valueselected = this.list[this.selected - 1][this.keyvalue]
      this.event.emit(this.list[this.selected - 1][this.keyvalue])
    }
    else if (evt.key == 'ArrowUp') {
      if (this.selected > 0) this.list[this.selected - 1]['isselected'] = false;
      this.selected = this.selected - 1 > 0 ? this.selected - 1 : this.list.length;
      this.list[this.selected - 1]['isselected'] = true;
      this.value = this.list[this.selected - 1][this.keylabel] + " (" + this.list[this.selected - 1][this.keyvalue] + ")"
      this.valueselected = this.list[this.selected - 1][this.keyvalue]
      this.event.emit(this.list[this.selected - 1][this.keyvalue])
    } else {
      this.list = this.values
      this.list = this.values.filter((item: any) => {
        try {
          return (item[this.keylabel].toUpperCase().indexOf(this.value.toUpperCase()) > -1 || String(item[this.keyvalue]).toUpperCase().indexOf(this.value.toUpperCase()) > -1)
        } catch (_) {
          return false
        }
      })
    }
  }

  @HostListener('document:click', ['$event'])
  public lostFocus(evt) {
    this.show = this.eRef.nativeElement.contains(evt.target)
  }
}
