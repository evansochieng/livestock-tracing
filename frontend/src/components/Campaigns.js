import React from 'react'

const Campaigns = ({ livestockAtRisk }) => {
  return (
    // <table class="table table-hover">
    // <thead>
    //     <tr>
    //     <th scope="col">#</th>
    //     <th scope="col">Latitude</th>
    //     <th scope="col">Longitude</th>
    //     <th scope="col">Owner</th>
    //     <th scope="col">Contact</th>
    //     </tr>
    // </thead>
    // <tbody>
    //     {livestockAtRisk.map((livestock, index) => {
    //     return (
    //         <tr key={index}>
    //         <th scope="row">1</th>
    //         <td>{livestock.latitude}</td>
    //         <td>{livestock.longitude}</td>
    //         <td>{livestock.owner}</td>
    //         <td>{livestock.contact}</td>
    //         </tr>
    //     )
    //     })}
    // </tbody>
    // </table>

    <table class="table-auto">
  <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Latitude</th>
        <th scope="col">Longitude</th>
        <th scope="col">Owner</th>
        <th scope="col">Contact</th>
        </tr>
  </thead>
  <tbody>
    {livestockAtRisk.map((livestock, index) => {
        return (
            <tr key={index}>
            <th scope="row">1</th>
            <td>{livestock.latitude}</td>
            <td>{livestock.longitude}</td>
            <td>{livestock.owner}</td>
            <td>{livestock.contact}</td>
            </tr>
        )
        })}
  </tbody>
</table>
  );
}

export default Campaigns