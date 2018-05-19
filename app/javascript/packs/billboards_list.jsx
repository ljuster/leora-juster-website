import React from 'react'

export const BillboardsList = ({billboards}) =>
  <div>
    <table>
      <tr>
        <th>Name</th>
        <th>Image</th>
        <th>Score</th>
      </tr>
      <tr>
        {billboards.map(function(billboard) {
        return (
          <div>
            <td>{billboard.name}</td>
            <td><img src={billboard.image_url} alt={billboard.name} /></td>
            <td>{billboard.score}</td>
            <td><button type="button" value='1'>+ 1</button><button type="button" value='-1'>- 1</button></td>
          </div>
        )
      })}
      </tr>
    </table>
  </div>
