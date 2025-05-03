/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, useTheme, MD3DarkTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signup } from '../../lib/supabase';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation<any>();
    const theme = useTheme();

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const response = await signup({ email, password });
            console.log(response);
            navigation.replace('Login');
        } catch (error: any) {
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Icon name="account-plus" size={48} color={theme.colors.primary} style={styles.icon} />
            <Text variant="headlineMedium" style={styles.heading}>Join Us</Text>
            <View style={styles.form}>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                    left={<TextInput.Icon icon="email" />}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    autoFocus
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    left={<TextInput.Icon icon="lock" />}
                    secureTextEntry
                    style={styles.input}
                />
                <Button
                    mode="contained"
                    onPress={handleSignUp}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                    contentStyle={{ paddingVertical: 10 }}
                    icon="account-plus"
                >
                    {loading ? 'Signing up...' : 'Signup'}
                </Button>
                <Button
                    mode="text"
                    onPress={() => navigation.replace('Login')}
                    style={styles.link}
                    labelStyle={{ color: theme.colors.primary }}
                    icon="login"
                >
                    Already have an account? Login
                </Button>
            </View>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    heading: {
        textAlign: 'center',
        marginBottom: 24,
        color: 'white',
    },
    icon: {
        alignSelf: 'center',
        marginBottom: 12,
    },
    form: {
        width: '100%',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
        borderRadius: 10,
    },
    link: {
        marginTop: 16,
        alignSelf: 'center',
    },
});
