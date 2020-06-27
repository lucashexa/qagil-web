import styled, { css, keyframes } from 'styled-components';
import eventImage from '../../../../assets/partyLogo.jpg';
import { shade } from 'polished';
import Button from '../../../../components/Button';

interface Iimage {
  imageUrl: string;
}

export const Container = styled.div`
  display: flex;
  align-items: stretch;
`;

export const Card = styled.div`
  height: 380px;
  width: 290px;
  border-radius: 20px;
  border: 2px solid #f99000;
  flex-direction: column;
  margin: 10px 10px;
`;

export const Image = styled.div<Iimage>`
  background: url(${eventImage});
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 17px 17px 0 0;
  background-position: center;
  background-size: cover;

  ${(props: any) =>
    props.imageUrl &&
    css`
      background: url(${props.imageUrl});
      background-position: center;
      background-size: cover;
    `}
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

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ButtonCreate = styled(Button)`
  max-width: 290px;
`;

const appearFromRight = keyframes`
  from{
    opacity: 0;
    transform: translateX(50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 23%;
  z-index: -1;
  height: 140vh;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;
