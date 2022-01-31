import React, { Component } from 'react';
import './App.css'

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       month:'',
       year:'',
       date:'',
       months:[],
       years:[],
       dates:[],
       monthName:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
       success:false,
       error:false
    }
  }
  
  componentDidMount=()=>{
    this.addDate(31)
    this.addMonth();
    this.addYear();
  }

  componentDidUpdate=(prevProps, prevState)=>{
    if(prevState.month !== this.state.month){
        let month = parseInt(this.state.month)
        let date = parseInt(this.state.date)
        let year = parseInt(this.state.year)
        
        if (month !== undefined) {      
            this.setState({dates:[]})
            if (month === 2) {
                if (year !== undefined) {
                    if (this.isLeapYear(year)) {
                        this.addDate(29)
                    } else {
                        this.addDate(28)
                    }
                    if (date <= 28) {
                        this.setState({date:date})
                    }
                }
            } else if (month === 4 || month === 6 || month === 8 || month === 11) {
                if (date === 31) {
                    this.addDate(30)
                } else {
                    this.addDate(30)
                    this.setState({date:date})
                }
            } else {
                this.addDate(31)
                this.setState({date:date})
            }
        }
      }
  }
  addDate=(value)=>{
    let arr=[]
    for (let i = 1; i <= value; i++) {
        arr.push(i)
    }
    this.setState({dates:arr})
  }
  addMonth=()=>{
      let arr=[]
      for (let i = 1; i <= 12; i++) {
          arr.push(i)
      }
      this.setState({months:arr})
  }

  addYear=()=>{
      let arr=[]
      for (let i = 1920; i <= new Date().getFullYear(); i++) {
          arr.push(i)
      }
      this.setState({years:arr})
  }
  isLeapYear=(year)=>{
      year = parseInt(year);
      if (year % 4 !== 0) {
          return false;
      } else if (year % 400 === 0) {
          return true;
      } else if (year % 100 === 0) {
          return false;
      } else {
          return true;
      }
  }
  update=()=>{   
      let month = parseInt(this.state.month)
      let date = parseInt(this.state.date)
      let year = parseInt(this.state.year)

      if (month !== undefined) {      
          this.setState({dates:[]})
          if (month === 2) {
              if (year !== undefined) {
                  if (this.isLeapYear(year)) {
                      this.addDate(29)
                  } else {
                      this.addDate(28)
                  }
                  if (date <= 28) {
                      this.setState({date:date})
                  }
              }
          } else if (month === 4 || month === 6 || month === 8 || month === 11) {
              if (date === 31) {
                  this.addDate(30)
              } else {
                  this.addDate(30)
                  this.setState({date:date})
              }
          } else {
              this.addDate(31)
              this.setState({date:date})
          }
      }
  }

  handleNextClick=(e)=>{
      this.setState({success:false,error:false})
      var today = new Date();
      var age = today.getFullYear() - this.state.year;

      var m = (today.getMonth() + 1) - this.state.month;
      console.log(age);
      if (m < 0 || (m === 0 && today.getDate() <= this.state.date)) {
          age--;
      }
      console.log(age);
      if (age >= 13) {
          this.setState({success:true,error:false})
      } else {
          this.setState({error:true,success:false})   
      }
  }

  render() {
    return <div>
      <div className="navbar">
          <div className="navbar-content">
              <p>Join Facebook</p>
          </div>
      </div>
      <div className="container">
          <h1>What's your Date Of Birth?</h1>
          <p>Chooose your date of birth. You can always make this private later.</p>
          <div className="content">
              <div id={this.state.success ? 'success': this.state.error ? 'error':''}>
                  {this.state.success ? "You can't proceed futher" :this.state.error ? "Sorry , You can't proceed futher your age is less than 13 years" :' '}
              </div>
              <h4 style={{textAlign:"left"}}>Date of Birth</h4>
              <div className="dob">
                  <div>
                      <label for="date"></label>
                      <select id="date" onChange={(e) => this.setState({date:e.target.value})}>
                          <option value=""></option>
                          {this.state.dates.map(date => <option key={date} value={date}>{date}</option>)}
                        </select>
                  </div>
                  <div>
                      <label for="month"></label>
                      <select id="month" onChange={(e) => this.setState({month:e.target.value})}>
                          <option value=""></option>     
                          {this.state.months.map((month,index) => <option key={month} value={month}>{this.state.monthName[index]}</option>)}    
                        </select>
                  </div>
                  <div>
                      <label for="year"></label>
                      <select id="year" onChange={(e) => this.setState({year:e.target.value})}>
                          <option value=""></option>   
                          {this.state.years.map(year => <option key={year} value={year}>{year}</option>)}    
                      </select>
                  </div>
              </div>
              <button id="next" onClick={()=>this.handleNextClick()}>Next</button>
          </div>
      </div>
    </div>;
  }
}

export default App;
