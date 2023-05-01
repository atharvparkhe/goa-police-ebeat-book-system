const {goa_border,north_goa_border} = require('../misc/polygons')

function isPointInPolygon(polyPoints, point) {
    // Count the number of intersections between a ray cast from the point
    // and the polygon edges
    let numIntersections = 0;
  
    // Loop through each pair of adjacent points in the polygon
    for (let i = 0; i < polyPoints.length; i++) {
      const j = (i + 1) % polyPoints.length;
  
      // Check if the ray intersects the line segment defined by these two points
      if (((Number(polyPoints[i].lat) > Number(point.lat)) != Number((polyPoints[j].lat) > Number(point.lat))) &&
          (Number(point.lng) < Number((polyPoints[j].lng) - Number(polyPoints[i].lng)) * 
            (Number(point.lat) - Number(polyPoints[i].lat)) / 
            Number((polyPoints[j].lat) - Number(polyPoints[i].lat)) + Number(polyPoints[i].lng))) {
        numIntersections++;
      }
    }
    return numIntersections % 2 === 1;
}
function checkIfWithinBoundary(newCoords) {
    let result = true
    newCoords.forEach((coords)=>{
        if (isPointInPolygon(goa_border,coords) == false){
            result = false
            return 
        }
    })
    return result;
}

function checkIfWithinSubDivision(boundary,newCoords) {
    let result = true
    newCoords.forEach((coords)=>{
        if (isPointInPolygon(boundary,coords) == false){
            result = false
            return 
        }
    })
    return result;
}

function checkdistict(newCoords) {
    let result = 'north'
    newCoords.forEach((coords)=>{
        if (isPointInPolygon(north_goa_border,coords) == false){
            result = 'south'
            return 
        }
    })
    return result;
}
module.exports = {checkIfWithinBoundary,checkdistict,checkIfWithinSubDivision}
