import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { auth } from '../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { Pressable } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  profileSection: {
    gap: 8,
  },
  email: {
    fontSize: 16,
    color: '#808080',
  },
  menuContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  menuItemPressed: {
    opacity: 0.7,
    backgroundColor: '#F0F0F0',
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
  },
  destructiveText: {
    color: '#FF3B30',
  },
  chevron: {
    opacity: 0.5,
  },
});

export default function AccountScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    {
      title: 'Personal Details',
      onPress: () => console.log('Personal Details pressed'),
      icon: 'person.fill'
    },
    {
      title: 'Settings',
      onPress: () => console.log('Settings pressed'),
      icon: 'gear'
    },
    {
      title: 'Help & Support',
      onPress: () => console.log('Help pressed'),
      icon: 'questionmark.circle.fill'
    },
    {
      title: 'Log Out',
      onPress: handleLogout,
      icon: 'arrow.right.square',
      isDestructive: true
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="person.crop.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.profileSection}>
          <ThemedText type="title">Account</ThemedText>
          <ThemedText style={styles.email}>{user?.email}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <Pressable
              key={item.title}
              onPress={item.onPress}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
                index !== menuItems.length - 1 && styles.menuItemBorder
              ]}>
              <ThemedView style={styles.menuItemContent}>
                <ThemedView style={styles.menuItemLeft}>
                  <IconSymbol
                    name={item.icon as any}
                    size={24}
                    color={item.isDestructive ? '#FF3B30' : '#808080'}
                  />
                  <ThemedText
                    style={[
                      styles.menuItemText,
                      item.isDestructive && styles.destructiveText
                    ]}>
                    {item.title}
                  </ThemedText>
                </ThemedView>
                <IconSymbol
                  name="chevron.right"
                  size={20}
                  color="#808080"
                  style={styles.chevron}
                />
              </ThemedView>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

