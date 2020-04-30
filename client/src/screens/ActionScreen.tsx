import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Content, Text, List, ListItem, Body, Right, Badge } from 'native-base';
import { updatePoints } from '../apis/backend';
import UserContext from '../contexts/UserContext';
import { colors } from '../theme';

export default function ActionScreen() {
  const { dispatch, state } = useContext(UserContext);
  const navigation = useNavigation();

  const actions = [
    { title: 'I washed my hands with soap or a disinfectant', points: 6 },
    { title: 'I rubbed my hands with a wet wipe', points: 3 },
    { title: 'I treated my hands with a disinfectant before I got home', points: 6 },
    { title: 'I sanitized the products I bought', points: 4 },
    { title: 'I just took a shower', points: 5 },
    { title: 'I have aired my room', points: 5 },
    { title: 'I treated my phone/smart watch with a disinfectant', points: 7 },
    { title: 'I treated my watch with a disinfectant', points: 4 },
    { title: 'I treated my jewerly with a disinfectant', points: 4 },
    { title: 'I treated my keyboard with a disinfectant', points: 5 },
    { title: 'I treated my mouse with a disinfectant', points: 5 },
    { title: 'I isolated all my outerwear at home', points: 7 },
    {
      title:
        'I called 103 when I had signs of illness (or after I have been communicating with infected people)',
      points: 10,
    },
    { title: 'Self-isolation and self-control', points: 10 },
    {
      title:
        'I put on a medical mask in the presence of signs of acute respiratory viral infection (of myself or of other people)',
      points: 9,
    },
    { title: 'I treated the paws of my dog after a walk with a disinfectant', points: 8 },
    { title: 'Today I worked remotely', points: 8 },
    { title: 'I did not use public transport (at least during rush hour)', points: 9 },
    { title: 'I fly in the space on ISS', points: 100 },
  ].map((action, idx) => {
    function pressHandler() {
      if (state.user === undefined) return;

      updatePoints(state.user._id, state.user.points + action.points).subscribe({
        next() {
          dispatch({ type: 'addPoints', payload: action.points });
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
          <Text>{action.title}</Text>
        </Body>
        <Right>
          <Badge style={styles.badge}>
            <Text>+{action.points}</Text>
          </Badge>
        </Right>
      </ListItem>
    );
  });

  return (
    <Content style={styles.container}>
      <List>{actions}</List>
    </Content>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.success,
    justifyContent: 'center',
  },
});
