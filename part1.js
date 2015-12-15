
    d3.csv("crime.csv", function(error, data1) {
          if (error) throw error;
    
          drawHorizontalBar();
          showWordCloud("BRIGHTON");
          showMenu("BRIGHTON");
      
/*---------function to draw a horizontal bar chart--------------*/

function drawHorizontalBar() {

    var margin = {top: 10, right: 20, bottom: 20, left: 20},
    width = 400 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

    var categories = ["BRIGHTON", "CHARLESTOWN", "DORCHESTER", "DOWNTOWN", "EAST BOSTON",
                      "HYDE PARK", "JAMAICA PLAIN", "MATTAPAN", "ROXBURY", "SOUTH BOSTON",
                      "SOUTH END", "WEST ROXBURY"];

    var crimeNumbers = [6708,1998,12743,12095,4743,5056,5509,8983,15050,6741,15112,4053];

    var x = d3.scale.linear()
        .domain([1000,16000])
        .range([0, 300]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var y = d3.scale.linear()
        .domain([-1,categories.length])
        .range([height,1]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(1)
        .tickFormat(function(d,i){ return categories[i]; })
        .tickValues(d3.range(13));;


    var horizontalBarsvg = d3.select("#horizontalBar").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + 90 + "," + margin.top + ")");

    horizontalBarsvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("transform", "translate(" + 300 + ","+ (-15) +")")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("crime number");

    horizontalBarsvg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    horizontalBar = horizontalBarsvg.selectAll(".horizontalBar")
        .data(crimeNumbers)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x",0) 
        //.attr("stroke", "black")
        .style('fill',"#005b82")
        .attr("width", function(d, i) { return x(crimeNumbers[i]); })
        .attr("y", function(d, i) { return y(i)-5; })
        .attr("height", 10)
        .on("mouseover", function(d,i){
                showWordCloud(categories[i]);
               d3.selectAll(".bar").style("fill","#005b82");
               d3.select(this).style("fill","#B0E0E6");
            })
        .on("click", function(d,i){
                showMenu(categories[i]);
                d3.selectAll(".bar").style("fill","#005b82");
                d3.select(this).style("fill","#B0E0E6");
            });

}

/*----------function to draw word cloud------------*/

    function showWordCloud(data2){

      d3.selectAll(".wordCloud").remove();

   var fill = d3.scale.category20();

    d3.csv("word_cloud.csv", function(d) {

        if(d.ReptDistrName == data2 && data2== "BRIGHTON")
          return {
          text: d.STREETNAME,
          size: +d.Freq/10
        } 
        else if (d.ReptDistrName == data2 && data2== "CHARLESTOWN")
          return {
          text: d.STREETNAME,
          size: +d.Freq/3
        } 
        else if (d.ReptDistrName == data2 && data2== "DORCHESTER")
          return {
          text: d.STREETNAME,
          size: +d.Freq/8
        }    
        else if (d.ReptDistrName == data2 && data2== "DOWNTOWN")
          return {
          text: d.STREETNAME,
          size: +d.Freq/9
        }    
        else if (d.ReptDistrName == data2 && data2== "EAST BOSTON")
          return {
          text: d.STREETNAME,
          size: +d.Freq/9
        }    
        else if (d.ReptDistrName == data2 && data2== "HYDE PARK")
          return {
          text: d.STREETNAME,
          size: +d.Freq/5
        }    
        else if (d.ReptDistrName == data2 && data2== "JAMAICA PLAIN")
          return {
          text: d.STREETNAME,
          size: +d.Freq/5
        }    
        else if (d.ReptDistrName == data2 && data2== "MATTAPAN")
          return {
          text: d.STREETNAME,
          size: +d.Freq/7
        }    
        else if (d.ReptDistrName == data2 && data2== "ROXBURY")
          return {
          text: d.STREETNAME,
          size: +d.Freq/9
        }    
        else if (d.ReptDistrName == data2 && data2== "SOUTH BOSTON")
          return {
          text: d.STREETNAME,
          size: +d.Freq/5
        }    
        else if (d.ReptDistrName == data2&& data2== "SOUTH END")
          return {
          text: d.STREETNAME,
          size: +d.Freq/10
        } 
        else if (d.ReptDistrName == data2 && data2== "WEST ROXBURY")
          return {
          text: d.STREETNAME,
          size: +d.Freq/4
        }       
      },

      function(data) {
        d3.layout.cloud().size([395, 395]).words(data)
          .rotate(function() {
            return ~~(Math.random() * 2) * 90;
          })
          .font("Impact")
          .fontSize(function(d) {return d.size;})
          .on("end", draw)
          .start();

        function draw(words) {
          //console.log(words);
          d3.select("#wordCloud").append("svg")
            .attr("class", "wordCloud")
            .attr("width", 1000)
            .attr("height", 600)
            .append("g")
            .attr("transform", "translate(200,200)")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) {
              return d.size + "px";
            })
            .style("font-family", "Impact")
            .style("fill", function(d, i) {
              return fill(i);
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) {
              return d.text;
            });
        }
      });

}

/*----------function to show drop-down menu----------*/

         function showMenu(data3){

        d3.selectAll(".menu").remove();

        var district_menu=[];
        var i1=0; i2=0, i3=0, i4=0, i5=0, i6=0, i7=0, i8=0,i9=0, i10=0, i11=0, i12=0;

d3.csv("word_cloud.csv", function(data) {
         
         data.forEach(function(d){

          if((d.ReptDistrName) == "BRIGHTON" && data3=="BRIGHTON"){district_menu[++i1] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "CHARLESTOWN" && data3=="CHARLESTOWN"){district_menu[++i2] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "DORCHESTER" && data3=="DORCHESTER"){district_menu[++i3] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "DOWNTOWN" && data3=="DOWNTOWN"){district_menu[++i4] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "EAST BOSTON" && data3=="EAST BOSTON"){district_menu[++i5] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "HYDE PARK" && data3=="HYDE PARK"){district_menu[++i6] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "JAMAICA PLAIN" && data3=="JAMAICA PLAIN"){district_menu[++i7] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "MATTAPAN" && data3=="MATTAPAN"){district_menu[++i8] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "ROXBURY" && data3=="ROXBURY"){district_menu[++i9] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "SOUTH BOSTON" && data3=="SOUTH BOSTON"){district_menu[++i10] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "SOUTH END" && data3=="SOUTH END"){district_menu[++i11] = d.STREETNAME;}
          else if ((d.ReptDistrName) == "WEST ROXBURY" && data3=="WEST ROXBURY"){district_menu[++i12] = d.STREETNAME;}
 
          });
       
       district_menu[0]="---PLEASE CHOOSE A STREET BELOW---";

var select = d3.select('#menu').append('select')
    .attr('class',"menu")
    .on('change',onchange)

var options = select.selectAll('option')
         .data(district_menu).enter()
         .append('option')
         .text(function (d) { return d; })
         .sort(function(a, b) {
        return d3.ascending(a, b);
    });

function onchange() {

  var chosenStreet = d3.select('select').property('value');

    showBarMonth(chosenStreet);
    showHeatMap(chosenStreet);
    showWeapon(chosenStreet);

};

          showBarMonth("BRIGHTON AV");
          showHeatMap("BRIGHTON AV");
          showWeapon("BRIGHTON AV");

 /*---------A bar chart to show crime number in month of each street.-----------*/

    function showBarMonth(chosenStreet){

      d3.selectAll(".barMonth").remove();
  
      var mon1 = 0, mon2=0, mon3=0, mon4=0, mon5=0, mon6=0, mon7=0, mon8=0,mon9=0,
          mon10=0, mon11=0, mon12=0;
  
      var popsMonth = [];

              data1.forEach(function(d){

      if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "1")
        { mon1++;}
      else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "2")
        { mon2++;}
      else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "3")
        { mon3++;}
       else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "4")
        { mon4++;}
        else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "5")
          { mon5++;}
         else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "6")
          { mon6++;}
          else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "7")
            { mon7++;}
           else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "8")
            { mon8++;}
            else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "9")
              { mon9++;}
             else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "10")
              { mon10++;}
             else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "11")
              { mon11++;}
             else if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.Month == "12")
              { mon12++;}

             return;
    });   

 popsMonth = [mon1, mon2, mon3, mon4, mon5, mon6, mon7, mon8, mon9, mon10,
                     mon11, mon12];

var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 600 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
               "Oct", "Nov", "Dec"];

  var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
            .range([height, 0]);

  var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

  var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

  x.domain(month);
  y.domain([0, d3.max(popsMonth)*1.1]);

  var barMonthsvg = d3.select("#barMonth").append("svg")
      .attr("class","barMonth")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + 2*margin.left + "," + margin.top + ")");

  barMonthsvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  barMonthsvg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      //.attr("transform", "rotate(-90)")
      .attr("transform", "translate("+ 70 +"," + (-10) +")")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Crime Number");

        var rect = barMonthsvg.selectAll(".barMonth")
                        .data(popsMonth)
                      .enter().append("rect")
                      .attr("x", function(d, i) { return x(month[i]); })
                      .attr("width", x.rangeBand())
                      .attr("y", function(d,i) { return y(popsMonth[i]); })
                      .attr("height", function(d) { return height - y(d); })
                      .style("fill", "#B0E0E6");
      
              //console.log("popsMonth",popsMonth);

            
} 
    /*-----------function to draw heat map based on day and hour----------*/

   function showHeatMap(chosenStreet){

      d3.selectAll(".heatmap").remove();

      var margin = { top: 30, right: 0, bottom: 30, left: 30 },
          width = 600 - margin.left - margin.right,
          height = 280 - margin.top - margin.bottom,
          gridSize = Math.floor(width / 24),
          legendElementWidth = gridSize*2,
          buckets = 9,
          scale=[0,1,2,3,5,7,9,11,13],
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], 
          days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          times = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", 
                   "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];

      var svg = d3.select("#chart").append("svg")
          .attr("class","heatmap")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var dayLabels = svg.selectAll(".dayLabel")
          .data(days)
          .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { 
              return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); 
            });

      var timeLabels = svg.selectAll(".timeLabel")
          .data(times)
          .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { 
              return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); 
            });

            var heatmapChart = function(csvFile) {
        d3.csv(csvFile,
        function(d) {
          if(d.ReptDistrName == data3 && d.STREETNAME == chosenStreet)
          return {
            day: +d.DAY_WEEK,
            hour: +d.HOUR,
            value: +d.Freq
          };
        },
        function(error, data) {
          var colorScale = d3.scale.quantile()
              .domain([0, buckets - 1, 13])
              //.domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
              .range(colors);

          var cards = svg.selectAll(".hour")
              .data(data, function(d) {return d.day+':'+d.hour;});

          cards.append("title");

          cards.enter().append("rect")
              .attr("x", function(d) { return (d.hour - 1) * gridSize; })
              .attr("y", function(d) { return (d.day - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", colors[0]);

          cards.transition().duration(1000)
              //.style("fill", function(d) { return colorScale(d.value); });
              .style("fill", function(d) { 
                if(d.value>=0 && d.value<1) return colors[0];
                else if(d.value>=1 && d.value<2) return colors[1];
                else if(d.value>=2 && d.value<3) return colors[2];
                else if(d.value>=3 && d.value<5) return colors[3];
                else if(d.value>=5 && d.value<7) return colors[4];
                else if(d.value>=7 && d.value<9) return colors[5];
                else if(d.value>=9 && d.value<11) return colors[6];
                else if(d.value>=11 && d.value<13) return colors[7];
                else if(d.value>=13) return colors[8];
              });

          cards.select("title").text(function(d) { return d.value; });
          
          cards.exit().remove();

          var legend = svg.selectAll(".legend")
              .data([0].concat(colorScale.quantiles()), function(d,i) { return scale[i]; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", 200)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d,i) { return "≥ " + scale[i]; })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", 200 + gridSize);

          legend.exit().remove();

        });  
      };
      //Math.round(d)

      heatmapChart("heatmap.csv");
}


    /*----------function to show weapon type------------*/

    function showWeapon(chosenStreet){

      d3.selectAll(".weaponText").remove();

      var weapon_blunt=0, weapon_firearm=0, weapon_knife=0, weapon_cutting=0, weapon_none=0,
          weapon_other=0, weapon_personal=0, weapon_unarmed=0;

      data1.forEach(function(d){

        if(d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.WEAPONTYPE =="Blunt Object")
        {weapon_blunt++}
      else if (d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.WEAPONTYPE =="Firearm")
        {weapon_firearm++}
      else if (d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.WEAPONTYPE =="Knife")
        {weapon_knife++}
      else if (d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.WEAPONTYPE =="Knife/Cutting Instrument")
        {weapon_cutting++}
      else if (d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.WEAPONTYPE =="None")
        {weapon_none++}
      else if (d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.WEAPONTYPE =="Other")
        {weapon_other++}
      else if (d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.WEAPONTYPE =="Personal Weapon (hand foot etc.)")
        {weapon_personal++}
      else if (d.STREETNAME == chosenStreet && d.ReptDistrName == data3 && d.WEAPONTYPE =="Unarmed")
        {weapon_unarmed++}
          
      });
  
        var weapon_number=["Blunt"+":  "+weapon_blunt, "Firearm"+":  "+weapon_firearm, 
                           "  Knife/Cutting"+":  "+(weapon_cutting+weapon_knife), 
                            "  Personal Weapon"+":  "+ weapon_personal,  
                           "  Unarmed"+":  "+(weapon_unarmed+weapon_none),
                           "  Other"+":  "+weapon_other];

         var margin = { top: 20, right: 0, bottom: 0, left: 10 },
          width = 600 - margin.left - margin.right,
          height = 50 - margin.top - margin.bottom;

         var textSvg = d3.select("#weaponText").append("svg")
                         .attr("class","weaponText")
                         .attr("width", width + margin.left + margin.right)
                         .attr("height", height + margin.top + margin.bottom)
                         .append("g")
                         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


             textSvg.append("text")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("font-family","sans-serif")
                    .attr("font-size", "15")
                    .attr("fill", "black")
                    .attr("id", "clickone")
                    .text(function(d,i){
                        return weapon_number;
                      });
    

    //console.log("num",weapon_number);

     
}


});
}
});
       

