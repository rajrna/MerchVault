import React from 'react';
import DashboardBox from './dashboardbox';
import styled from 'styled-components';


const Dashdetails = () => {
  return (
    // <div className="right-content w-100">
    //    <div className="row dashboardBoxWrapperRow">
    //     <div className="col-md-8">
    //     <div className="dashboardBoxWrapper d-flex">
        
             
    //     </div>
       
    //     </div>


    //     <div className="col-md-4 pl=0">
    //         <div className="box">
    //         <DashboardBox color={["#000","#ccc"]}/>
    //     <DashboardBox/>
    //     <DashboardBox/>
    //     <DashboardBox/>
    //         </div>

    //     </div>
    //    </div>

    // </div>
<Wrapper>
  <div className='total-details-container'>
    <div className='total-details'>
    <div><DashboardBox/></div>
    <div><DashboardBox/></div>
    
    <div><DashboardBox/></div>
    <div><DashboardBox/></div>
    </div>

    <div className='user-list'>
      <h2>Lists of User</h2>
      <div>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Artist</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>abcdefgh@.gmail.com</td>
            <td>Yes</td>
            <td>Delete</td>
          </tr>
        </tbody>
      </div>
    </div>
  </div>
</Wrapper>
    
  )
}

const Wrapper=styled.section`
.total-details-container{
  display:flex;
  flex-direction:column;
  align-items:center;
}

.total-details{
  display:flex;
}


.user-list{
  width:100%;
  border-collapse:collapse;
  overflow:hidden;
  border-radius:8px;
}

.user-list thead{
  background-color:rgb(13,59,102);
  color:white;
}
.user-list th{
  padding:1rem;
  font-size:1.6rem;
  text-align:left;
}

.user-list tbody{
  tr{
    &:nth-child(even){
      background-color:#f2f2f2;
    }
  }
  td{
    padding:1rem;
    font-size:1.5rem;
  }
}
`;

export default Dashdetails;



