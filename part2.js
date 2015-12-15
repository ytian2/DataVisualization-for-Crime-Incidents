

var margin = {top: 20, right: 20, bottom: 30, left: 120},
    width = 400 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

    d3.csv("crime.csv", function(error, data) {
          if (error) throw error;

    showBar();
    showChart(2014);
    showLineMonth(2014, "CHARLESTOWN");
    showLineWeek(2014, "CHARLESTOWN");

/*--------------draw Bar Chart------------*/

    function showBar(){

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

var barSvg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 var years = ["2013", "2014", "2015"];
 var pops = [];
 var Num2013=0, Num2014=0, Num2015=0;
 
  data.forEach(function(d){
 
          if((+d.Year) == 2013){Num2013 ++;}
          else if ((+d.Year)==2014){Num2014 ++;}
          else {Num2015 ++;};
          return;

          });

  pops = [Num2013, Num2014, Num2015];

   x.domain(years);
   y.domain([0, d3.max(pops)*1.1]);

  barSvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  barSvg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Crime Number");

  barSvg.selectAll(".bar")
      .data(pops)
    .enter().append("rect")
      .attr("class", "barrect")
      .style('fill',"#005b82")
      .attr("x", function(d, i) { return x(years[i]); })
      .attr("width", x.rangeBand())
      .attr("y", function(d,i) { return y(pops[i]); })
      .attr("height", function(d) { return height - y(d); })
      .on("mouseover", function(d,i){
                showChart(years[i]);
                d3.selectAll(".barrect").style("fill","#005b82"); 
                d3.select(this) .style("fill","#B0E0E6");          
            });

    }



/*--------------Create Table---------------*/

function tabulate(data, columns,year) {

    var table = d3.select("#table").append("table1");
                  
    
    var thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
        .attr("class","value")
            .text(function(d) { return d.value; })
            .on("mouseover", function(d,i){
              console.log("this",d3.select(this));

              d3.selectAll(".value").style("color","#005b82");
              d3.select(this).style("color","red");

              showLineMonth(year,d.value);
              showLineWeek(year,d.value);

                
            });
    
    return table;
}


/*------------------Call Table----------------*/

function showChart(year){
    
    d3.selectAll("table1").remove();
  
    var JPNum=0, SBNum=0, DONum=0, WBNum=0, RONum=0, DWNum=0, MANum=0, SENum=0, 
        BRNum=0, EBNum=0, HPNum=0, CHNum=0;

    data.forEach(function(d){
      if(+d.Year == year && d.ReptDistrName == "JAMAICA PLAIN"){ JPNum++;}
      else if(+d.Year == year && d.ReptDistrName == "SOUTH BOSTON"){ SBNum ++;}
      else if(+d.Year == year && d.ReptDistrName == "DORCHESTER"){ DONum ++;}
       else if(+d.Year == year && d.ReptDistrName == "WEST ROXBURY"){ WBNum ++;}
        else if(+d.Year == year && d.ReptDistrName == "ROXBURY"){ RONum ++;}
         else if(+d.Year == year && d.ReptDistrName == "DOWNTOWN"){ DWNum ++;}
          else if(+d.Year == year && d.ReptDistrName == "MATTAPAN"){ MANum ++;}
           else if(+d.Year == year && d.ReptDistrName == "SOUTH END"){ SENum ++;}
            else if(+d.Year == year && d.ReptDistrName == "BRIGHTON"){ BRNum ++;}
             else if(+d.Year == year && d.ReptDistrName == "EAST BOSTON"){ EBNum ++;}
             else if(+d.Year == year && d.ReptDistrName == "HYDE PARK"){ HPNum ++;}
             else if(+d.Year == year && d.ReptDistrName == "CHARLESTOWN"){ CHNum ++;}

             return;
    });    

var districtData = [
{District: "JAMAICA PLAIN", CrimeNumber: JPNum},
{District: "SOUTH BOSTON", CrimeNumber: SBNum},
{District: "DORCHESTER", CrimeNumber: DONum},
{District: "WEST ROXBURY", CrimeNumber: WBNum},
{District: "ROXBURY", CrimeNumber: RONum},
{District: "DOWNTOWN", CrimeNumber: DWNum},
{District: "MATTAPAN", CrimeNumber: MANum},
{District: "SOUTH END", CrimeNumber: SENum},
{District: "BRIGHTON", CrimeNumber: BRNum},
{District: "EAST BOSTON", CrimeNumber: EBNum},
{District: "HYDE PARK", CrimeNumber: HPNum},
{District: "CHARLESTOWN", CrimeNumber: CHNum}
];
                          
var districtTable = tabulate(districtData,["District","CrimeNumber"],year);

// uppercase the column headers
districtTable.selectAll("thead th")
    .text(function(column) {
        return column.charAt(0).toUpperCase() + column.substr(1);
    });
    
// sort by number
districtTable.selectAll("tbody tr")
    .sort(function(a, b) {
        return d3.ascending(a.CrimeNumber, b.CrimeNumber);
    });

  }


/*-------------Call Line 1------------*/

function showLineMonth(year, distrctName){

      d3.selectAll(".linechart").remove();

      //console.log("diMonth " + distrctName);
      //console.log("yearMonth" + year);

      var mon1 = 0, mon2=0, mon3=0, mon4=0, mon5=0, mon6=0, mon7=0, mon8=0,mon9=0,
          mon10=0, mon11=0, mon12=0;
      var popsMonth = [];

        data.forEach(function(d){

      if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "1")
        { mon1++;}
      else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "2")
        { mon2++;}
      else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "3")
        { mon3++;}
       else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "4")
        { mon4++;}
        else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "5")
          { mon5++;}
         else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "6")
          { mon6++;}
          else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "7")
            { mon7++;}
           else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "8")
            { mon8++;}
            else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "9")
              { mon9++;}
             else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "10")
              { mon10++;}
             else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "11")
              { mon11++;}
             else if(+d.Year == year && d.ReptDistrName == distrctName && d.Month == "12")
              { mon12++;}

             return;
    });    
  
        popsMonth = [mon1, mon2, mon3, mon4, mon5, mon6, mon7, mon8, mon9, mon10,
                     mon11, mon12];

        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                     "Oct", "Nov", "Dec"];
        
        //console.log("pops 1" + popsMonth);

        var line = d3.svg.line()
                  .interpolate("cardinal")
                  .x(function(d, i) { return x(month[i]); })
                  .y(function(d, i) { return y(popsMonth[i]); });

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


        var linesvg = d3.select("#line1")
                      .append("svg")
                      .attr("id", "linesvg")
                      .attr("class", "linechart")
                      .attr("width", width + margin.left + margin.right )
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", "translate(" + 30 + "," + margin.top + ")");

  
        x.domain(month);
        y.domain([0, d3.max(popsMonth)*1.2]);

        linesvg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height+ ")")
              .call(xAxis);

        linesvg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "translate("+70+",0)")
              //.attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Crime Number");

        linesvg.append("path")
              .datum(popsMonth)
              .attr("class", "line")
              .attr("d", line)
              .style("stroke","#6baed6")
              .attr("transform", "translate(10,-10)");

        var lineText = linesvg.selectAll(".lineText")
                      .data(popsMonth)
                      .enter()
                      .append("text")
                      .attr("class","lineText")
                      .attr("transform", "translate(10,-10)")
                      .attr("x", function(d,i) { return x(month[i]); })
                      .attr("y", function(d) { return y(d); })
                      .text(function(d, i){return popsMonth[i]});
  
}


/*-------------Call Line 2------------*/

function showLineWeek(year, distrctName){

      d3.selectAll(".linechart2").remove();

      var Mon = 0, Tue=0, Wed=0, Thu=0, Fri=0, Sat=0, Sun=0;
      var popsWeek = [];

        data.forEach(function(d){

      if(+d.Year == year && d.ReptDistrName == distrctName && d.DAY_WEEK == "Monday")
        { Mon++;}
      else if(+d.Year == year && d.ReptDistrName == distrctName && d.DAY_WEEK == "Tuesday")
        { Tue++;}
      else if(+d.Year == year && d.ReptDistrName == distrctName && d.DAY_WEEK == "Wednesday")
        { Wed++;}
       else if(+d.Year == year && d.ReptDistrName == distrctName && d.DAY_WEEK == "Thursday")
        { Thu++;}
        else if(+d.Year == year && d.ReptDistrName == distrctName && d.DAY_WEEK == "Friday")
          { Fri++;}
         else if(+d.Year == year && d.ReptDistrName == distrctName && d.DAY_WEEK == "Saturday")
          { Sat++;}
          else if(+d.Year == year && d.ReptDistrName == distrctName && d.DAY_WEEK == "Sunday")
            { Sun++;}

             return;
    });    
  
        popsWeek = [Mon, Tue, Wed, Thu, Fri, Sat, Sun];

        var week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        
        //console.log("pops Week" + popsWeek);

        var line = d3.svg.line()
                  .interpolate("cardinal")
                  .x(function(d, i) { return x(week[i]); })
                  .y(function(d, i) { return y(popsWeek[i]); });

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

        var linesvg2 = d3.select("#line2")
                      .append("svg")
                      .attr("id", "linesvg2")
                      .attr("class", "linechart2")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", "translate(" + 50 + "," + margin.top + ")");
  
        x.domain(week);
        y.domain([0, d3.max(popsWeek)*1.2]);

        linesvg2.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height+ ")")
              .call(xAxis);

        linesvg2.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "translate("+70+",0)")
              //.attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Crime Number");

        linesvg2.append("path")
              .datum(popsWeek)
              .attr("class", "line")
              .attr("d", line)
              .style("stroke","#6baed6")
              .attr("transform", "translate(10,-10)");

        var lineText = linesvg2.selectAll(".lineText")
                      .data(popsWeek)
                      .enter()
                      .append("text")
                      .attr("class","lineText")
                      .attr("transform", "translate(10,-10)")
                      .attr("x", function(d,i) { return x(week[i]); })
                      .attr("y", function(d) { return y(d); })
                      .text(function(d, i){return popsWeek[i]});
  
}

});