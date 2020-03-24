import BsButton from 'react-bootstrap/Button';
import styled from 'styled-components';

function getShadowColor(props) {
  if (props.variant === 'danger') {
    return props.theme.colors.danger;
  }

  if (props.variant === 'success') {
    return props.theme.colors.success;
  }

  return props.theme.colors.transparent;
}

const Button = styled(BsButton)`
  padding: 10px;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  line-height: 1;
  color: ${props => props.theme.colors.foreground};
  text-transform: uppercase;

  box-shadow: 0px 0px 10px 0.5px ${getShadowColor};

  &:active,
  &:disabled,
  &:focus {
    box-shadow: 0px 0px 10px 0.5px ${getShadowColor};
  }
`;

export default Button;
