import styled, { css } from 'styled-components';
import partyLogo from '../../assets/partyLogo.jpg';

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
