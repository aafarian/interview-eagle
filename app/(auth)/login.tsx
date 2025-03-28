import React, { useState } from 'react';
import { 
  Image, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  View,
  ActivityIndicator,
  Pressable
} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: -10,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    gap: 10,
    marginTop: 20,
    marginHorizontal: 16,
    paddingBottom: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0A84FF',
  },
  signupText: {
    color: '#0A84FF',
  },
});

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      setError('');
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = () => {
    if (error) setError('');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.container}>
          <View style={styles.formContainer}>
            {!!error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={(text) => {
                setEmail(text);
                handleInputChange();
              }}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!isLoading}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              onChangeText={(text) => {
                setPassword(text);
                handleInputChange();
              }}
              value={password}
              autoCapitalize="none"
              autoComplete="password"
              editable={!isLoading}
            />
          </View>
          
          <ThemedView style={styles.buttonContainer}>
            <Pressable 
              onPress={handleLogin}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>Log In</ThemedText>
              )}
            </Pressable>
            
            <Pressable 
              onPress={handleSignup}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.button,
                styles.signupButton,
                pressed && styles.buttonPressed
              ]}
            >
              <ThemedText style={[styles.buttonText, styles.signupText]}>Sign Up</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}
