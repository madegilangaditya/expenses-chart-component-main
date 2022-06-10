function getChart() {
    fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let output = '';
      let maxVal = 0;
      const d = new Date();
      let day = d.getDay();
      data.forEach(function(chart){
        output += `<div class="grafik-value">
                        <span class="day">${chart.day}</span>
                        <div class="grafik-chart" data-val="${chart.amount}"></div>
                        <div class="grafik-count">$${chart.amount}</div>
                    </div>`;
        if(maxVal === 0){
            maxVal = chart.amount;
        }else{
            if(maxVal < chart.amount){
                maxVal = chart.amount;
            }
        }
        console.log(maxVal);
      });
      document.querySelector('.grafiks-wrap').innerHTML = output;
      document.querySelectorAll('.grafik-chart').forEach(function(data, index){
        const chart = data.dataset.val;
        let size = 150 / 100 * (chart / maxVal * 100);
        data.style.height = `${size}px`;

        if(day !== 0){
            if(day - 1   === index){
                data.classList.add('active');
            }
        }else{
            document.querySelector('.grafiks-wrap .grafik-value:last-child .grafik-chart').classList.add('active');
        }
        
      });
    })
    .catch(err => console.log(err));
  }

  getChart();