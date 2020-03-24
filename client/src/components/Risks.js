import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import UserContext from '../contexts/UserContext';
import PointCard from './PointCard';

export default function Risks() {
  const userContext = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect exact to="/" />;
  }

  const actions = [
    { title: 'Приветствие - пожать руку', points: 7 },
    { title: 'Обниматься, целоваться', points: 8 },
    {
      title: 'Прикасаться в местах общего пользования к поручням, кнопкам, ручкам, кранам',
      points: 6,
    },
    { title: 'Контакт на работе/большой коллектив/работа с людьми', points: 8 },
    { title: 'Использование наличных денег', points: 6 },
    { title: 'Близкая дистанция общения/кучность', points: 5 },
    { title: 'Общественный транспорт', points: 7 },
    { title: 'Гости', points: 5 },
    { title: 'Рискованные контакты', points: 5 },
    { title: 'Магазин/торговый центр', points: 7 },
    { title: 'Вокзал, аэропорт', points: 9 },
    { title: 'Общественное питание', points: 6 },
    { title: 'Медицинское учреждение/аптека', points: 8 },
    { title: 'Повышенная температура', points: 7 },
    { title: 'Сухой кашель, тяжелое дыхание/одышка при небольшой нагрузке', points: 8 },
    { title: 'Наличие питомца, требующего прогулки на улице', points: 6 },
    { title: 'Обниматься с зараженным COVID-19', points: 100 },
  ].map((action, idx) => {
    async function handleClick() {
      await userContext.subtractPoints(action.points);
      setRedirect(true);
    }

    return (
      <PointCard key={idx} onClick={handleClick} points={action.points} variant="danger">
        {action.title}
      </PointCard>
    );
  });

  return (
    <Container>
      <Row>{actions}</Row>
    </Container>
  );
}
