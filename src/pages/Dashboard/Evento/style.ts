import styled, { css } from 'styled-components';
import partyLogo from '../../../assets/partyLogo.jpg';

interface fileResponseProps {
  file_name: string;
  url: string;
}

interface BackgroudInputProps {
  fileResponse: fileResponseProps;
}

export const BackgroundInput = styled.div<BackgroudInputProps>`
  background-image: url(${partyLogo});
  background-position: center;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
  background-repeat: no-repeat;

  ${(props) =>
    props.fileResponse.url &&
    css`
      background-image: url(${props.fileResponse.url});
    `}
`;

export const InputFile = styled.input`
  opacity: 0;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
  margin: auto;
  margin-top: 10px;
`;

export const ContainerEvent = styled.div`
  margin: auto;
  max-width: 100px;
  margin-bottom: 20px;
`;
export const BoxCard = styled.div`
  display: flex;
  margin-top: 20px;
  border: 2px solid #ff9000;
  border-radius: 10px;
  width: 400px;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  flex: 1;
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
`;
