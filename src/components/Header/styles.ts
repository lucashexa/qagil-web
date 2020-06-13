import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  background-color: #28272e;
  height: 100px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-around;

  img {
    width: 220px;
  }

  svg {
    cursor: pointer;
    color: #999591;
  }
`;

export const Logo = styled.img`
  width: 220px;
`;

export const ProfileInfos = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-around;
  align-items: center;

  div {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

export const SubContainer = styled.div`
  display: flex;
`;

export const UserName = styled.span`
  color: #ff9000;
`;
