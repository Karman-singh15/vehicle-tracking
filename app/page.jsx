"use client";
import "./page.css"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default async function Home() {
  var start_location;
  var end_location;
  var driver;
  var start;
  const places = ["Mundka Cluster", "Nangli Sakrawati", "Khayala", "Kapas Hera", "Sec-17 Hub", "Dhulsiras Hub"];
  var total_time = 60;
  const router = useRouter();


  async function addData(driver,end_position,total_time){
    try {
      const res = await fetch("/api/AddVehicles", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ driver, end_position, total_time }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a delivery");
      }
    } catch (error) {
      window.alert(error);
    }
  }

  function geocoder(location) {
    const place = location;
    const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(place)}.json?key=rcKcEQQFCE823337NGGwReGAIWSscizx`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const { lat, lon } = data.results[0].position;
          return [lat, lon];
        } else {
          return "Location not found.";
        }
      })
      .catch(error => console.error("Error:", error));
  }

  function two_times(start, end) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "origins": [
        {
          "point": {
            "latitude": start[0],
            "longitude": start[1]
          }
        }
      ],
      "destinations": [
        {
          "point": {
            "latitude": end[0],
            "longitude": end[1]
          }
        },
      ],
      "options": {
        "departAt": "now",
        "traffic": "live",
        "travelMode": "truck",
        "vehicleMaxSpeed": 40
      }
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    fetch("https://api.tomtom.com/routing/matrix/2?key=rcKcEQQFCE823337NGGwReGAIWSscizx", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result); // Log full response for debugging

        if (result.data && result.data.length > 0) {
          const travelTimeSeconds = result.data[0].routeSummary.travelTimeInSeconds;
          const travelTimeMinutes = Math.round(travelTimeSeconds / 60); // Convert to minutes
          total_time += travelTimeMinutes;

          console.log(`Travel Time: ${travelTimeMinutes} minutes`);
        } else {
          console.log("No travel data found.");
        }
      })
      .catch(error => console.log('Error:', error));
  }

  async function last_time(start,driver) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "origins": [
        {
          "point": {
            "latitude": start[0],
            "longitude": start[1]
          }
        }
      ],
      "destinations": [
        {/*Mundka Cluster*/
          "point": {
            "latitude": 28.6778245,
            "longitude": 76.9918218
          }
        },
        {/*Nangli Sakrawati*/
          "point": {
            "latitude": 28.6211309,
            "longitude": 76.9885167
          }
        },
        {/*Khayala*/
          "point": {
            "latitude": 28.6537059,
            "longitude": 77.0921536
          }
        },
        {/*Kapas Hera*/
          "point": {
            "latitude": 28.524922,
            "longitude": 77.0428497
          }
        },
        {/*Sec-17 Hub*/
          "point": {
            "latitude": 28.590086,
            "longitude": 77.031288
          }
        },
        {/*Dhulsiras Hub*/
          "point": {
            "latitude": 28.552254,
            "longitude": 77.028519
          }
        }
      ],
      "options": {
        "departAt": "now",
        "traffic": "live",
        "travelMode": "truck",
        "vehicleMaxSpeed": 40
      }
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    fetch("https://api.tomtom.com/routing/matrix/2?key=rcKcEQQFCE823337NGGwReGAIWSscizx", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result); // Log full response for debugging

        if (result.data && result.data.length > 0) {
          let minTime = Infinity;
          let bestDestination = null;

          result.data.forEach(route => {
            const travelTime = route.routeSummary.travelTimeInSeconds;

            if (travelTime < minTime) {
              minTime = travelTime;
              bestDestination = route.destinationIndex;
            }
          });

          console.log(`Destination with least travel time: ${bestDestination} (Time: ${Math.round(minTime / 60)} minutes)`);
          total_time += Math.round(minTime / 60);
          var output = document.getElementById("output");
          output.innerHTML = `${Math.round(total_time / 60)-1} hrs ${Math.round(total_time % 60)} mins and place ${places[bestDestination]}`
          addData(driver, places[bestDestination], total_time);
          total_time = 60;
        } else {
          console.log("No route data found.");
        }
      })
      .catch(error => console.log('Error:', error));

  }

  async function estTime() {
    start_location = document.getElementById("start");
    end_location = document.getElementById("end");
    driver = document.getElementById("driver");
    start = document.getElementById("strt");

    // Convert starting hub into numbers
    var start_coord = start.value;
    var comma = start_coord.indexOf(",");
    var x = Number(start_coord.slice(0, comma));
    var y = Number(start_coord.slice(comma + 1, start_coord.length));

    var hub_coord = [x, y];

    // Convert the locations
    let location_one = await geocoder(start_location.value);
    let location_two = await geocoder(end_location.value);
    console.log(location_one, location_two, hub_coord)

    // Time from hub to location one
    two_times(hub_coord, location_one);

    // Time from location one to location two
    two_times(location_one, location_two);

    // Time from location two to hub
    last_time(location_two,driver.value);

    start_location.value = "";
    end_location.value = "";
    driver.value = "";
    start.value = "0";
  }

  return (
    <>
      <div className="main pt-24 justify-center join flex">
        <div className="mr-4">
          <select id="strt" className="select select-bordered w-full max-w-xs">
            <option disabled selected value="0">Choose Start Location</option>
            <option value={[28.590086, 77.031288]}>Sec 17 Hub</option>
            <option value={[28.552254, 77.028519]}>Dhulsiras Hub</option>
            <option value={[28.6778245, 76.9918218]}>Mundka Cluster</option>
            <option value={[28.6211309, 76.9885167]}>Nangli Sakrawati Cluster</option>
            <option value={[28.6537059, 77.0921536]}>Khayala Cluster</option>
            <option value={[28.524922, 77.0428497]}>Kapas Hera Cluster</option>
          </select>
        </div>
        <div className="mr-4">
          <input type="text" id="start" placeholder="Enter Location" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="mr-4">
          <input type="text" id="end" placeholder="Enter Location" className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="mr-4">
          <input type="text" id="driver" placeholder="Enter Driver Name" className="input input-bordered w-full max-w-xs" />
        </div>
        <div>
          <input type="submit" value="Submit" className="btn" onClick={estTime} />
        </div>
      </div>
      <div className="output h-24 pt-10 w-screen text-center text-white bg-base-100" id="output"></div>
    </>
  )
}
