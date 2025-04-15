import { Component , AfterViewInit } from '@angular/core';
import * as AOS  from 'aos';

@Component({
  selector: 'app-agent-list',
  standalone: false,
  templateUrl: './agent-list.component.html',
  styleUrls:[ './agent-list.component.css']
})
export class AgentListComponent implements AfterViewInit {
ngAfterViewInit() {
  AOS.init({
    duration:800,
    once:false
  })
}
}
