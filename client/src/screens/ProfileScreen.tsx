import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { Content, Text, Icon, Badge, Card, CardItem, Body, List, ListItem, H3 } from 'native-base';
import UserContext from '../contexts/UserContext';
import { colors } from '../theme';

function getStatus(percent: number) {
  if (percent >= 0 && percent <= 25) {
    return 'success';
  } else if (percent > 25 && percent <= 50) {
    return 'warning';
  } else if (percent > 50 && percent <= 75) {
    return 'error';
  } else {
    return 'danger';
  }
}

export default function ProfileScreen() {
  const userContext = useContext(UserContext);

  const risks =
    Number(userContext.state.user?.chronicDiseases) +
    Number(userContext.state.user?.contact) +
    Number(userContext.state.user?.dangerousAge) +
    Number(userContext.state.user?.gender === 'Male');

  const percent = risks * 25;
  const status = getStatus(percent);

  const badgeStyle = userContext.state.user?.dangerousAge
    ? styles.profileBadgeDanger
    : styles.profileBadgeSuccess;

  return (
    <Content style={styles.container}>
      <Card style={styles.profileCard}>
        <CardItem style={{ paddingBottom: 0 }}>
          <Body>
            <View style={styles.headContainer}>
              <View style={styles.profileIconContainer}>
                <Icon name="person" style={styles.profileIcon} />
              </View>
              <View style={styles.profileContainer}>
                <Text style={styles.profileName}>{userContext.state.user?.name}</Text>
                <Text style={{ color: colors.secondary }}>
                  Gender: {userContext.state.user?.gender}
                </Text>
              </View>
              <Badge style={[styles.profileBadge, badgeStyle]}>
                <Text>{userContext.state.user?.dangerousAge ? '>' : '<'}60 y.o.</Text>
              </Badge>
            </View>
          </Body>
        </CardItem>

        <List style={styles.list}>
          <ListItem style={styles.listItem}>
            <Text>
              I {!userContext.state.user?.chronicDiseases && 'do not'} have chronic diseases
            </Text>
          </ListItem>
          <ListItem style={styles.listItem}>
            <Text>
              I {!userContext.state.user?.contact && 'do not'} contact with infected people
            </Text>
          </ListItem>
        </List>
      </Card>

      <Text
        style={[
          styles.percent,
          status === 'warning' && styles.percentNormal,
          status === 'error' && styles.percentWarning,
          status === 'danger' && styles.percentDanger,
        ]}
      >
        {percent}%
      </Text>

      <ProgressCircle
        style={styles.progress}
        progress={percent / 100}
        progressColor={colors[getStatus(percent)]}
        backgroundColor={colors.neutral}
        strokeWidth={12}
      />

      <H3 style={styles.riskLabel}>Your risk</H3>
    </Content>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: 20,
  },
  profileCard: {
    marginBottom: 30,
  },
  headContainer: {
    flexDirection: 'row',
  },
  profileIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.neutral,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  profileIcon: {
    color: colors.neutral,
    fontSize: 45,
  },
  profileContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  profileName: {
    fontWeight: 'bold',
  },
  profileDataContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  profileBadge: {
    justifyContent: 'center',
    marginLeft: 10,
    alignSelf: 'center',
  },
  profileBadgeSuccess: {
    backgroundColor: colors.success,
  },
  profileBadgeDanger: {
    backgroundColor: colors.warning,
  },
  percent: {
    position: 'absolute',
    top: 300,
    alignSelf: 'center',
    fontSize: 50,
    color: colors.success,
  },
  percentNormal: {
    color: colors.warning,
  },
  percentWarning: {
    color: colors.error,
  },
  percentDanger: {
    color: colors.danger,
  },
  progress: {
    height: 200,
    marginBottom: 20,
  },
  riskLabel: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: colors.secondary,
  },
  list: {
    marginLeft: -19,
  },
  listItem: {
    paddingLeft: 22,
  },
});
