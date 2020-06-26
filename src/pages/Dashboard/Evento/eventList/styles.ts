import styled from 'styled-components';
import eventImage from '../../../../assets/partyLogo.jpg';
import { shade } from 'polished';

export const Container = styled.div``;

export const Card = styled.div`
  height: 380px;
  width: 290px;
  border-radius: 20px;
  border: 2px solid #f99000;
  flex-direction: column;
`;

export const Image = styled.div`
  background: url(${eventImage});
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 17px 17px 0 0;
`;

export const ContainerContentCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export const TitlePage = styled.h1`
  font-size: 25px;
  margin-bottom: 10px;
`;

export const Title = styled.h1`
  font-size: 25px;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  text-align: center;
  margin-bottom: 10px;
`;

export const SeeEvent = styled.p`
  color: #f99000;

  &:hover {
    color: ${shade(0.2, '#ff9000')};
    cursor: pointer;
  }
`;
