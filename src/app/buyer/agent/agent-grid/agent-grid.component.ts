import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-agent-grid',
  standalone: false,
  templateUrl: './agent-grid.component.html',
  styleUrls: ['./agent-grid.component.css']
})
export class AgentGridComponent implements OnInit {

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      once: false
    });
  }
}

