import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() value: string;
  @Input() keyvalue = "value";
  @Input() keylabel = "label";

  public show = false;
  public days = []
  public meses = [
    { mes: "janeiro", id: 1 },
    { mes: "fevereiro", id: 2 },
    { mes: "março", id: 3 },
    { mes: "abril", id: 4 },
    { mes: "maio", id: 5 },
    { mes: "junho", id: 6 },
    { mes: "julho", id: 7 },
    { mes: "agosto", id: 8 },
    { mes: "setembro", id: 9 },
    { mes: "outubro", id: 10 },
    { mes: "novembro", id: 11 },
    { mes: "dezembro", id: 12 },
  ]
  public semana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  meshoje = new Date().getMonth() + 1

  mesatual = new Date().getMonth() + 1
  diaatual = new Date().getDate()
  anoatual = new Date().getFullYear()
  selectmonth = false

  @Input() public placeholder = "dd/mm/aaaa";
  @Input() public color = "#161414fd";
  @Input() public topback = "#252473"
  @Input() public topcolor = "#ffffff"
  @Input() public width = "350px";
  @Input() public margin = "0";
  @Input() public auto;

  @Output() event: EventEmitter<any> = new EventEmitter();



  constructor(private eRef: ElementRef) {
    this.calcDays()
  }

  ngOnInit(): void {

  }


  public focus(evt) {
    this.show = true
    this.mesatual = new Date().getMonth() + 1
    this.diaatual = new Date().getDate()
    this.anoatual = new Date().getFullYear()
    this.selectmonth = false
  }

  select(day) {
    let d = String(day).padStart(2, "0")
    let m = String(this.mesatual).padStart(2, "0")
    this.value = `${d}/${m}/${this.anoatual}`
    this.event.emit(`${d}/${m}/${this.anoatual}`)
    this.show = false
  }

  nextMonth() {
    if (!this.selectmonth) {
      if (this.mesatual < 12) {
        this.mesatual++;
      } else {
        this.mesatual = 1
        this.anoatual++
      }
    }
    else {
      this.anoatual++
    }
    this.calcDays()
  }

  previousMonth() {
    if (!this.selectmonth) {
      if (this.mesatual > 1) {
        this.mesatual--;
      } else {
        this.mesatual = 12
        this.anoatual--
      }
    }
    else {
      this.anoatual--
    }
    this.calcDays()
  }

  calcDays() {
    var d = new Date(this.anoatual, this.mesatual, 0);
    var first = new Date(this.anoatual, this.mesatual - 1, 1);
    console.log(first)
    console.log(first.getDay())
    this.days = []
    for (let i = 0; i < first.getDay(); i++) {
      this.days.push("")
    }
    for (let i = 1; i <= d.getDate(); i++) {
      this.days.push(i)
    }
  }

  changeMonth(mes) {
    this.mesatual = mes.id
    setTimeout(() => {
      this.selectmonth = !this.selectmonth
    }, 50);
  }

  onChange(evt) {
    console.log(evt);
    if (evt.key != "Backspace") {
      this.value = this.value.split("").filter(str => str != "/").join("")
      if (this.value.length >= 2) {
        this.value = this.value.substring(0, 2) + "/" + this.value.substring(2, this.value.length)
      }
      if (this.value.length >= 5) {
        this.value = this.value.substring(0, 5) + "/" + this.value.substring(5, this.value.length)
      }
      if (this.value.length > 10) {
        this.value = this.value.substring(0, 10)
      }
      if (this.value.length >= 5) {
        this.mesatual = Number(this.value.substring(3, 5))
        this.calcDays()
      }
      if (this.value.length == 10) {
        this.anoatual = Number(this.value.substring(6, this.value.length))
        this.calcDays()
      }
    }

  }

  @HostListener('document:click', ['$event'])
  public lostFocus(evt) {
    this.show = this.eRef.nativeElement.contains(evt.target)
  }

}
