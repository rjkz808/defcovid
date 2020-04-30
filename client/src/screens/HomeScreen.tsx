import React, { useContext, useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, StyleProp, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Content, Text, Icon, Card, CardItem, Body, Button } from 'native-base';
import PointChart from '../components/PointChart';
import UserContext from '../contexts/UserContext';
import { colors, roundness } from '../theme';
import { getRandomElement } from '../utils';

function getPointsData(points: number): [StyleProp<TextStyle>, string] {
  let pointsStyle = styles.pointsNeutral;
  let pointsSign = '';

  if (points > 0) {
    pointsStyle = styles.pointsPositive;
    pointsSign = '+';
  } else if (points < 0) {
    pointsStyle = styles.pointsNegative;
    pointsSign = '-';
  }

  return [pointsStyle, pointsSign];
}

function useRandomTip() {
  const tips = useMemo(
    () => [
      'Do not panic. Try to focus on virus prevention instead!',
      'Observe personal hygiene.',
      'Wash your hands with soap frequently (more than 20 seconds).',
      'Rub your hands and face with a wet wipe.',
      'Do not touch your face/nose/eyes with your hands.',
      'Do not touch your face/nose/eyes with your hands.',
      'Try to sneeze and cough only in your handkerchief (or use your sleeve).',
      'If you are older than 60, try to stay home as long as possible.',
      'Take care of your elderly relatives.',
    ],
    []
  );

  const [randomTip, setRandomTip] = useState(getRandomElement(tips));

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomTip(getRandomElement(tips));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return randomTip;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const userContext = useContext(UserContext);
  const userPoints = userContext.state.user?.points ?? 0;

  const randomTip = useRandomTip();
  const [pointsStyle, pointsSign] = getPointsData(userPoints);

  return (
    <Content style={styles.container}>
      <Text style={[styles.points, pointsStyle]}>
        {pointsSign}
        {Math.abs(userPoints)}
      </Text>
      <PointChart points={userPoints} />

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonColumn}>
          <Button
            block
            iconLeft
            style={[styles.button, styles.buttonRisk]}
            onPress={() => navigation.navigate('Risks')}
          >
            <Icon name="close" />
            <Text>Risk</Text>
          </Button>
        </View>
        <View style={styles.buttonColumn}>
          <Button
            block
            iconLeft
            style={[styles.button, styles.buttonAction]}
            onPress={() => navigation.navigate('Actions')}
          >
            <Icon name="checkmark" />
            <Text>Action</Text>
          </Button>
        </View>
      </View>

      <View style={styles.notificationsContainer}>
        <Card style={styles.notificationCard}>
          <CardItem>
            <Body>
              <Text style={styles.notificationTitle}>Last notification</Text>
              <Text>Wash your hands with soap for 20 seconds or more.</Text>
            </Body>
          </CardItem>
        </Card>
        <Card style={styles.notificationCard}>
          <CardItem>
            <Body>
              <Text style={styles.notificationTitle}>Useful tip</Text>
              <Text>{randomTip}</Text>
            </Body>
          </CardItem>
        </Card>
      </View>
    </Content>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  points: {
    position: 'absolute',
    top: 95,
    alignSelf: 'center',
    fontSize: 50,
  },
  pointsPositive: {
    color: colors.success,
  },
  pointsNegative: {
    color: colors.danger,
  },
  pointsNeutral: {
    color: colors.neutral,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    borderRadius: roundness,
  },
  buttonColumn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  buttonRisk: {
    backgroundColor: colors.danger,
  },
  buttonAction: {
    backgroundColor: colors.success,
  },
  notificationsContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  notificationCard: {
    marginBottom: 10,
  },
  notificationTitle: {
    fontWeight: 'bold',
  },
});
