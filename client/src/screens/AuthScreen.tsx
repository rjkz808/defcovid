import React, { useContext, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as NativeBase from 'native-base';
import { flatMap } from 'rxjs/operators';
import { authenticate, User } from '../apis/backend';
import { saveUserId } from '../apis/storage';
import Checkbox from '../components/Checkbox';
import Radio from '../components/Radio';
import UserContext from '../contexts/UserContext';
import { roundness } from '../theme';
import { toggleBoolean } from '../utils';

enum Gender {
  None = 'None',
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export default function AuthScreen() {
  const { dispatch } = useContext(UserContext);

  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.None);

  const [chronicDiseases, setChronicDiseases] = useState(false);
  const [contact, setContact] = useState(false);
  const [dangerousAge, setDangerousAge] = useState(false);

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(true);

  function inputChangeHandler(value: string) {
    if (!validated) {
      setValidated(true);
    } else if (value.length === 0) {
      setValidated(false);
    }

    setName(value);
  }

  function submitAuthForm() {
    if (name.length === 0) return setValidated(false);

    const data = { contact, chronicDiseases, dangerousAge, name, gender };
    setLoading(true);

    let userData: User;
    const submitObservable = authenticate(data).pipe(
      flatMap((response) => {
        userData = response;
        return saveUserId(userData._id);
      })
    );

    submitObservable.subscribe({
      next() {
        console.log(userData);
        setLoading(false);
        dispatch({ type: 'authSuccess', payload: userData });
      },
      error(err) {
        console.error(err);
        setLoading(false);
      },
    });
  }

  const radioButtons = useMemo(() => {
    return [
      { data: Gender.None, title: 'Do not tell' },
      { data: Gender.Male, title: 'Male' },
      { data: Gender.Female, title: 'Female' },
      { data: Gender.Other, title: 'Other' },
    ].map((radio) => (
      <Radio
        key={radio.data}
        selected={gender === radio.data}
        onSelect={() => setGender(radio.data)}
      >
        {radio.title}
      </Radio>
    ));
  }, [gender]);

  return (
    <NativeBase.Content style={styles.container}>
      <NativeBase.Form>
        <NativeBase.Text style={styles.formLabel}>Your name</NativeBase.Text>
        <NativeBase.Item error={!validated} style={styles.formItem}>
          <NativeBase.Input
            style={styles.input}
            placeholder="John Doe"
            onChangeText={inputChangeHandler}
            value={name}
            disabled={loading}
          />
          {!validated && <NativeBase.Icon name="close-circle" />}
        </NativeBase.Item>

        <NativeBase.Text style={styles.formLabel}>Your gender</NativeBase.Text>
        {radioButtons}

        <NativeBase.Text style={styles.formLabel}>Additional data</NativeBase.Text>
        <Checkbox
          checked={dangerousAge}
          disabled={loading}
          onCheck={() => setDangerousAge(toggleBoolean)}
        >
          I am older than 60
        </Checkbox>
        <Checkbox
          checked={chronicDiseases}
          disabled={loading}
          onCheck={() => setChronicDiseases(toggleBoolean)}
        >
          I have chronic diseases
        </Checkbox>
        <Checkbox checked={contact} disabled={loading} onCheck={() => setContact(toggleBoolean)}>
          I contact with infected people
        </Checkbox>
      </NativeBase.Form>

      <NativeBase.Button
        block
        disabled={loading}
        onPress={submitAuthForm}
        style={styles.submitButton}
      >
        <NativeBase.Text>{loading ? 'Loading...' : 'Submit'}</NativeBase.Text>
      </NativeBase.Button>
    </NativeBase.Content>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  formLabel: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  formItem: {
    marginLeft: 0,
  },
  input: {
    paddingLeft: 0,
  },
  submitButton: {
    marginTop: 30,
    borderRadius: roundness,
  },
});
