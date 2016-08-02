(function(){
    
    var app = angular.module("circleApp", [ ]);
    
    app.directive("circleCanvas", function() {
     var directiveDefinitionObject = {
         restrict: "E",
         link: function (scope, element, attrs) {
             scope.loadCircles();
         } 
      };
      return directiveDefinitionObject;
    });
    
    
    
    app.controller("circleCtrl", ["$scope", "$http", function($scope, $http){
        var s = $scope;
        s.maxRowLength = 32;
        s.cRadius = 20;
        s.cPadding = 5;
        s.tCircles = 5;
        s.circleData = [];
        s.circleStatus = [];
        s.svgContainer;
        s.inputError = false;
        
        s.loadCircles = function() {
            console.time("loading circles");
            getCircleStatusList();
            generateCanvas();
            generateCircles();
            drawCircles();
            console.timeEnd("loading circles");
        }
        
        s.regenCircles = function() {
            generateCanvas();
            drawCircles();
        }
        
        s.checkNumber = function() {
            if( isFinite( s.maxRowLength ) && isFinite( s.cRadius ) && isFinite( s.cPadding ) && isFinite( s.tCircles ) ) {
                s.inputError = false;
            }
            else {
                s.inputError = true;
            }
        }
        
        function generateCanvas(){
            const circleSpacing = s.cRadius * 2 + s.cPadding;
            const canvasWidth = circleSpacing * s.maxRowLength + s.cPadding;
            const canvasHeight = Math.ceil( s.tCircles / s.maxRowLength ) * circleSpacing + s.cPadding;
            
            if( s.svgContainer ) {
                s.svgContainer.selectAll("circle").remove();
                s.svgContainer.remove();
            }
            
            s.svgContainer = d3.select("body")
                .append("svg")
                .attr("width", canvasWidth)
                .attr("height", canvasHeight);
            
            initGradients( s.svgContainer );
        }
        
        function generateCircles( ) {
            s.circleData.length = 0;
            var rowCount = 0;
            var columnCount = 0;

            for( var i = 0; i < s.tCircles; i++ ) {
                if( i % s.maxRowLength == 0 ) {
                    rowCount++;
                    columnCount = 0;
                }
                columnCount++;
                
                var circleX = s.cRadius * 2 * columnCount + (s.cPadding * columnCount) - s.cRadius;
                var circleY = s.cRadius * 2 * rowCount + (s.cPadding * rowCount) - s.cRadius;
                var newCircle = { x: circleX, y: circleY, radius: s.cRadius, color: s.circleStatus[i].color };
                s.circleData.push(newCircle);
            }
        }
        
        function drawCircles() {
            var displayedCircles = s.circleData.slice(0, s.tCircles);
            circles = s.svgContainer.selectAll("circle")
                .data(displayedCircles)
                .enter()
                .append("circle");

            circleAttributes = circles.attr("cx", function (d) { return d.x; })
                .attr("cy", function (d) { return d.y; })
                .attr("r", function (d) { return d.radius; })
                .style("fill", function(d) { return d.color; });
        }
        
        function getCircleStatusList( ) {
            s.circleStatus.length = 0;
            for( var i = 0; i < s.tCircles; i++ ) {
                s.circleStatus.push( { color: getRandomColor() } );                      
            }
        }  
        
        function  getRandomColor() {
            var rNum = Math.floor((Math.random() * 100) + 1);

            //70% green, 20% yellow, 10% red
            if( rNum <= 70 ) {
               color = "url(#greenGrad)"; 
            }
            else if( rNum > 70 && rNum <= 90 ) {
                color = "url(#yellowGrad)";
            }
            else {
                color = "url(#redGrad)";
            }

            return color;
        }
        
    }]);

    function initGradients( svgContainer ) {
        var greenGradient = svgContainer.append("svg:defs")
            .append("svg:linearGradient")
            .attr("id", "greenGrad")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        greenGradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "#BFFFCF")
            .attr("stop-opacity", 1);

        greenGradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "#00FF40")
            .attr("stop-opacity", 1);

        var yellowGradient = svgContainer.append("svg:defs")
            .append("svg:linearGradient")
            .attr("id", "yellowGrad")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        yellowGradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "#FFFF9F")
            .attr("stop-opacity", 1);

        yellowGradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "#FFFF00")
            .attr("stop-opacity", 1);

        var redGradient = svgContainer.append("svg:defs")
            .append("svg:linearGradient")
            .attr("id", "redGrad")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

        redGradient.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "#FF9797")
            .attr("stop-opacity", 1);

        redGradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "#FF0000")
            .attr("stop-opacity", 1);
    }
})(); 