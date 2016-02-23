App.Views.CountryView = Backbone.View.extend({
  el: '#content',

  initialize: function(){
    $('#content').empty();
    this.box1Template = Handlebars.compile($('#template1').html());
    this.box2Template = Handlebars.compile($('#template2').html());
    this.box3Template = Handlebars.compile($('#template3').html());
    this.renderAll();
    this.renderViz();
    console.log(this)
    this.listenTo(this.collection, 'sync', this.renderViz)
  },

  renderAll: function(){
    this.$el.append(this.box1Template({title: "Most Visited Countries", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}));
    this.$el.append(this.box2Template({title: "Time Spent In Countries", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}));
    this.$el.append(this.box3Template({title: "Country Related Visualization", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}));
  },

  renderViz: function(){
    var allTrips = this.collection;
    var allCountries = _.uniq(allTrips.pluck('country'))
    var data = []
    _.each(allCountries, function(thisCountry){
      var temp = allTrips.where({'country': thisCountry})
      data.push(temp)
    })
    // var data = [{country: "Sweden", number: 4, length:23}, {country: "Norway", number: 8, length: 12}, {country: "Denmark", number: 15, length: 45}];
    var color = d3.scale.ordinal()
    .range(["#046b99", "#00a6d2", "#9bdaf1", "#e59393", "#cd2026", "#981b1e", "#f9c642", "#4aa564"]);
      var rects = d3
      .select('#box1')
      .selectAll('rect')
      .data(data)
      .enter().append('rect')
      var max = d3.max(data, function(d){
        return d.length;
      })
      var linearScale = d3.scale.linear().range([0, 300]).domain([0,max])
      rects.attr('x', 0).attr('y', function(d, i){return i*22}).attr('height', 20).attr('width', function(d){
        return linearScale(d.length)
      })
      rects.attr('fill', function(d, i){
        return color(i)
      })
      var labels = d3
      .select('#box1')
      .selectAll('text')
      .data(allCountries)
      .enter()
      .append('text')
      .text(function(d){
        return d;
      });
      labels
      .attr('x', 0)
      .attr('y', function(d, i){return (i*22)+15})
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "white");;

      var width = 400,
    height = 300,
    radius = Math.min(width, height) / 2;


    //
    // var labelArc = d3.svg.arc()
    //     .outerRadius(radius - 40)
    //     .innerRadius(radius - 40);


    var svg = d3.select("#box2")
      .append('svg')
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    // .innerRadius(0);

    var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.length; });

    var path = svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function(d,i){
        return color(i)
      })
  },


})
