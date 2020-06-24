import styled from 'styled-components';
import Button from '../../../components/Button';
import { shade } from 'polished';

export const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 220px;
  border-right: 1px solid #999591;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  z-index: 1;
`;

export const ButtonMenu = styled(Button)`
  background: #28262e;
  border-radius: 0;
  margin: 0;
  color: #999591;
  border: 0.5px solid;
  font-weight: 100;
  height: 45px;
  transition: margin 0.7s, background-color 0.7s;

  &:hover {
    background: ${shade(0.2, '#28262E')};
    color: #f99000;
    margin-left: 10px;
    border: 1px solid;
  }
`;
