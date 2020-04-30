import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Content, Text, List, ListItem, Body, Right, Badge } from 'native-base';
import { updatePoints } from '../apis/backend';
import UserContext from '../contexts/UserContext';
import { colors } from '../theme';

export default function RiskScreen() {
  const { dispatch, state } = useContext(UserContext);
  const navigation = useNavigation();

  const risks = [
    { title: 'Snake hands', points: 7 },
    { title: 'Hug, kiss', points: 8 },
    {
      title: 'In the common areas I touched the handrails/buttons/handles/taps',
      points: 6,
    },
    { title: 'Contact with a colleague at work/large team', points: 8 },
    { title: 'I used cash', points: 6 },
    { title: 'Close distance when talking with people', points: 5 },
    { title: 'I drove in public transport', points: 7 },
    { title: 'I had guests', points: 5 },
    { title: 'I visited a store/mall', points: 7 },
    { title: 'I visited the train station/airport', points: 9 },
    { title: 'Food in a public place', points: 6 },
    { title: 'I visited a medical facility/pharmacy', points: 8 },
    { title: 'I have a fever', points: 7 },
    {
      title: 'I have a dry cough, pant/shortness of breath when doing a light exercise',
      points: 8,
    },
    { title: 'I walked my pet on the street', points: 6 },
    { title: 'I hugged with a person who is infected COVID-19', points: 100 },
  ].map((risk, idx) => {
    function pressHandler() {
      if (state.user === undefined) return;

      updatePoints(state.user._id, state.user.points - risk.points).subscribe({
        next() {
          dispatch({ type: 'subPoints', payload: risk.points });
          navigation.navigate('Home');
        },
        error(err) {
          console.error(err);
        },
      });
    }

    return (
      <ListItem key={idx} onPress={pressHandler}>
        <Body>
          <Text>{risk.title}</Text>
        </Body>
        <Right>
          <Badge style={styles.badge}>
            <Text>-{risk.points}</Text>
          </Badge>
        </Right>
      </ListItem>
    );
  });

  return (
    <Content style={styles.container}>
      <List>{risks}</List>
    </Content>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.danger,
    justifyContent: 'center',
  },
});
