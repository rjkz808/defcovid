import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import UserContext from '../contexts/UserContext';
import PointCard from './PointCard';

export default function Actions() {
  const userContext = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect exact to="/" />;
  }

  const actions = [
    { title: 'Мытье рук мылом или дезсредством', points: 6 },
    { title: 'Обработка рук и лица влажной салфеткой', points: 3 },
    { title: 'Обработка рук перед входом в дом', points: 6 },
    { title: 'Обработка дезсредством продуктов', points: 4 },
    { title: 'Принять душ', points: 5 },
    { title: 'Проветрить помещение', points: 5 },
    { title: 'Обработка смартфона/smart watch', points: 7 },
    { title: 'Обработка наручных часов', points: 4 },
    { title: 'Обработка украшений', points: 4 },
    { title: 'Обработка клавиатуры', points: 5 },
    { title: 'Обработка компьютерной мыши', points: 5 },
    { title: 'Изолировать дома верхнюю одежду', points: 7 },
    {
      title: 'Позвонить в службу 103 при признаках заболевания или при контакте 1-го уровня',
      points: 10,
    },
    { title: 'Самоизоляция и самоконтроль', points: 10 },
    { title: 'Одеть маску при наличии признаков ОРВИ (у себя, у окружающих)', points: 9 },
    { title: 'Обработка лап собаки после прогулки/прогулка в попоне, налапниках', points: 8 },
    { title: 'Дистанционная работа', points: 8 },
    { title: 'Не пользоваться общественным транспортом (хотя бы в час пик)', points: 9 },
    { title: 'Летать в космосе на МКС', points: 100 },
  ].map((action, idx) => {
    async function handleClick() {
      await userContext.addPoints(action.points);
      setRedirect(true);
    }

    return (
      <PointCard key={idx} onClick={handleClick} points={action.points} variant="success">
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
