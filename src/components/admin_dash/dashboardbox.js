import styled from "styled-components";

const DashboardBox = (props) =>{
    return(
        <Wrapper><div className="dashboardBox">
        <div><h2>Total</h2>
        <h4>30000</h4></div>
                </div></Wrapper>
    )
}

const Wrapper=styled.section`
display:flex;
align-items:center;
justify-content:center;
border:1px solid black;
width:300px;
height:150px;
background:#ddd;
padding:3rem;
margin:1rem;
border-radius:8px;

h2{
    font-size:3rem;
}
`;
export default DashboardBox;