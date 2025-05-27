import { Stack } from 'expo-router';

const ROUTE = 'src/login/';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name={`${ROUTE}login`} options={{ title: 'Login', headerShown: true }}  />
            <Stack.Screen name={`${ROUTE}create-account`} options={{ title: 'CreateAccount', headerShown: true }}  />
        </Stack>
    )
}