import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
export default function Home() {
  return (
    <>
      <DashboardContainer>
        <Link to="/contacts"> Developer Contacts</Link>
      </DashboardContainer>
    </>
  );
}
