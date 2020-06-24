import styled from 'styled-components';

export const Container = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 30px;
  background: black;
  width: 100%;
  background-color: #28272e;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #999591;
  z-index: 2;

  span {
    color: #999591;
  }
`;
