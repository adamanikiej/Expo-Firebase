import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';

const auth = getAuth();

const SignIn = () => {
  // firebase email signin state
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  // firebase google signin variables
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: Constants.manifest?.extra?.firebaseGoogleSignInClientId
    },
  );

  // firebase google signin authentication when user completes google sign on web
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      console.log('response for logging in:', response)
      console.log('auth:', auth)
      console.log('credential:', credential)
    }
  }, [response]);

  // expo google signin variables
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   expoClientId: '307054777993-sh3uqg5itnqjb8b0tg22i6n7cp2ff73t.apps.googleusercontent.com'
  // });

  // expo google signin authentication
  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { authentication } = response;
  //   }
  // }, [response]);

  // expo google signin function for signin button press
  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Signin screen!</Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        />

        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        />

        <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
        <View>
          <Button 
            disabled={!request}
            title="Google Sign in" 
            onPress={() => {
              promptAsync();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: .5,
    width: 300
  },

  control: {
    marginTop: 10,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignIn;