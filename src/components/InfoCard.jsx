import React from 'react'

const flg = Math.round(Math.random());
const InfoCard = () => {
  return (
    <div style={{textAlign:'center' ,padding:"0 , 10%"}}>
      Try Saying:<br />
      Add {flg? 'income ':'expense '}
      for {flg? '₹500 ':'₹20 '}
      in Category  {flg? 'Savings ':'Food '}
      for {flg? 'Monday':'Sunday'}

    </div>
  )
}

export default InfoCard
