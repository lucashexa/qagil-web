import styled, { css, keyframes } from 'styled-components';
import avatar from '../../assets/avatar.png';
interface fileResponseProps {
  file_name?: string;
  url?: string;
}

interface BackgroudInputProps {
  fileResponse: fileResponseProps;
}

interface IProfileInfos {
  hasContent: Boolean;
}

export const Container = styled.div`
  flex: 1;
  background-color: #28272e;
  height: 100px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #999591;
  position: fixed;
  width: 100%;

  img {
    width: 220px;
  }

  svg {
    cursor: pointer;
    color: #999591;
    width: 25px;
    height: 25px;
    margin-right: 10%;

    &:hover {
      color: #f99000;
    }
  }
`;

export const Logo = styled.img`
  width: 220px;
`;

export const SubContainer = styled.div`
  display: flex;
`;

export const UserName = styled.span`
  color: #ff9000;
`;

export const BackgroundInput = styled.div<BackgroudInputProps>`
  background-image: url(${avatar});
  background-position: center;
  height: 70px;
  width: 70px;
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
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
  margin: auto;
`;

const MoveImage = keyframes`
  from {
    left: 15%;
    top: 15%;
    transform: scale(1);
  }
  to {
    left: 50%;
    transform: scale(2);
  }
`;
const MoveImageBack = keyframes`
    from {
    left: 50%;
    top: 65%;
    transform: scale(2);
  }
    to {
    left: 15%;
    top: 15%;
    transform: scale(1);
  }
`;

export const ProfileInfos = styled.div<IProfileInfos>`
  position: absolute;
  display: flex;
  width: 200px;
  justify-content: space-around;
  align-items: center;
  left: 15%;
  top: 15%;
  animation-name: ${MoveImageBack};
  animation-duration: 1s;

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

  ${(props) =>
    props.hasContent &&
    css`
      animation-name: ${MoveImage};
      animation-duration: 1s;
      position: absolute;
      left: 50%;
      top: 65%;
      transform: scale(2);
      div {
        border: 2px solid #f99000;
      }

      /* div {
        height: 120px;
        width: 120px;
      }

      input {
        height: 120px;
        width: 120px;
      } */
    `}
`;
