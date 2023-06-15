import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http/http.service';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  error: any = '';
  public barChartLegend = true;
  public barChartPlugins = [];
  datainicial = this.dataIni.transform(Date.now(), "yyyy-MM-dd")

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | any;
 
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      { data: [900, 1500, 1800, 600, 1000, 866], 
        backgroundColor: [ '#ff6384', '#36a2eb', '#cc65fe','#ffce56', '#642f92', '#f40f40'],
        label: 'Sales review and forecast' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  constructor(private http: HttpService, 
    private currency: CurrencyPipe,
    public dataIni: DatePipe,
    private modalService: NgbModal) {}

  ngOnInit(): void {}


 

 
}
